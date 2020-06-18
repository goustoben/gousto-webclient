import { goToDeliveryStep } from '../../pageUtils/wizardDeliverySteps'

describe("Given I land on the delivery step of the wizard", () =>{
  before(() => {
    cy.server()
    cy.route('/menu/v1/**', 'fixture:menu/twoWeeksDetails.json')
    cy.route('GET', 'brand/v1/theme', 'fixture:brand/brand.json')
    cy.route('GET', 'brand/v1/menu-headers', 'fixture:brand/brandHeaders.json')
    cy.route('GET', 'delivery_day/**/stock', 'fixture:stock/deliveryDayStock.json')
    cy.route('GET', 'deliveries/v1.0/**', 'fixture:deliveries/deliveryDaysAllUnavailable.json').as('getDeliveries')
    goToDeliveryStep()
  })

  describe('When all slots are unavailable', () => {
    it("Then it should display the capacity message", () => {
      cy.wait(['@getDeliveries'])
      cy.get('[data-testing="signupDeliveryStepCapacityAlert"]')
     })

     it("And it should not display the CTA", () => {
      cy.get('[data-testing="signupDeliveryCTA"]').should('not.exist');
    })
  })
})
