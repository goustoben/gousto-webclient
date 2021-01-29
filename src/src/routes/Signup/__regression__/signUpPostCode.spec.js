const PAGE_URL = '/signup/?steps=postcode'
const POSTCODE_6_CHARS = 'W140EE'
const POSTCODE_5_CHARS = 'W140E'
const POSTCODE_8_CHARS = 'W140EE14'

describe('Given I land on postcode slide of the wizard', () => {
  const getBoxSummaryError = (win) => (
    // eslint-disable-next-line no-underscore-dangle
    win.__store__.getState().error.get('BOXSUMMARY_DELIVERY_DAYS_RECEIVE')
  )

  before(() => {
    cy.server()
    cy.route('GET', '/menu/v1/**', 'fixture:menu/twoWeeksDetails.json')
    cy.route('GET', '/userbucketing/v1/user/experiments', 'fixture:userbucketing/userbucketing.json').as('getExperiments')
    cy.route('GET', 'brand/v1/theme', 'fixture:brand/brand.json')
    cy.route('GET', 'brand/v1/menu-headers', 'fixture:brand/brandHeaders.json')
    cy.route('GET', 'delivery_day/**/stock', 'fixture:stock/deliveryDayStock.json')
    cy.route('GET', /^(?=.*\bdeliveries\/v1.0\/days\b)(?!.*\bpostcode\b).*$/, 'fixture:deliveries/deliveryDays.json')
    cy.visit(PAGE_URL)
    cy.mockDate()
  })

  describe('And I entered a valid postcode', () => {
    before(() => {
      cy.get('[data-testing="signupPostcodeInput"]').type(POSTCODE_6_CHARS)
    })

    it('Then the CTA is enabled', () => {
      cy.get('[data-testing="signupPostcodeInput"]').should('not.have.class', 'disabled')
    })

    it('And the postcode is stored in the basket object of the redux store', () => {
      const getTempPostCode = (win) => (
        // eslint-disable-next-line no-underscore-dangle
        win.__store__.getState().temp.get('postcode')
      )

      cy.window().then(getTempPostCode).should('equal', POSTCODE_6_CHARS)
    })
  })

  describe('And I entered a postcode with less than 6 characters ', () => {
    before(() => {
      cy.server()
      cy.route('GET', /^(?=.*\bdeliveries\/v1.0\/days\b)(?=.*\bpostcode\b).*$/, 'fixture:deliveries/postcode/invalid.json')
      cy.get('[data-testing="signupPostcodeInput"]')
        .clear()
        .type(POSTCODE_5_CHARS)
    })

    it('Then I’m not able to proceed to the next wizard step', () => {
      cy.get('[data-testing="signupPostcodeCTA"]').click()

      cy.window().pipe(getBoxSummaryError).should('equal', 'do-not-deliver')
      cy.url().should('not.include', 'signup/delivery-options')
    })
  })

  describe('And I entered a postcode with more than 6 characters ', () => {
    before(() => {
      cy.server()
      cy.route('GET', /^(?=.*\bdeliveries\/v1.0\/days\b)(?=.*\bpostcode\b).*$/, 'fixture:deliveries/postcode/invalid.json')
      cy.get('[data-testing="signupPostcodeInput"]')
        .clear()
        .type(POSTCODE_8_CHARS)
    })

    it('Then I’m not able to proceed to the next wizard step', () => {
      cy.get('[data-testing="signupPostcodeCTA"]').click()

      cy.window().pipe(getBoxSummaryError).should('equal', 'do-not-deliver')
      cy.url().should('include', 'steps=postcode')
    })
  })
})
