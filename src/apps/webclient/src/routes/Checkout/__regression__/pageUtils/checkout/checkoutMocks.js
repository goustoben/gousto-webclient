export const setMocks = ({ validPostcode }) => {
  const postCodeMock = validPostcode ? 'valid' : 'invalid'
  cy.intercept('GET', '/menu/v1/**', { fixture: 'menu/twoWeeksDetails.json' })
  cy.intercept('GET', '/userbucketing/v1/user/experiments', {
    fixture: 'userbucketing/userbucketing.json',
  })
  cy.intercept('GET', 'brand/v1/theme', { fixture: 'brand/brand.json' })
  cy.intercept('GET', 'brand/v1/menu-headers', { fixture: 'brand/brandHeaders.json' })
  cy.intercept('GET', 'deliveries/v1.0/**', { fixture: 'deliveries/deliveryDays.json' }).as(
    'getDeliveryDays',
  )
  cy.intercept('GET', '/customers/v1/intervals', { fixture: 'customers/intervals.json' })
  cy.intercept('POST', /order\/preview/, { fixture: 'order/preview.json' })
  cy.intercept('GET', 'delivery_day/**/stock', { fixture: 'stock/deliveryDayStock.json' })
  cy.intercept('GET', '/prices**', { fixture: 'prices/2person2portionNoDiscount.json' })
  cy.intercept('GET', 'boxPrices', { fixture: 'boxPrices/priceNoPromocode.json' })
  cy.intercept('GET', '/address/postcode-lookup**', {
    fixture: `checkout/postcode/${postCodeMock}.json`,
  })
  cy.intercept('POST', 'prospect', { fixture: 'checkout/prospect/prospect.json' })
  cy.intercept('POST', /validate/, { fixture: 'checkout/validate/validate.json' })
}

export const setPaymentSpecificMocks = () => {
  cy.intercept('GET', '/customers/v1/customers/reference', { fixture: 'customers/reference.json' })
  cy.intercept('GET', '/customers/v1/customers/promocode', { fixture: 'customers/promocode.json' })
  cy.intercept('POST', '/payments/v1/payments/payment-auth', {
    fixture: 'payments/paymentAuth.json',
  })
  cy.intercept('GET', '/payments/v1/payments/payments/**', { fixture: 'payments/payment.json' })
}
