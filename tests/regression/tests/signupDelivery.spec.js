describe('Given I land on postcode slide of the wizard', () => {
  before(() => {
    cy.server()
    cy.route('/menu/v1/**', 'fixture:menu/twoWeeksDetails.json')
    cy.route('GET', 'brand/v1/theme', 'fixture:brand/brand.json')
    cy.route('GET', 'brand/v1/menu-headers', 'fixture:brand/brandHeaders.json')
    cy.route('GET', 'delivery_day/**/stock', 'fixture:stock/deliveryDayStock.json')
    cy.route('GET', 'deliveries/v1.0/**', 'fixture:deliveries/deliveryDays.json').as('getDeliveries')
    cy.visit('/signup/box-size')
    cy.mockDate()
    cy.get('[data-testing="signupBoxSize2Portions"]').click()
    cy.get('[data-testing="signupPostcodeInput"]').type('W140EE')
    cy.wait(['@getDeliveries'])
    cy.get('[data-testing="signupPostcodeCTADesktop"]').click()
  })

  describe('And I click the CTA', () => {
    beforeEach(() => {
      cy.get('[data-testing="signupDeliveryCTA"]').click()
    })
    it('Then I can proceed to the menu', () => {
      cy.url().should('include', '/menu')
    })
  })
})
