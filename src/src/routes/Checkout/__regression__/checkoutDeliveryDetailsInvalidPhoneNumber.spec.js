import { goToCheckout, goToCheckoutDeliveryDetails } from './pageUtils/checkout/checkoutAboutYou'
import { setMocks } from './pageUtils/checkout/checkoutDelivery'

describe("Given I'm a logged out user", () => {
  describe('When I land on the delivery detail step of the checkout', () => {
    before(() => {
      cy.setCookie('v1_goustoStateStore_basket_postcode', '"W140EE"')

      setMocks({ validPostcode: true })
      cy.mockDate()
      goToCheckout()
      goToCheckoutDeliveryDetails()
    })

    describe('And I’ve entered a phone number with less than 10 numerical characters', () => {
      before(() => {
        cy.get('[data-testing="checkoutPhoneNumberInput"]')
          .type('77823823')
        cy.get('[data-testing="checkoutCTA"]').click()
      })

      it('Then I’m notified that I need to input a phone number with 10 characters', () => {
        cy.get('[data-testing="checkoutPhoneNumberInputError"]').should('exist')
      })
    })

    describe('And I’ve entered a phone number more than 10 characters', () => {
      before(() => {
        cy.get('[data-testing="checkoutPhoneNumberInput"]')
          .clear()
          .type('7782382334834')
        cy.get('[data-testing="checkoutCTA"]').click()
      })

      it('Then I’m notified that I need to input a phone number with 10 characters', () => {
        cy.get('[data-testing="checkoutPhoneNumberInputError"]')
          .contains('phone number must be under 10 characters')
      })
    })

    describe('And I can\'t enter a phone number with non-numerical characters', () => {
      before(() => {
        cy.get('[data-testing="checkoutPhoneNumberInput"]')
          .clear()
          .type('778b238233')
        cy.get('[data-testing="checkoutCTA"]').click()
      })

      it('Then no non-numerical characters will be registered in the input', () => {
        cy.get('[data-testing="checkoutPhoneNumberInput"]')
          .should('have.value', '778238233')
      })
    })
  })
})
