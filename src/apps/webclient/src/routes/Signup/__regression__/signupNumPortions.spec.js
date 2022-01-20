const PAGE_URL = 'signup/box-size'

const getNumPortions = (win) =>
  // eslint-disable-next-line no-underscore-dangle
  win.__store__.getState().basket.get('numPortions')

describe('Given I am a logged out user', () => {
  describe('When I land on the num portions code slide of the wizard', () => {
    before(() => {
      cy.stubAll3rdParties()
      cy.server()
      cy.clearCookies()
      cy.clearLocalStorage()
      cy.route('GET', /boxPrices|prices/, 'fixture:boxPrices/priceWithPromoCode.json').as(
        'getPrices'
      )
      cy.route('GET', '/menu/v1/**', 'fixture:menu/twoWeeksDetails.json')
      cy.route(
        'GET',
        '/userbucketing/v1/user/experiments',
        'fixture:userbucketing/userbucketing.json'
      ).as('getExperiments')
      cy.route('GET', 'brand/v1/theme', 'fixture:brand/brand.json')
      cy.route('GET', 'brand/v1/menu-headers', 'fixture:brand/brandHeaders.json')
      cy.route('GET', 'delivery_day/**/stock', 'fixture:stock/deliveryDayStock.json')
    })

    describe('And I choose a 2 person box size', () => {
      before(() => {
        cy.visit(PAGE_URL)

        // wait for step to be visible
        cy.get('[data-testing="signupBoxSizeStep"]')

        cy.wait(5000)

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

        // wait for step to be visible
        cy.get('[data-testing="signupBoxSizeStep"]')

        cy.wait(5000)

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
