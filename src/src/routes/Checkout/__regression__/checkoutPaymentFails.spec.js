import {
  goToPayment,
  fillAllIframe
} from './pageUtils/checkout/checkoutPayment'

describe("Given I'm a logged out user who has made a mistake in the first steps of checkout", () => {
  before(() => {
    cy.setCookie('v1_goustoStateStore_basket_postcode', '"W37UP"')
    cy.server()
    cy.route('GET', '/menu/v1/**', 'fixture:menu/twoWeeksDetails.json').as('getMenu')
    cy.route('GET', 'brand/v1/theme', 'fixture:brand/brand.json').as('getBrand')
    cy.route('GET', 'brand/v1/menu-headers', 'fixture:brand/brandHeaders.json')
    cy.route('GET', 'deliveries/v1.0/**', 'fixture:deliveries/deliveryDays.json').as('getDeliveries')
    cy.route('GET', '/customers/v1/intervals', 'fixture:customers/intervals.json').as('getIntervals')
    cy.route('GET', '/customers/v1/customers/reference', 'fixture:customers/reference.json')
    cy.route('GET', '/customers/v1/customers/promocode', 'fixture:customers/promocode.json')
    cy.route('POST', '/customers/v2/signup', 'fixture:customers/signupError.json').as('signupError')
    cy.route('POST', '/payments/v1/payments/payment-auth', 'fixture:payments/paymentAuth.json')
    cy.route('GET', '/payments/v1/payments/payments/**', 'fixture:payments/payment.json')
    cy.route('GET', '/prices**', 'fixture:prices/2person2portionNoDiscount.json').as('getPrices')
    cy.route('POST', /order\/preview/, 'fixture:order/preview.json').as('previewOrder')
    cy.route('GET', 'boxPrices', 'fixture:boxPrices/priceNoPromocode.json').as('getBoxPrice')
    cy.route('GET', 'delivery_day/**/stock', 'fixture:stock/deliveryDayStock.json').as('getStock')
    cy.route('GET', 'address/postcode-lookup**', 'fixture:address/postcodeLookup.json').as('getAddresses')
    cy.mockDate()
    goToPayment()
  })

  describe('When I land on the payment step of checkout ', () => {
    describe('And I fill in my payment details and click the CTA', () => {
      beforeEach(() => {
        cy.get('[data-testing="checkoutCardNameInput"]').click().type('Test')
        fillAllIframe({
          number: '4485 0403 7153 6584',
          expiry: '0550',
          cvv: '100'
        })
        cy.get('[data-testing="checkoutCTA"]')
          .click()
      })

      it('Then the button will be disabled and I will see the correct error', () => {
        cy.wait(['@signupError'])
        cy.url().should('include', 'check-out/payment')
        cy.get('[data-testing="user-phone-number-invalid"]')
      })
    })
  })
})
