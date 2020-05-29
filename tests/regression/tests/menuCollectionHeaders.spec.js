import { withPlatformTags, MOBILE, WEB } from '../utils/tags'

describe("MenuCollectionHeaders", () => {
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

  describe('click on waveLinkHeader', () => {
    it('should change collection', () => {
      cy.wait('@getDeliveries')
      cy.get('[data-testing="waveLinkHeader"]').click()
      cy.url().should('include', 'collection=healthy-choices')
    })
  })
})

