describe('Given I am logged in', () => {
  before(() => {
    cy.login()
  })

  describe('When I visit /subscription-settings', () => {
    beforeEach(() => {
      cy.server()
      cy.fixture('user/userCurrent').as('userCurrent')
      cy.route('GET', /user\/current/, '@userCurrent')
      cy.fixture('user/userCurrentOrders').as('userCurrentOrders')
      cy.route('GET', /user\/current\/orders/, '@userCurrentOrders').as('currentOrders')
      cy.fixture('user/userCurrentProjectedDeliveries').as('userCurrentProjectedDeliveries')
      cy.route('GET', /user\/current\/projected-deliveries/, '@userCurrentProjectedDeliveries').as('projectedDeliveries')
      cy.fixture('user/userCurrentAddress').as('userCurrentAddress')
      cy.fixture('user/userCurrentSubscription').as('userCurrentSubscription')
      cy.route('GET', /user\/current\/subscription/, '@userCurrentSubscription').as('currentSubscription')
      cy.fixture('orderSkipRecovery').as('orderSkipRecovery')
      cy.fixture('user/userCurrentSubscriptionDelivery').as('userCurrentSubscriptionDelivery')

      cy.visit('/subscription-settings')
      cy.wait(['@currentOrders','@projectedDeliveries', '@currentSubscription'])
    })

    it('Then I see Subscription Settings Page', () => {
      cy.get('[data-testing="subscriptionSettingsPage"]')
        .should('be.visible')
    })
  })
})
