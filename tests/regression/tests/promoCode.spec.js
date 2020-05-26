import { withPlatformTags, WEB, MOBILE } from '../utils/tags'

describe("Promo Code", () => {
  afterEach(() => {
    cy.clock().then((clock) => {
      clock.restore()
    })
  })
  describe('when the url contains a promoCode parameter', () => {
    describe('and the user is logged out ', () => {
      beforeEach(() => {
        cy.server()
        cy.fixture('promoCode/promoCodeDetails').as('promoCodeDetails')
        cy.route('GET', /promocode\/RET-REACTFEB19EMOB/, '@promoCodeDetails').as('promoCodeDetails')
      })

      it("should display the promo modal ", () => {
        cy.visit('/?promo_code=RET-REACTFEB19EMOB')
        cy.wait(['@promoCodeDetails'])
        cy.get('[data-testing="promoModal"]').contains('You\'ve got 20% off all boxes for a month.').should('exist')
      })
    })

    describe('and the user is logged in', () => {
      beforeEach(() => {
        cy.server()
        cy.fixture('promoCode/promoCodeDetails').as('promoCodeDetails')
        cy.route('GET', /promocode\/RET-REACTFEB19EMOB/, '@promoCodeDetails').as('promoCodeDetails')
        cy.fixture('promoCode/failToApply').as('failToApply')
        cy.fixture('promoCode/succeedInApply').as('succeedInApply')
        cy.login()
      })

      describe('and eligible for the promotion', () => {
        beforeEach(() => {
          cy.route('POST', /user\/current\/applyPromotionCode\/RET-REACTFEB19EMOB/, '@succeedInApply').as('succeedInApply')
        })

        it('should show the success promo modal', () => {
          cy.visit('/?promo_code=RET-REACTFEB19EMOB')
          cy.wait(['@promoCodeDetails', '@succeedInApply'])
          cy.get('[data-testing="promoModal"]').contains('Hooray!').should('exist')
          cy.get('[data-testing="promoModal"]').contains('You\'ve got 20% off all boxes for a month.').should('exist')
        })
      })

      describe('and not eligible for the promotion', () => {
        beforeEach(() => {
          cy.route('POST', /user\/current\/applyPromotionCode\/RET-REACTFEB19EMOB/, '@failToApply').as('failToApply')
        })

        const checkFailedPromoCode = () => {
          cy.visit('/?promo_code=RET-REACTFEB19EMOB')
          cy.wait(['@promoCodeDetails', '@failToApply'])
          cy.get('[data-testing="promoModal"]').contains('Something went wrong and we couldn\'t apply this promotion to your account.').should('exist')
          cy.get('[data-testing="promoModalButton"]').click()
        }

        withPlatformTags(WEB).it('should show the failure promo modal on web', () => {
          checkFailedPromoCode()
          cy.get('[data-testing="logoutButton"]').click()
        })

        withPlatformTags(MOBILE).it('should show the failure promo modal on mobile', () => {
          checkFailedPromoCode()
          cy.get('[data-testing="burgerMenu"]').click()
          cy.get('[data-testing="burgerMenuLogout"]').parent().click()
        })
      })
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

      withPlatformTags(WEB).it('should be able to add a promo code in the checkout flow on web', () => {
        cy.proceedToCheckout({ platform: 'WEB' })

        checkPricesOnCheckout()
      })

      withPlatformTags(MOBILE).it('should be able to add a promo code in the checkout flow on mobile', () => {
        cy.proceedToCheckout({ platform: 'MOBILE' })

        checkPricesOnCheckout()
      })
    })
  })
})
