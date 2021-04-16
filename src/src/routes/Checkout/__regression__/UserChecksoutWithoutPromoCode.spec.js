import { withPlatformTags, WEB, MOBILE } from '../../../utils/regression/tags'

describe('Promo Code', () => {
  before(() => {
    cy.clock().then((clock) => {
      clock.restore()
    })
  })

  describe('when a user checks out for the first time', () => {
    describe("and doesn't have a promo code in their basket", () => {
      const promoCode = 'DTI-SB-5030'

      beforeEach(() => {
        cy.checkoutLoggedOut({ withDiscount: false })
      })

      const checkPricesOnCheckout = () => {
        cy.get('[data-testing="discountAmount"]').should('not.exist')
        cy.get('[data-testing="totalPrice"]').contains('24.99')

        cy.get('[data-testing="promoCodeInput"]').type(promoCode, { force: true })
        cy.get('[data-testing="promoCodeInput"]').should('have.value', promoCode)

        cy.get('[data-testing="grossPrice"]').contains('24.99')
        cy.get('[data-testing="discountAmount"]').contains('12.49')
        cy.get('[data-testing="totalPrice"]').contains('12.50')
      }

      withPlatformTags(WEB).it(
        'should be able to add a promo code in the checkout flow on web',
        () => {
          cy.proceedToCheckout({ platform: 'WEB' })

          checkPricesOnCheckout()
        }
      )

      withPlatformTags(MOBILE).it(
        'should be able to add a promo code in the checkout flow on mobile',
        () => {
          cy.proceedToCheckout({ platform: 'MOBILE' })

          checkPricesOnCheckout()
        }
      )
    })
  })
})
