import { ACTIVE_PROMO_CODE } from '../../../config/promoCode'

describe('Promo Code', () => {
  // eslint-disable-next-line no-undef
  after(() => {
    cy.clock().then((clock) => {
      clock.restore()
    })
  })

  describe('when a user clicks get started cta', () => {
    before(() => {
      cy.checkoutLoggedOut({ withDiscount: false })
      cy.fixture('promoCode/promoCodeDetails').as('promoCodeDetails')
      cy.route('GET', `/promocode/${ACTIVE_PROMO_CODE}`, '@promoCodeDetails').as('promoCodeDetails')
    })

    describe('and promo code is not applied', () => {
      beforeEach(() => {
        cy.get('[data-testing="homepageHeroCTA"]').click()
        cy.wait(['@promoCodeDetails'])
      })

      it('then it should be redirected to box-size page and promo modal is hired', () => {
        cy.get('[data-testing="promoModal"]').should('be.visible')
        cy.get('[data-testing="promoModal"]').contains('Hooray!').should('exist')
      })
    })
  })
})
