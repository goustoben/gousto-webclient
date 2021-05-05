import { goToCheckout, clearAndFillAccountForm } from './pageUtils/checkout/checkoutCreateAccount'
import {
  clearAndFillFirstAndLastNames,
  selectAddress,
  clearAndFillPhoneNumber,
  selectDeliveryOption,
} from './pageUtils/checkout/checkoutDelivery'
import { setMocks } from './pageUtils/checkout/checkoutMocks'

describe('Given I’m a gousto logged-out website visitor', () => {
  describe('When I land on the delivery step of the checkout', () => {
    before(() => {
      cy.setCookie('v1_goustoStateStore_basket_postcode', '"W140EE"')
      setMocks({ validPostcode: true })
      cy.mockDate()
      goToCheckout()

      clearAndFillAccountForm({
        email: 'test@email.com',
        password: '1234abcd',
      })

      cy.get('[data-testing="checkoutCTA"]').eq(0).click()
      cy.url().should('include', 'check-out/delivery')
    })

    beforeEach(() => {
      cy.mockDate()
      cy.intercept('GET', 'delivery_day/**/stock', { fixture: 'stock/deliveryDayStock.json' })
    })

    describe('And I have not filled in my first and last name correctly', () => {
      beforeEach(() => {
        clearAndFillFirstAndLastNames({
          firstname: 'J8hn',
          lastname: 'Sm!th',
        })
      })

      it('Then the right errors should be displayed', () => {
        cy.get('[data-testing="checkoutFirstNameInputError"]').should('be.visible')
        cy.get('[data-testing="checkoutLastNameInputError"]').should('be.visible')
      })
    })

    describe('And I have filled in my first and last name correctly', () => {
      beforeEach(() => {
        clearAndFillFirstAndLastNames({
          firstname: 'John',
          lastname: 'Smith',
        })
      })

      it('Then the right errors should be displayed', () => {
        cy.get('[data-testing="checkoutFirstNameInputError"]').should('not.be.visible')
        cy.get('[data-testing="checkoutLastNameInputError"]').should('not.be.visible')
      })
    })

    describe('And postcode is prefilled correctly from wizard', () => {
      beforeEach(() => {
        cy.get('[data-testing="checkoutPostcode"]').should('have.value', 'W140EE')
      })

      it('Then search CTA is disabled and errors are not presented', () => {
        cy.get('[data-testing="checkoutPostcodeError"]').should('not.be.visible')
        cy.get('[data-testing="checkoutFindAddressButton"]').should('be.disabled')
      })
    })

    describe('And I select address from the dropdown', () => {
      beforeEach(() => {
        selectAddress()
      })

      it('Then delivery card with address should be visible', () => {
        cy.get('[data-testing="deliveryCardAddress"]').should('be.visible')
      })
    })

    describe('And I have not filled in phone number correctly', () => {
      beforeEach(() => {
        clearAndFillPhoneNumber(111111)
      })

      it('Then the right error should be displayed', () => {
        cy.get('[data-testing="checkoutPhoneNumberInputError"]').should('be.visible')
      })
    })

    describe('And I have filled in phone number correctly', () => {
      beforeEach(() => {
        clearAndFillPhoneNumber(1234567890)
      })

      it('Then the right error should be displayed', () => {
        cy.get('[data-testing="checkoutPhoneNumberInputError"]').should('not.be.visible')
      })
    })

    describe('And I have not selected delivery option', () => {
      beforeEach(() => {
        selectDeliveryOption(0)
      })

      it('Then the right error should be displayed', () => {
        cy.get('[data-testing="checkoutDeliveryDetailsInstructionError"]').should('be.visible')
      })
    })

    describe('And I have selected delivery option', () => {
      beforeEach(() => {
        selectDeliveryOption(1)
      })

      it('Then the right error should be displayed', () => {
        cy.get('[data-testing="checkoutDeliveryDetailsInstructionError"]').should('not.be.visible')
      })
    })

    describe('And I have selected "other" option', () => {
      before(() => {
        selectDeliveryOption(7)
      })

      it('Then the right error should be displayed', () => {
        cy.get('[data-testing="checkoutDeliveryDetailsExtraInfo"]').should('be.visible')
      })

      describe('When I have not filled in delivery details extra field correctly', () => {
        beforeEach(() => {
          cy.get('[data-testing="checkoutDeliveryDetailsExtraInfo"]').clear().type('10')
        })

        it('Then proper error message should be displayed', () => {
          cy.get('[data-testing="checkoutDeliveryDetailsExtraInfoError"]').should('be.visible')
        })
      })

      describe('When I have filled in delivery details extra field correctly', () => {
        beforeEach(() => {
          cy.get('[data-testing="checkoutDeliveryDetailsExtraInfo"]').clear().type('leave box here')
        })

        it('Then proper error message should be displayed', () => {
          cy.get('[data-testing="checkoutDeliveryDetailsExtraInfoError"]').should('not.be.visible')
        })
      })
    })

    describe('When all delivery optioned are filled in correctly', () => {
      describe('And Continue to payment CTA is enabled and clicked', () => {
        beforeEach(() => {
          cy.get('[data-testing="checkoutCTA"]').eq(0).click()
        })

        it('Then user should be redirected to payment step', () => {
          cy.url().should('contain', 'check-out/payment')
        })
      })
    })
  })
})
