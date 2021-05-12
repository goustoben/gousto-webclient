describe('My Deliveries', () => {
  beforeEach(() => {
    cy.server()
    cy.interceptOptimizelyJavascript().as('optimizelyJs')
    cy.fixture('user/userCurrent').as('userCurrent')
    cy.route('GET', /user\/current/, '@userCurrent')
    cy.fixture('user/userCurrentOrders').as('userCurrentOrders')
    cy.route('GET', /user\/current\/orders/, '@userCurrentOrders').as('currentOrders')
    cy.fixture('user/userCurrentProjectedDeliveries').as('userCurrentProjectedDeliveries')
    cy.route('GET', /user\/current\/projected-deliveries/, '@userCurrentProjectedDeliveries').as('projectedDeliveries')
    cy.fixture('user/userCurrentAddress').as('userCurrentAddress')
    cy.route('GET', /user\/current\/address/, '@userCurrentAddress').as('currentAddress')
    cy.fixture('user/userCurrentActiveSubscription').as('userCurrentSubscription')
    cy.route('GET', /user\/current\/subscription/, '@userCurrentSubscription').as('currentSubscription')
    cy.fixture('user/userAddresses').as('userAdresses')
    cy.route('GET', '/customers/v1/customers/17247344/addresses', '@userAdresses')
    cy.fixture('orderSkipRecovery').as('orderSkipRecovery')
    cy.route('GET', /orderskiprecovery/, '@orderSkipRecovery')
    cy.fixture('user/userCurrentSubscriptionDelivery').as('userCurrentSubscriptionDelivery')
    cy.route('POST', /user\/current\/subscription\/delivery\/disable/, '@userCurrentSubscriptionDelivery').as('cancelProjectedDelivery')
    cy.route('POST', /user\/(.*)\/subscription\/delivery\/enable/, '@userCurrentSubscriptionDelivery').as('restoreProjectedDelivery')
    cy.route('DELETE', /order/, {}).as('cancelPendingOrder')
    cy.route('GET', /delivery_day/, {})
    cy.login()
    cy.visit('/my-deliveries')
    cy.wait(['@optimizelyJs', '@currentOrders','@projectedDeliveries','@currentAddress', '@currentSubscription'])
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

  describe('projected deliveries with core subscription api', () => {
    beforeEach(() => {
      cy.setFeatures([{ feature: 'isNewSubscriptionApiEnabled', value: false }])
    })

    it('should be cancellable and restorable', () => {
      cy.get('[data-testing="projectedDelivery"]').first().get('[data-testing="orderState"]').contains('Scheduled')
      cy.get('[data-testing="projectedDelivery"]').first().click()
      cy.get('[data-testing="cancelButton"]').click()
      cy.wait('@cancelProjectedDelivery')
      cy.contains('Cancelled').should('be.visible')
      cy.get('[data-testing="projectedDelivery"]').first().get('[data-testing="orderState"]').contains('Cancelled')
      cy.get('[data-testing="restoreButton"]').click()
      cy.wait('@restoreProjectedDelivery')
      cy.contains('Scheduled').should('be.visible')
      cy.get('[data-testing="projectedDelivery"]').first().get('[data-testing="orderState"]').contains('Scheduled')
    })

    describe('when all projected deliveries are cancelled', () => {
      beforeEach(() => {
        cy.setFeatures([{ feature: 'isNewSubscriptionApiEnabled', value: false }])
      })

      it('should be cancellable and restorable', () => {
        cy.get('[data-testing="projectedDelivery"]').first().get('[data-testing="orderState"]').contains('Scheduled')
        cy.get('[data-testing="projectedDelivery"]').first().click()
        cy.get('[data-testing="cancelButton"]').click()
        cy.wait('@cancelProjectedDelivery')
        cy.contains('Cancelled').should('be.visible')
        cy.get('[data-testing="projectedDelivery"]').first().get('[data-testing="orderState"]').contains('Cancelled')
        cy.get('[data-testing="restoreButton"]').click()
        cy.wait('@restoreProjectedDelivery')
        cy.contains('Scheduled').should('be.visible')
        cy.get('[data-testing="projectedDelivery"]').first().get('[data-testing="orderState"]').contains('Scheduled')
      })
    })
  })
})
