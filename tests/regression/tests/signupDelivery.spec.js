describe('Given I am a logged out user who navigates from the menu to the signup delivery step', () => {
  before(() => {
    cy.server()
    cy.mockDate()
    cy.route('GET', 'boxPrices', 'fixture:boxPrices/priceNoPromocode.json').as('getBoxPrice')
    cy.route('GET', 'brand/v1/theme', 'fixture:brand/brand.json').as('getBrand')
    cy.route('GET', 'brand/v1/menu-headers', 'fixture:brand/brandHeaders.json')
    cy.route('GET', 'deliveries/v1.0/**', 'fixture:deliveries/deliveryDays.json').as('getDeliveryDays')
    cy.route('GET', 'delivery_day/**/stock', 'fixture:stock/deliveryDayStock.json').as('getStock')
    cy.route('/menu/v1/**', 'fixture:menu/twoWeeksDetails.json').as('getMenu')
    cy.visit('/menu')
    cy.wait(['@getMenu', '@getBrand', '@getStock', '@getDeliveryDays'])
    cy.setupMenu({ platform: Cypress.env('platform') === 'mobile' ? 'MOBILE' : 'WEB' })
    cy.wait('@getDeliveryDays')
    cy.get('[data-testing="headerLogo"]').click()
    cy.get('[data-testing="homepageHeroCTA"]').click()
    cy.get('[data-testing="signupBoxSize2Portions"]').click()
    cy.get('[data-testing="signupPostcodeCTADesktop"]').click()
    })

  describe('And I click the CTA', () => {
    beforeEach(() => {
      cy.get('[data-testing="signupDeliveryCTA"]')
        .click()
    })
    it('Then I can proceed to the menu', () => {
      cy.url().should('include', '/menu')
    })
  })
})
