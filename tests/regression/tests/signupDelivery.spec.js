describe('Given I land on postcode slide of the wizard', () => {
  before(() => {
    cy.server()
    cy.route('/menu/v1/**', 'fixture:menu/twoWeeksDetails.json')
    cy.route('GET', 'brand/v1/theme', 'fixture:brand/brand.json')
    cy.route('GET', 'brand/v1/menu-headers', 'fixture:brand/brandHeaders.json')
    cy.route('GET', 'delivery_day/**/stock', 'fixture:stock/deliveryDayStock.json')
    cy.route('GET', 'deliveries/v1.0/**', 'fixture:deliveries/deliveryDays.json').as('getDeliveries')
    cy.mockDate()
    cy.visit('/signup/?steps=delivery')
    cy.wait(['@getDeliveries'])
    })

  describe('And I click the CTA', () => {
    beforeEach(() => {
      cy.waitUntil(() => cy.get('[data-testing="signupDeliveryDay"]').should('be.visible'), {
        timeout: 10000
      })
      cy.get('[data-testing="signupDeliveryCTA"]')
        .click()
    })
    it('Then I can proceed to the menu', () => {
      cy.url().should('include', '/menu')
    })
  })
})
