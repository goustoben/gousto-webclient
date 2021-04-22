import { getStore } from './checkoutGeneralUtils'

export const setMocks = () => {
  cy.server()
  cy.route('GET', '/menu/v1/**', 'fixture:menu/twoWeeksDetails.json').as('getMenu')
  cy.route(
    'GET',
    '/userbucketing/v1/user/experiments',
    'fixture:userbucketing/userbucketing.json'
  ).as('getExperiments')
  cy.route('GET', 'brand/v1/theme', 'fixture:brand/brand.json').as('getBrand')
  cy.route('GET', 'brand/v1/menu-headers', 'fixture:brand/brandHeaders.json')
  cy.route('GET', 'deliveries/v1.0/**', 'fixture:deliveries/deliveryDays.json').as('getDeliveries')
  cy.route('GET', '/prices**', 'fixture:prices/2person2portionNoDiscount.json').as('getPrices')
  cy.route('POST', /order\/preview/, 'fixture:order/preview.json').as('previewOrder')
  cy.route('GET', 'boxPrices', 'fixture:boxPrices/priceNoPromocode.json').as('getBoxPrice')
  cy.route('GET', 'delivery_day/**/stock', 'fixture:stock/deliveryDayStock.json').as('getStock')
  cy.mockDate()
}

export const visitCheckout = () => {
  if (Cypress.env().platform === 'mobile') {
    cy.visit('/check-out/boxdetails')
  } else {
    cy.visit('/check-out/aboutyou')
  }
}

export const addRecipeDispatch = () => {
  cy.window().then(getStore).invoke('dispatch', {
    type: 'BASKET_RECIPE_ADD',
    recipeId: '2413',
  })
}
