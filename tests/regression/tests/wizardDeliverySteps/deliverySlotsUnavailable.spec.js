describe("Given I land on the delivery step of the wizard", () =>{
  const DATE = new Date(2020, 4, 1).getTime()

  before(() => {
    cy.server()
    cy.clock(DATE, ['Date'])
    cy.route('/menu/v1/**', 'fixture:menu/twoWeeksDetails.json').as('getMenu')
    cy.route('GET', 'brand/v1/theme', 'fixture:brand/brand.json').as('getBrand')
    cy.route('GET', 'brand/v1/menu-headers', 'fixture:brand/brandHeaders.json')
    cy.route('GET', 'delivery_day/**/stock', 'fixture:stock/deliveryDayStock.json').as('getStock')
    cy.route('GET', 'deliveries/v1.0/**', 'fixture:deliveries/deliveryDaysAllUnavailable.json').as('getDeliveriesAllUnavailable')
    cy.visit('signup?steps=delivery')
  })

  describe('When all slots are unavailable', () => {
    it("Then it should display the capacity message", () => {
      cy.wait(['@getDeliveriesAllUnavailable', '@getStock'])
      cy.url().should('include', '/signup/delivery-options?steps=delivery')
      cy.get('[data-testing="signupDeliveryStepCapacityAlert"]')
     })

     it("And it should not display the CTA", () => {
      cy.get('[data-testing="signupDeliveryCTA"]').should('not.exist');
    })
  })
})
