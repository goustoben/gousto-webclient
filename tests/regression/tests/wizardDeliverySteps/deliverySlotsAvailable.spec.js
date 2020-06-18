import {
  getTempDate,
  selectDate,
  goToDeliveryStep
} from '../../pageUtils/wizardDeliverySteps'

describe("Given I land on the delivery step of the wizard", () =>{
  before(() => {
    cy.server()
    cy.route('/menu/v1/**', 'fixture:menu/twoWeeksDetails.json')
    cy.route('GET', 'brand/v1/theme', 'fixture:brand/brand.json')
    cy.route('GET', 'brand/v1/menu-headers', 'fixture:brand/brandHeaders.json')
    cy.route('GET', 'delivery_day/**/stock', 'fixture:stock/deliveryDayStock.json')
    cy.route('GET', 'deliveries/v1.0/**', 'fixture:deliveries/deliveryDays.json').as('getDeliveries')
    goToDeliveryStep()
  })

  describe('When all delivery slots are available', () => {
    it("Then it should store the slot I pick", () => {
      cy.wait(['@getDeliveries'])
      selectDate()
      cy.window().then(getTempDate).should('equal', '2020-05-05')
    })

    it("And it should display the CTA", () => {
      cy.get('[data-testing="signupDeliveryCTA"]')
    })
  })
})
