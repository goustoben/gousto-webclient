import { getDeliveryDays } from '../../pageUtils/wizardDeliverySteps'

describe("Given I land on the delivery step of the wizard", () =>{
  const DATE = new Date(2020, 4, 1).getTime()

  before(() => {
    cy.server()
    cy.clock(DATE, ['Date'])
    cy.route('/menu/v1/**', 'fixture:menu/twoWeeksDetails.json').as('getMenu')
    cy.route('GET', 'brand/v1/theme', 'fixture:brand/brand.json').as('getBrand')
    cy.route('GET', 'brand/v1/menu-headers', 'fixture:brand/brandHeaders.json')
    cy.route('GET', 'delivery_day/**/stock', 'fixture:stock/deliveryDayStock.json').as('getStock')
    cy.route('GET', 'deliveries/v1.0/**', 'fixture:deliveries/deliveryDaysSomeUnavailable.json').as('getDeliveriesSomeUnavailable')
    cy.visit('signup?steps=delivery')
  })

  describe('When some days and slots are unavailable', () => {
    it("Then it should display those days as unavailable", () => {
      cy.wait(['@getDeliveriesSomeUnavailable'])
      cy.window()
        .pipe(getDeliveryDays)
        .should('equal', true)
      cy.get('[data-testing="signupDeliveryDay"]')
        .click()
        .children().contains('4th May').should('be.disabled')
    })

    it("And it should only display the available slots", () => {
      cy.get('[data-testing="signupDeliveryTime"]')
        .click()
        .children().should('contain', '8am - 7pm')
        .children().should('not.contain', '6pm - 10pm')
    })
  })
})
