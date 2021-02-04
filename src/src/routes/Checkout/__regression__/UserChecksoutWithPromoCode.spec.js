import { withPlatformTags, WEB, MOBILE } from '../../../utils/regression/tags'

describe('Promo Code', () => {
  before(() => {
    cy.clock().then((clock) => {
      clock.restore()
    })
  })

  describe('when a user checks out for the first time', () => {
    describe('and has a promo code in their basket', () => {
      beforeEach(() => {
        cy.checkoutLoggedOut({ withDiscount: true })
      })

      const checkPricesInSummaryBox = () => {
        cy.get('[data-testing="grossPrice"]').contains('24.99')
        cy.get('[data-testing="discountAmount"]').contains('12.49')
        cy.get('[data-testing="totalPrice"]').contains('12.50')
      }

      withPlatformTags(WEB).it('should display the discounted box price on web', () => {
        cy.proceedToCheckout({ platform: 'WEB' })

        checkPricesInSummaryBox()
      })

      withPlatformTags(MOBILE).it('should display the discounted box price on mobile', () => {
        cy.proceedToCheckout({ platform: 'MOBILE' })

        checkPricesInSummaryBox()
      })
    })
  })
})
