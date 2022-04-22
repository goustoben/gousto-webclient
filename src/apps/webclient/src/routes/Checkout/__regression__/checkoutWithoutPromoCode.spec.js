import { withPlatformTags, WEB, MOBILE } from '../../../utils/regression/tags'
import { showOrderSummary } from './pageUtils/checkout/checkoutRecipeSummary'

const PLATFORM = Cypress.env().platform.toString().toUpperCase()

describe('Promo Code', () => {
  before(() => {
    cy.clock().then((clock) => {
      clock.restore()
    })
  })

  describe('when a user checks out for the first time', () => {
    describe("and doesn't have a promo code in their basket", () => {
      const promoCode = 'DTI-SB-63'

      beforeEach(() => {
        cy.stubAll3rdParties()
        cy.checkoutLoggedOut({ withDiscount: false })
      })

      const checkPricesOnCheckout = () => {
        cy.get('[data-testing="discountAmount"]').should('not.exist')
        cy.get('[data-testing="totalPrice"]').contains('24.99')

        const inputSelector =
          PLATFORM === 'WEB'
            ? '[data-testing="checkoutDesktopSummary"] [data-testing="promoCodeInput"]'
            : '[data-testing="checkoutExpandableBoxSummary"] [data-testing="promoCodeInput"]'

        cy.get(inputSelector).type(promoCode, { force: true })
        cy.get(inputSelector).should('have.value', promoCode)

        cy.get('[data-testing="grossPrice"]').contains('24.99')
        cy.get('[data-testing="discountAmount"]').contains('12.49')
        cy.get('[data-testing="totalPrice"]').contains('12.50')
      }

      withPlatformTags(WEB).it(
        'should be able to add a promo code in the checkout flow on web',
        () => {
          cy.proceedToCheckout({ platform: 'WEB' })

          checkPricesOnCheckout()
        },
      )

      withPlatformTags(MOBILE).it(
        'should be able to add a promo code in the checkout flow on mobile',
        () => {
          cy.proceedToCheckout({ platform: 'MOBILE' })
          showOrderSummary()

          checkPricesOnCheckout()
        },
      )
    })
  })
})
