import { goToCheckout, goToCheckoutDeliveryDetails } from '../pageUtils/checkout/checkoutAboutYou'
import { setMocks } from '../pageUtils/checkout/checkoutDelivery'

describe("Given I'm a logged out user", () => {
  describe('When I land on the delivery detail step of the checkout', () => {
    before(() => {
      cy.setCookie('v1_goustoStateStore_basket_postcode', '"W140EE"')

      setMocks({ validPostcode: true })
      cy.clock(new Date(2020, 4, 1).getTime(), ['Date'])
      goToCheckout()
      goToCheckoutDeliveryDetails()
    })

    describe('And I’ve entered a phone number with less than 10 numerical characters', () => {
      before(() => {
        cy.get('[data-testing="checkoutPhoneNumberInput"]')
          .type('7782382334')
      })

      it('Then the “Next: Payment“ CTA is enabled', () => {
        cy.get('[data-testing="checkoutCTA"]').click()
        cy.url().should('include', 'check-out/payment')
      })
    })
  })
})
