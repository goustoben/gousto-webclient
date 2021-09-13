describe('My Deliveries', () => {
  beforeEach(() => {
    cy.stubAll3rdParties()
    cy.server()
    cy.fixture('user/userCurrent').as('userCurrent')
    cy.route('GET', /user\/current/, '@userCurrent').as('user')
    cy.fixture('user/userCurrentOrders').as('userCurrentOrders')
    cy.route('GET', /user\/current\/orders/, '@userCurrentOrders').as('currentOrders')
    cy.fixture('subscription/projectedDeliveries').as('subscriptionProjectDeliveries')
    cy.route('GET', /subscriptionquery\/v1\/projected-deliveries\/(.*)/, '@subscriptionProjectDeliveries').as('projectedDeliveries')
    cy.fixture('user/userCurrentAddress').as('userCurrentAddress')
    cy.route('GET', /user\/current\/address/, '@userCurrentAddress').as('currentAddress')
    cy.route('GET', /subscriptionquery\/v1\/subscriptions\/(.*)/, 'fixture:subscription/subscriptionQueryResponse').as('currentSubscription')
    cy.fixture('user/userAddresses').as('userAdresses')
    cy.route('GET', '/customers/v1/customers/17247344/addresses', '@userAdresses')
    cy.fixture('orderSkipRecovery').as('orderSkipRecovery')
    cy.route('GET', /orderskiprecovery/, '@orderSkipRecovery')
    cy.fixture('user/userCurrentSubscriptionDelivery').as('userCurrentSubscriptionDelivery')
    cy.fixture('subscription/subscriptionUpdateResponse').as('subscriptionUpdateResponse')
    cy.route('POST', /subscriptioncommand\/v1\/subscriptions\/(.*)\/skip?/, '@subscriptionUpdateResponse').as('skipDates')
    cy.route('POST', /subscriptioncommand\/v1\/subscriptions\/(.*)\/unskip?/, '@subscriptionUpdateResponse').as('unSkipDates')
    cy.route('DELETE', /order/, {}).as('cancelPendingOrder')
    cy.route('GET', /delivery_day/, {})

    cy.login()
    cy.visit('/')
    cy.visit('/my-deliveries')
    cy.wait(['@currentOrders', '@user', '@projectedDeliveries', '@currentAddress', '@currentSubscription'])
  })

  describe('add box button', () => {
    it('should take the user to the menu', () => {
      cy.get('[data-testing="addBoxButton"]').click()
      cy.url().should('include', 'menu')
    })
  })

  describe('pending orders', () => {
    it('should be cancellable', () => {
      cy.get('[data-testing="pendingOrder"]').first().click()
      cy.get('[data-testing="cancelButton"]').click()
      cy.wait('@cancelPendingOrder')
      cy.contains('You cannot restore this box').should('be.visible')
      cy.get('[data-testing="pendingOrder"]').first().should('contain', 'Cancelled')
    })
  })

  describe('projected deliveries with new subscription api', () => {
    it('should be visible, cancellable and restorable', () => {
      cy.get('[data-testing="projectedDelivery"]').first().get('[data-testing="orderState"]').contains('Scheduled')
      cy.get('[data-testing="projectedDelivery"]').first().click()
      cy.get('[data-testing="cancelButton"]').click()
      cy.wait('@skipDates')
      cy.contains('Cancelled').should('be.visible')
      cy.get('[data-testing="projectedDelivery"]').first().get('[data-testing="orderState"]').contains('Cancelled')
      cy.get('[data-testing="restoreButton"]').click()
      cy.wait('@unSkipDates')
      cy.contains('Scheduled').should('be.visible')
      cy.get('[data-testing="projectedDelivery"]').first().get('[data-testing="orderState"]').contains('Scheduled')
    })

    describe('when all projected deliveries are cancelled', () => {
      it('should show the modal to prompt a user to pause', () => {
        cy.get('[data-testing="projectedDelivery"]').first().get('[data-testing="orderState"]').contains('Scheduled')
        cy.get('[data-testing="projectedDelivery"]').first().click()
        cy.get('[data-testing="cancelButton"]').click()
        cy.wait('@skipDates')
        cy.contains('Cancelled').should('exist')

        cy.get('[data-testing="projectedDelivery"]').eq(1).click()
        cy.get('[data-testing="cancelButton"]').click()
        cy.wait('@skipDates')

        cy.get('[data-testing="cancelledAllBoxesModal"]').should('be.visible')
      })
    })
  })
})
