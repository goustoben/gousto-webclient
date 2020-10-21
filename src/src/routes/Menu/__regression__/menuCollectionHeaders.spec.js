describe('MenuCollectionHeaders', () => {
  afterEach(() => {
    cy.clock().then((clock) => {
      clock.restore()
    })
  })

  describe('click on waveLinkHeader', () => {
    it('should change collection', () => {
      cy.server()
      cy.route('GET', 'boxPrices', 'fixture:boxPrices/priceNoPromocode.json').as('getBoxPrice')
      cy.route('GET', 'brand/v1/theme', 'fixture:brand/brand.json').as('getBrand')
      cy.route('GET', 'brand/v1/menu-headers', 'fixture:brand/brandHeaders.json')
      cy.route('GET', 'deliveries/v1.0/**', 'fixture:deliveries/deliveryDays.json').as('getDeliveries')
      cy.route('GET', 'delivery_day/**/stock', 'fixture:stock/deliveryDayStock.json').as('getStock')
      cy.route('GET', '/menu/v1/**', 'fixture:menu/twoWeeksDetails.json').as('getMenu')
      cy.route('GET', '/userbucketing/v1/user/experiments', 'fixture:userbucketing/userbucketing.json').as('getExperiments')
      const DATE = new Date(2020, 4, 1).getTime()
      cy.clock(DATE, ['Date'])
      cy.visit('/menu')
      cy.wait(['@getMenu', '@getBrand', '@getStock', '@getDeliveries'])
      cy.wait('@getDeliveries')
      cy.get('[data-testing="waveLinkHeader"]').click()
      cy.url().should('include', 'collection=healthy-choices')
    })
  })
})

