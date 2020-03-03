describe("Cancel a pending order", () => {
  beforeEach(() => {
    cy.server()
    cy.fixture('user/userCurrent').as('userCurrent')
    cy.route('GET', /user\/current/, '@userCurrent')
    cy.fixture('user/userCurrentOrders').as('userCurrentOrders')
    cy.route('GET', /user\/current\/orders/, '@userCurrentOrders')
    cy.fixture('user/userCurrentProjectedDeliveries').as('userCurrentProjectedDeliveries')
    cy.route('GET', /user\/current\/projected-deliveries/, '@userCurrentProjectedDeliveries')
    cy.fixture('user/userCurrentAddress').as('userCurrentAddress')
    cy.route('GET', /user\/current\/address/, '@userCurrentAddress')
    cy.fixture('user/userCurrentSubscription').as('userCurrentSubscription')
    cy.route('GET', /user\/current\/subscription/, '@userCurrentSubscription')
    cy.route('GET', /customers\/v1\/customers\/\/addresses/, {})
    cy.fixture('orderSkipRecovery').as('orderSkipRecovery')
    cy.route('GET', /orderskiprecovery/, '@orderSkipRecovery')
    cy.route('DELETE', /order/, {}).as('cancelPendingOrder')

    cy.login()
    cy.visit('/mydeliveries')
  })
  
  it("should be able to cancel the pending order", () => {
    cy.get('[data-testing="pendingOrder"]').first().click()
    cy.get('[data-testing="cancelButton"]').click()
    cy.wait('@cancelPendingOrder')
    cy.get('[data-testing="pendingOrder"]').first().should('contain', 'Cancelled')
  })
})
