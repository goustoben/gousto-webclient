import { withPlatformTags, WEB, MOBILE } from '../../../utils/regression/tags'

describe('Promo Code', () => {
  describe('when the url contains a promoCode parameter', () => {
    describe('and the user is logged out', () => {
      beforeEach(() => {
        cy.stubAll3rdParties()
        cy.serverOverride()
        cy.fixture('promoCode/promoCodeDetails').as('promoCodeDetails')
        cy.route('GET', /promocode\/RET-REACTFEB19EMOB/, '@promoCodeDetails').as('promoCodeDetails')
      })

      it('should display the promo modal', () => {
        cy.visit('/?promo_code=RET-REACTFEB19EMOB')
        cy.wait(['@promoCodeDetails'])
        cy.get('[data-testing="promoModal"]').should('exist')
      })
    })

    describe('and the user is logged in', () => {
      beforeEach(() => {
        cy.serverOverride()
        cy.fixture('promoCode/promoCodeDetails').as('promoCodeDetails')
        cy.route('GET', /promocode\/RET-REACTFEB19EMOB/, '@promoCodeDetails').as('promoCodeDetails')
        cy.fixture('promoCode/failToApply').as('failToApply')
        cy.fixture('promoCode/succeedInApply').as('succeedInApply')
        cy.login()
      })

      describe('and eligible for the promotion', () => {
        beforeEach(() => {
          cy.route(
            'POST',
            /user\/current\/applyPromotionCode\/RET-REACTFEB19EMOB/,
            '@succeedInApply'
          ).as('succeedInApply')
        })

        it('should show the success promo modal', () => {
          cy.visit('/?promo_code=RET-REACTFEB19EMOB')
          cy.wait(['@promoCodeDetails', '@succeedInApply'])
          cy.get('[data-testing="promoModalButton"]').contains('Claim discount').should('exist')
        })
      })

      describe('and not eligible for the promotion', () => {
        beforeEach(() => {
          cy.route(
            'POST',
            /user\/current\/applyPromotionCode\/RET-REACTFEB19EMOB/,
            '@failToApply'
          ).as('failToApply')
        })

        const checkFailedPromoCode = () => {
          cy.visit('/?promo_code=RET-REACTFEB19EMOB')
          cy.wait(['@promoCodeDetails', '@failToApply'])
          cy.get('[data-testing="promoModal"]')
            .contains('Something went wrong and your offer could not be applied.')
            .should('exist')
          cy.get('[data-testing="promoModalButton"]').contains('Close').click()
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
})
