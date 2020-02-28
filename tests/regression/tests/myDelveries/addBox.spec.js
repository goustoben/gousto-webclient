
describe("Add box", () => {
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

    cy.login()
    cy.visit('/mydeliveries')
  })

  it("should take the user to the menu", () => {
    cy.get('[data-testing="addBoxButton"]').click()
    cy.url().should('include', 'menu')
  })
})
