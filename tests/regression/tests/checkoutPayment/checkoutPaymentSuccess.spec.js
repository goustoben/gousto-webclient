import {
  goToPayment,
  getHouseNo,
  getPaymentSyncErrors,
  fillAllIframe,
  clearAndFillNumberIframe
} from '../../pageUtils/checkout/checkoutPayment'

const CARDNAME_ERROR = { cardName: 'Card name is required' }
const ADDRESS = "FLAT 10, MORRIS HOUSE, SWAINSON ROAD, LONDON, MIDDLESEX, W3 7UP"
const HOUSENO = 'FLAT 10, MORRIS HOUSE'

describe("Given I'm a logged out user who has passed the first steps of checkout correctly", () => {
  before(() => {
    cy.setCookie('v1_goustoStateStore_basket_postcode', '"W37UP"')
    cy.server()
    cy.route('GET', '/menu/v1/**', 'fixture:menu/twoWeeksDetails.json').as('getMenu')
    cy.route('GET', 'brand/v1/theme', 'fixture:brand/brand.json').as('getBrand')
    cy.route('GET', 'brand/v1/menu-headers', 'fixture:brand/brandHeaders.json')
    cy.route('GET', 'deliveries/v1.0/**', 'fixture:deliveries/deliveryDays.json').as('getDeliveries')
    cy.route('GET', '/customers/v1/intervals', 'fixture:customers/intervals.json').as('getIntervals')
    cy.route('GET', '/prices**', 'fixture:prices/2person2portionNoDiscount.json').as('getPrices')
    cy.route('POST', /order\/preview/, 'fixture:order/preview.json').as('previewOrder')
    cy.route('GET', 'boxPrices', 'fixture:boxPrices/priceNoPromocode.json').as('getBoxPrice')
    cy.route('GET', 'delivery_day/**/stock', 'fixture:stock/deliveryDayStock.json').as('getStock')
    cy.route('GET', 'address/postcode-lookup**', 'fixture:address/postcodeLookup.json').as('getAddresses')
    cy.mockDate()
    goToPayment()
  })

  describe('When I land on the payment step of checkout ', () => {
    it("Then my address has persisted from the previous step", () => {
      cy.get('[data-testing="checkoutBillingAddress"]')
        .should('contain', ADDRESS)
        cy.window().then(getHouseNo).should('equal', HOUSENO)
    })

    describe('And I have not filled in my card name', () => {
      describe('And I click the CTA', () => {
        it("Then the button will be disabled", () => {
          cy.get('[data-testing="checkoutCTA"]')
            .click()
          cy.url().should('include', 'check-out/payment')
        })

        it("Then I will receive the correct error message", () => {
          cy.window().then(getPaymentSyncErrors).should('deep.equal', CARDNAME_ERROR)
          cy.get('[data-testing="checkoutCardNameInputError"]').should('be.visible')
        })
      })
    })

    describe('And I have filled in my name correctly', () => {
      beforeEach(() => {
        cy.get('[data-testing="checkoutCardNameInput"]').click().clear().type('Test')
      })
      describe('And I have not filled in my card details', () => {
        describe('And I click the CTA', () => {
          beforeEach(() => {
            cy.get('[data-testing="checkoutCTA"]')
              .click()
          })
          it("Then the button will be disabled and I will see the right error", () => {
            cy.url().should('include', 'check-out/payment')
            cy.get('[data-testing="valid-card-details-not-provided"]').should('be.visible')
          })
        })
      })

      describe('And I have made a mistake in my card details', () => {
        beforeEach(() => {
          fillAllIframe({
            number: '4242',
            expiry: '0550',
            cvv: '100'
          })
        })
        describe('And I click the CTA', () => {
          beforeEach(() =>{
            cy.get('[data-testing="checkoutCTA"]')
              .click()
          })

          it("Then the button will be disabled and I will see the right error", () => {
            cy.url().should('include', 'check-out/payment')
            cy.get('[data-testing="checkoutFrameCardNoError"]').should('be.visible')
          })
        })
      })

      describe('And I have filled in my card details correctly', () => {
        beforeEach(() => {
          clearAndFillNumberIframe({ number: '4242 4242 4242 4242'})
          cy.get('[data-testing="checkoutCTA"]')
            .click()
        })

        it("Then no input errors are shown", () => {
          cy.get('[data-testing="checkoutFrameCardNoError"]').should('not.be.visible')
          cy.get('[data-testing="checkoutFrameExpiryError"]').should('not.be.visible')
          cy.get('[data-testing="checkoutFrameCVVError"]').should('not.be.visible')
        })
      })
    })
  })
})
