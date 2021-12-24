describe('Promo Code', () => {
  after(() => {
    cy.clock().then((clock) => {
      clock.restore()
    })
  })

  describe('when a user clicks get started cta', () => {
    before(() => {
      cy.stubAll3rdParties()
      cy.checkoutLoggedOut({ withDiscount: false })
      cy.fixture('promoCode/promoCodeDetails').as('promoCodeDetails')
      cy.route('GET', '/promocode/**', '@promoCodeDetails').as('promoCodeDetails')
      cy.mockDate()
    })

    describe('and promo code is not applied', () => {
      beforeEach(() => {
        cy.get('[data-testing="homepageHeroCTA"]').click()
        cy.wait(['@promoCodeDetails'])
      })

      it('then it should be redirected to box-size page and promo modal is shown', () => {
        cy.get('[data-testing="promoModal"]').should('be.visible')
      })
    })
  })
})
