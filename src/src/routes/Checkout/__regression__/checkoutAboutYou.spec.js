import { withPlatformTags, WEB, MOBILE } from '../../../utils/regression/tags'
import {
  getAllowEmail,
  getAboutYouSyncErrors,
  getSyncErrors,
  goToCheckout,
  clearAndFillCheckoutForm
} from './pageUtils/checkout/checkoutAboutYou'

const NAME_ERROR = {
  firstName: "Please use only letters (a-z), hyphens (-), apostrophes (' and ‘) and European special characters.",
  lastName: "Please use only letters (a-z), hyphens (-), apostrophes (' and ‘) and European special characters."
}
const EMAIL_ERROR = { email: 'Please provide a valid email address' }
const PASSWORD_ERROR = { password: 'password must be at least 8 characters' }

describe("Given I'm a logged out user", () => {
  describe('When I land on the first step of checkout ', () => {
    before(() => {
      cy.server()
      cy.route('GET', '/menu/v1/**', 'fixture:menu/twoWeeksDetails.json').as('getMenu')
      cy.route('GET', '/userbucketing/v1/user/experiments', 'fixture:userbucketing/userbucketing.json').as('getExperiments')
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
      goToCheckout()
    })

    describe('And I have not filled in my first and last name correctly', () => {
      beforeEach(() => {
        clearAndFillCheckoutForm({
          firstname: 'J8hn',
          lastname: 'Sm!th',
          email: '123@456.com',
          password: '1234abcd'
        })
      })

      withPlatformTags(WEB).it('Then the CTA should be disabled and I should not be able to proceed to the next page', () => {
        cy.get('[data-testing="checkoutCTA"]')
          .click()
        cy.url().should('include', 'check-out/aboutyou')
      })

      withPlatformTags(MOBILE).it('Then the right error should be in the store', () => {
        cy.window().then(getAboutYouSyncErrors).should('deep.equal', NAME_ERROR)
      })
    })

    describe('And I have not filled in my email correctly', () => {
      beforeEach(() => {
        clearAndFillCheckoutForm({
          firstname: 'John',
          lastname: 'Smith',
          email: '123456.com',
          password: '1234abcd'
        })
      })

      withPlatformTags(WEB).it('Then the CTA should be disabled and I should not be able to proceed to the next page', () => {
        cy.get('[data-testing="checkoutCTA"]')
          .click()
        cy.url().should('include', 'check-out/aboutyou')
      })

      withPlatformTags(MOBILE).it('Then the right error should be in the store', () => {
        cy.window().then(getAboutYouSyncErrors).should('deep.equal', EMAIL_ERROR)
      })
    })

    describe('And I have not filled in my password correctly', () => {
      beforeEach(() => {
        clearAndFillCheckoutForm({
          firstname: 'John',
          lastname: 'Smith',
          email: '123@456.com',
          password: '1234abc'
        })
      })

      withPlatformTags(WEB).it('Then the CTA should be disabled and I should not be able to proceed to the next page', () => {
        cy.get('[data-testing="checkoutCTA"]')
          .click()
        cy.url().should('include', 'check-out/aboutyou')
      })

      withPlatformTags(MOBILE).it('Then the right error should be in the store', () => {
        cy.window().then(getAboutYouSyncErrors).should('deep.equal', PASSWORD_ERROR)
      })
    })

    describe('And I have not interacted with the marketing email checkbox', () => {
      it('Then the checkbox should be ticked and stored as true in the Redux store', () => {
        cy.get('[data-testing="checkoutAllowEmailCheckbox"]').should('be.checked')
        cy.window().then(getAllowEmail).should('equal', true)
      })
    })

    describe('And I have clicked the marketing email checkbox', () => {
      it('Then the checkbox should be unticked and stored as true in the Redux store', () => {
        cy.get('[data-testing="checkoutAllowEmailCheckbox"]')
          .click({force: true})
          .should('not.be.checked')
        cy.window().then(getAllowEmail).should('equal', false)
      })
    })

    describe('And I have filled in all fields correctly', () => {
      beforeEach(() => {
        clearAndFillCheckoutForm({
          firstname: 'John',
          lastname: 'Smith',
          email: '123@456.com',
          password: '1234abcd'
        })
      })

      withPlatformTags(WEB).it('Then the CTA should be enabled', () => {
        cy.get('[data-testing="checkoutCTA"]')
          .click()
        cy.url().should('include', 'check-out/delivery')
      })

      withPlatformTags(MOBILE).it('Then there should be no errors in the store', () => {
        cy.window().then(getSyncErrors).should('not.contain.property', 'aboutyou')
      })
    })
  })
})
