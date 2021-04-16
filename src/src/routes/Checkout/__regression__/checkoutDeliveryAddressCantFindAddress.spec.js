import * as checkoutAboutYou from './pageUtils/checkout/checkoutAboutYou'
import * as checkoutDelivery from './pageUtils/checkout/checkoutDelivery'
import { withPlatformTags, WEB, MOBILE } from '../../../utils/regression/tags'

describe('Given I’m a gousto logged-out website visitor', () => {
  describe('When I land on the delivery step of the checkout', () => {
    before(() => {
      cy.setCookie('v1_goustoStateStore_basket_postcode', '"W140EE"')

      checkoutDelivery.setMocks({ validPostcode: true })
      cy.mockDate()
      checkoutAboutYou.goToCheckout()

      checkoutAboutYou.clearAndFillCheckoutForm({
        firstname: 'Joe',
        lastname: 'Tester',
        email: 'test@email.com',
        password: '1234abcd',
      })
    })

    withPlatformTags(WEB).describe('And entered a valid postcode on desktop', () => {
      before(() => {
        cy.get('[data-testing="checkoutCTA"]').click()
      })

      describe('And when I click on `Can’t find your address` button', () => {
        before(() => {
          cy.get('[data-testing="addressNotFound"]').click()
        })

        it('Then an empty addresses fields appear', () => {
          cy.get('input[data-testing="houseNo"]').should('have.value', '')
        })
      })
    })

    withPlatformTags(MOBILE).describe('And entered a valid postcode on mobile', () => {
      describe('And when I click on `Can’t find your address` button', () => {
        before(() => {
          cy.get('[data-testing="addressNotFound"]').click()
        })

        it('Then an empty addresses fields appear', () => {
          cy.get('input[data-testing="houseNo"]').should('have.value', '')
        })
      })
    })
  })
})
