import { withPlatformTags, WEB } from '../../../utils/regression/tags'

describe('MenuCollectionHeaders', () => {
  afterEach(() => {
    cy.clock().then((clock) => {
      clock.restore()
    })
  })

  describe('click on waveLinkHeader', () => {
    withPlatformTags(WEB).it('should change collection', () => {
      cy.stubAll3rdParties()
      cy.server()
      cy.route('GET', 'boxPrices', 'fixture:boxPrices/priceNoPromocode.json').as('getBoxPrice')
      cy.route('GET', 'brand/v1/theme', 'fixture:brand/brand.json').as('getBrand')
      cy.route('GET', 'brand/v1/menu-headers', 'fixture:brand/brandHeaders.json')
      cy.route('GET', 'deliveries/v1.0/**', 'fixture:deliveries/deliveryDays.json').as(
        'getDeliveries',
      )
      cy.route('GET', 'delivery_day/**/stock', 'fixture:stock/deliveryDayStock.json').as('getStock')
      cy.route('GET', '/menu/v1/**', 'fixture:menu/twoWeeksDetails.json').as('getMenu')
      cy.route(
        'GET',
        '/userbucketing/v1/user/experiments',
        'fixture:userbucketing/userbucketing.json',
      ).as('getExperiments')
      cy.route('GET', '/promocode/**', 'fixture:promoCode/promoCodeDetails').as('promoCodeDetails')
      cy.mockDate()
      cy.visit('/menu')
      cy.wait(['@getMenu', '@getBrand', '@getStock', '@getDeliveries'])
      cy.wait('@getDeliveries')
      cy.applyPromoCode()
      cy.get('body').then(($body) => {
        if ($body.find('[data-testing="waveLinkHeader"]').length) {
          cy.get('[data-testing="waveLinkHeader"]').click()
          cy.url().should('include', 'collection=healthy-choices')
        }
      })
    })
  })
})
