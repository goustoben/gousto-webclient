import { withPlatformTags, MOBILE, WEB } from '../utils/tags'

describe("Menu-BrowseCTA", () => {
  beforeEach(() => {
    cy.server()
    cy.route('GET', 'boxPrices', 'fixture:boxPrices/priceNoPromocode.json').as('getBoxPrice')
    cy.route('GET', 'brand/v1/theme', 'fixture:brand/brand.json').as('getBrand')
    cy.route('GET', 'brand/v1/menu-headers', 'fixture:brand/brandHeaders.json')
    cy.route('GET', 'deliveries/v1.0/**', 'fixture:deliveries/deliveryDays.json').as('getDeliveries')
    cy.route('GET', 'delivery_day/**/stock', 'fixture:stock/deliveryDayStock.json').as('getStock')
    cy.route('/menu/v1/**', 'fixture:menu/twoWeeksDetails.json').as('getMenu')
    cy.visit('/menu')
    const DATE = new Date(2020, 4, 1).getTime()
    cy.clock(DATE, ['Date'])
    cy.wait(['@getMenu', '@getBrand', '@getStock', '@getDeliveries'])
  })
  
  afterEach(() => {
    cy.clock().then((clock) => {
      clock.restore()
    })
  })

  describe('add recipe', () => {
    withPlatformTags(WEB).it('should open browse CTA overlay', () => {
      cy.wait('@getDeliveries')

      cy.get('[data-testing="menuRecipeAdd"]').first().click()
      cy.get('[data-testing="menuBrowseCTAOverlay"]').should('be.visible')
    })
    withPlatformTags(MOBILE).it('should open browse CTA overlay', () => {
      cy.wait('@getDeliveries')

      cy.get('[data-testing="menuRecipeAdd"]').first().click()
      cy.get('[data-testing="menuBrowseCTAOverlay"]').should('be.visible')
    })
  })
  
  describe('click on browseCTA', () => {
    withPlatformTags(WEB).it('should open box summary desktop', () => {
      cy.wait('@getDeliveries')

      cy.get('[data-testing="menuRecipeAdd"]').first().click()
      cy.get('[data-testing="menuBrowseCTAOverlay"]').click()
      cy.get('[data-testing="boxSummaryDesktop"]').should('be.visible')
    })
    
    withPlatformTags(MOBILE).it('should open box summary mobile', () => {
      cy.wait('@getDeliveries')

      cy.get('[data-testing="menuRecipeAdd"]').first().click()
      cy.get('[data-testing="menuBrowseCTAOverlay"]').click()
      cy.get('[data-testing="boxSummaryMobile"]').should('be.visible')
    })
  })
})

