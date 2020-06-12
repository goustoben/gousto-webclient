const PAGE_URL = 'signup/box-size'

const getNumPortions = (win) => {
  return win.__store__.getState().basket.get('numPortions')
}

describe('Given I am a logged out user', () => {
  describe('When I land on the num portions code slide of the wizard', () => {
    before(() => {
      cy.server()
      cy.route('/menu/v1/**', 'fixture:menu/twoWeeksDetails.json')
      cy.route('GET', 'brand/v1/theme', 'fixture:brand/brand.json')
      cy.route('GET', 'brand/v1/menu-headers', 'fixture:brand/brandHeaders.json')
      cy.route('GET', 'delivery_day/**/stock', 'fixture:stock/deliveryDayStock.json')
    })

    describe('And I choose a 2 person box size', () => {
      before(() => {
        cy.visit(PAGE_URL)
        cy.get('[data-testing="signupBoxSize2Portions"]').click()
      })

      it('Then the num portions is 2 in the redux store', () => {
        cy.window().then(getNumPortions).should('equal', 2)
      })

      it('And the next page is visible', () => {
        cy.url().should('include', 'signup/postcode')
      })
    })

    describe('And I choose a 4 person box size', () => {
      before(() => {
        cy.visit(PAGE_URL)
        cy.get('[data-testing="signupBoxSize4Portions"]').click()
      })

      it('Then the num portions is 4 in the redux store', () => {
        cy.window().then(getNumPortions).should('equal', 4)
      })

      it('And the next page is visible', () => {
        cy.url().should('include', 'signup/postcode')
      })
    })
  })
})