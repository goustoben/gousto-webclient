import { withPlatformTags, MOBILE, WEB } from '../utils/tags'

describe("Given I land on the delivery step of the wizard", () =>{
  const DATE = new Date(2020, 4, 1).getTime()
  const getTempDate = (win) => {
    return win.__store__.getState().temp.get('date')
  }
  beforeEach(() => {
    cy.server()
    cy.route('/menu/v1/**', 'fixture:menu/twoWeeksDetails.json').as('getMenu')
    cy.route('GET', 'brand/v1/theme', 'fixture:brand/brand.json').as('getBrand')
    cy.route('GET', 'brand/v1/menu-headers', 'fixture:brand/brandHeaders.json')
    cy.route('GET', 'delivery_day/**/stock', 'fixture:stock/deliveryDayStock.json').as('getStock')
  })

  describe('When all delivery slots are available', () => {
    beforeEach(() => {
      cy.route('GET', 'deliveries/v1.0/**', 'fixture:deliveries/deliveryDays.json').as('getDeliveriesAvailable')
      cy.visit('/signup/?steps=delivery')
      cy.clock(DATE, ['Date'])
    })

    withPlatformTags(WEB).it("Then it should store the slot I pick", () => {
      cy.wait(['@getDeliveriesAvailable'])
      cy.get('[data-testing="signupDeliveryDay"]')
        .click()
        .get('.Select-option')
        .eq(1)
        .click()
      cy.window().then(getTempDate).should('equal', '2020-05-05')
    })

    withPlatformTags(MOBILE).it("Then it should store the slot I pick", () => {
      cy.wait(['@getDeliveriesAvailable'])
      cy.get('[data-testing="signupDeliveryDay"]')
        .click()
        .get('select')
        .eq(0)
        .select("\"2020-05-05\"")
      cy.window().then(getTempDate).should('equal', '2020-05-05')
    })

    it("And it should display the CTA", () => {
      cy.wait(['@getDeliveriesAvailable'])
      cy.get('[data-testing="signupDeliveryCTA"]')
    })
  })

  describe('When all slots are unavailable', () => {
    beforeEach(() => {
      cy.route('GET', 'deliveries/v1.0/**', 'fixture:deliveries/deliveryDaysAllUnavailable.json').as('getDeliveriesAllUnavailable')
      cy.visit('signup/?steps=delivery')
      cy.clock(DATE, ['Date'])
    })

    it("Then it should display the capacity message", () => {
      cy.wait(['@getDeliveriesAllUnavailable'])
      cy.get('[data-testing="signupDeliveryStepCapacityAlert"]')
     })

     it("And it should not display the CTA", () => {
      cy.wait(['@getDeliveriesAllUnavailable'])
      cy.get('[data-testing="signupDeliveryCTA"]').should('not.exist');
    })
  })

  describe('When some days and slots are unavailable', () => {
    beforeEach(() => {
      cy.route('GET', 'deliveries/v1.0/**', 'fixture:deliveries/deliveryDaysSomeUnavailable.json').as('getDeliveriesSomeUnavailable')
      cy.visit('signup/?steps=delivery')
      cy.clock(DATE, ['Date'])
      })

    it("Then it should display those days as unavailable", () => {
      cy.wait(['@getDeliveriesSomeUnavailable'])
      cy.get('[data-testing="signupDeliveryDay"]')
        .click()
        .children().contains('4th May').should('be.disabled')
    })

    it("And it should only display the available slots", () => {
      cy.wait(['@getDeliveriesSomeUnavailable'])
      cy.get('[data-testing="signupDeliveryTime"]')
        .click()
        .children().should('contain', '8am - 7pm')
        .children().should('not.contain', '6pm - 10pm')
    })
  })
})
