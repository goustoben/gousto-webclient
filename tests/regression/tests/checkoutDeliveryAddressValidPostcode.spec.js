import { withPlatformTags, WEB, MOBILE } from '../utils/tags'
import * as checkoutAboutYou  from '../pageUtils/checkoutAboutYou'
import * as checkoutDelivery  from '../pageUtils/checkoutDelivery'

describe('Given I’m a gousto logged-out website visitor', () => {
  describe('When I land on the delivery step of the checkout', () => {
    before(() => {
      cy.setCookie('v1_goustoStateStore_basket_postcode', '"W140EE"')

      checkoutDelivery.setMocks({ validPostcode: true })
      cy.clock(new Date(2020, 4, 1).getTime(), ['Date'])
      checkoutAboutYou.goToCheckout()

      checkoutAboutYou.clearAndFillCheckoutForm({
        firstname: 'Joe',
        lastname: 'Tester',
        email: 'test@email.com',
        password: '1234abcd'
      })
    })

    withPlatformTags(WEB).describe('And entered a valid postcode on desktop', () => {
      before(() => {
        cy.get('[data-testing="checkoutCTA"]').click()
      })

      it('Then my postcode is pre-filled based on what I’ve inputed in the wizard / menu previously', () => {
        cy.get('[data-testing="checkoutPostcode"]').should('have.value', 'W140EE')

        cy.get('[data-testing="checkoutAddressDropdown"]')
          .click()
          .get('.Select-menu-outer .Select-menu .Select-option')
          .eq(1)
          .click()

        cy.get('input[data-testing="houseNo"]').should('have.value', 'THE SHEPHERDS BUILDING')
      })

      it('And then the “Use this address“ CTA is enabled', () => {
        cy.get('[data-testing="checkoutSelectAddressCTA"]').click()
        cy.get('[data-testing="checkoutDeliverySection"] h4').contains('Deliver to')
      })
    })

    withPlatformTags(MOBILE).describe('And entered a valid postcode on mobile', () => {
      it('Then my postcode is pre-filled based on what I’ve inputed in the wizard / menu previously', () => {
        cy.get('[data-testing="checkoutPostcode"]').should('have.value', 'W140EE')

        cy.get('select[data-testing="houseNo"]').select('"25953315"')

        cy.get('input[data-testing="houseNo"]').should('have.value', 'THE SHEPHERDS BUILDING')
      })

      it('And then the “Use this address“ CTA is enabled', () => {
        cy.get('[data-testing="checkoutSelectAddressCTA"]').click()
        cy.get('[data-testing="checkoutDeliverySection"] h4').contains('Deliver to')
      })
    })
  })
})
