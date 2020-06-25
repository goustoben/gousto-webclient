import { withPlatformTags, WEB, MOBILE } from '../utils/tags'
import * as checkoutAboutYou  from '../pageUtils/checkoutAboutYou'
import * as checkoutDelivery  from '../pageUtils/checkoutDelivery'

describe('Given I’m a gousto logged-out website visitor', () => {
  describe('When I land on the delivery step of the checkout', () => {
    before(() => {
      cy.setCookie('v1_goustoStateStore_basket_postcode', '"W14"')
      checkoutDelivery.setMocks({ validPostcode: false })
      cy.clock(new Date(2020, 4, 1).getTime(), ['Date'])
      checkoutAboutYou.goToCheckout()

      checkoutAboutYou.clearAndFillCheckoutForm({
        firstname: 'Joe',
        lastname: 'Tester',
        email: 'test@email.com',
        password: '1234abcd'
      })
    })

    withPlatformTags(WEB).describe('And entered an invalid postcode on desktop', () => {
      before(() => {
        cy.get('[data-testing="checkoutCTA"]').click()
      })

      it('Then I don’t have any address to choose from and I’m acknowledged I need to input a valid postcode', () => {
        cy.get('[data-testing="checkoutPostcodeError"] p').contains('postcode must be at least 5 characters')

        cy.get('[data-testing="checkoutAddressDropdown"]')
        .click()
        .get('.Select-menu-outer .Select-menu .Select-option')
        .eq(1)
        .should('not.exist')
      })
    })

    withPlatformTags(MOBILE).describe('And entered an invalid postcode on mobile', () => {
      it('Then I don’t have any address to choose from and I’m acknowledged I need to input a valid postcode', () => {
        cy.get('[data-testing="checkoutPostcodeError"] p').contains('postcode must be at least 5 characters')

        cy.get('select[data-testing="houseNo"] option').eq(1).should('not.exist')
      })
    })
  })
})
