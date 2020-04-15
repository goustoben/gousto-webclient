describe("Promo Code", () => {
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

        it("should show the success promo modal", () => {
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

        it("should show the failure promo modal", () => {
          cy.visit('/?promo_code=RET-REACTFEB19EMOB')
          cy.wait(['@promoCodeDetails', '@failToApply'])
          cy.get('[data-testing="promoModal"]').contains('Something went wrong and we couldn\'t apply this promotion to your account.').should('exist')
        })
      })
    })
  })

  describe('when a user checks out for the first time', () => {
    beforeEach(() => {
      cy.server()
    })

    describe('and has a promo code in their basket', () => {
      beforeEach(() => {
        const withDiscount = true
        cy.goToCheckoutFlow(withDiscount)
        cy.get('[data-testing="grossPrice"]').should('be.visible')

      })

      it('should display the discounted box price', () => {
        cy.get('[data-testing="grossPrice"]').contains('24.99')
        cy.get('[data-testing="discountAmount"]').contains('12.49')
        cy.get('[data-testing="totalPrice"]').contains('12.50')
      })
    })

    describe("and doesn't have a promo code in their basket", () => {
      beforeEach(() => {
        cy.fixture('prices/2person2portionDiscount').as('pricesDiscount')
        cy.route('GET', /promo_code=DTI-SB-5030/, '@pricesDiscount').as('pricesDiscount')

        cy.goToCheckoutFlow()
        cy.get('[data-testing="grossPrice"]').should('be.visible')

      })

      it('should be able to add a promo code in the checkout flow', () => {
        cy.wait(500)
        cy.get('[data-testing="discountAmount"]').should('not.exist')
        cy.get('[data-testing="totalPrice"]').contains('24.99')

        cy.get('[data-testing="promoCodeInput"]').click().type('DTI-SB-5030', { delay:80 }).should("have.value", 'DTI-SB-5030')
        cy.wait('@pricesDiscount')

        cy.get('[data-testing="grossPrice"]').contains('24.99')
        cy.get('[data-testing="discountAmount"]').contains('12.49')
        cy.get('[data-testing="totalPrice"]').contains('12.50')
      })
    })
  })

})
