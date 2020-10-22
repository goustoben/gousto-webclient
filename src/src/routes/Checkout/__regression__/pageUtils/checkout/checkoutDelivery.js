export const setMocks = ({ validPostcode }) => {
  const postCodeMock = validPostcode
    ? 'valid'
    : 'invalid'

  cy.server()
  cy.route('GET', '/menu/v1/**', 'fixture:menu/twoWeeksDetails.json')
  cy.route('GET', '/userbucketing/v1/user/experiments', 'fixture:userbucketing/userbucketing.json').as('getExperiments')
  cy.route('GET', 'brand/v1/theme', 'fixture:brand/brand.json')
  cy.route('GET', 'brand/v1/menu-headers', 'fixture:brand/brandHeaders.json')
  cy.route('GET', 'deliveries/v1.0/**', 'fixture:deliveries/deliveryDays.json').as('getDeliveries')
  cy.route('GET', '/customers/v1/intervals', 'fixture:customers/intervals.json')
  cy.route('POST', /order\/preview/, 'fixture:order/preview.json').as('previewOrder')
  cy.route('GET', 'delivery_day/**/stock', 'fixture:stock/deliveryDayStock.json')
  cy.route('GET', /address\/postcode-lookup/, `fixture:checkout/postcode/${postCodeMock}.json`)
  cy.route('POST', 'prospect', 'fixture:checkout/prospect/prospect.json')
  cy.route('POST', /validate/, 'fixture:checkout/validate/validate.json')
}
