import { withPlatformTags, MOBILE, WEB } from '../../../utils/regression/tags'

describe('Menu-BrowseCTA', () => {
  before(() => {
    cy.server()
    const DATE = new Date(2020, 4, 1).getTime()
    cy.clock(DATE, ['Date'])
    cy.route('GET', 'boxPrices', 'fixture:boxPrices/priceNoPromocode.json').as('getBoxPrice')
    cy.route('GET', 'brand/v1/theme', 'fixture:brand/brand.json').as('getBrand')
    cy.route('GET', 'brand/v1/menu-headers', 'fixture:brand/brandHeaders.json')
    cy.route('GET', 'deliveries/v1.0/**', 'fixture:deliveries/deliveryDays.json').as('getDeliveries')
    cy.route('GET', 'delivery_day/**/stock', 'fixture:stock/deliveryDayStock.json').as('getStock')
    cy.route('GET', '/menu/v1/**', 'fixture:menu/twoWeeksDetails.json').as('getMenu')
    cy.route('GET', '/userbucketing/v1/user/experiments', 'fixture:userbucketing/userbucketing.json').as('getExperiments')
    cy.visit('/menu')
    cy.wait(['@getMenu', '@getBrand', '@getStock', '@getDeliveries'])
  })
  after(() => {
    cy.clock().then((clock) => {
      clock.restore()
    })
  })

  describe('add recipe', () => {
    it('should open browse CTA overlay', () => {
      cy.wait('@getDeliveries')

      cy.get('[data-testing="menuRecipeAdd"]').first().click()
      cy.get('[data-testing="menuBrowseCTAOverlay"]').should('be.visible')
    })
  })

  describe('click on browseCTA', () => {
    withPlatformTags(WEB).it('should open box summary desktop', () => {
      cy.get('[data-testing="menuBrowseCTAOverlay"]').last().click()
      cy.get('[data-testing="boxSummaryDesktop"]').should('be.visible')
    })

    withPlatformTags(MOBILE).it('should open box summary mobile', () => {
      cy.get('[data-testing="menuBrowseCTAOverlay"]').first().click()
      cy.get('[data-testing="boxSummaryMobile"]').should('be.visible')
    })
  })
})

