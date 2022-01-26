import {
  getAllowEmail,
  getAccountSyncErrors,
  goToCheckout,
  clearAndFillAccountForm,
} from './pageUtils/checkout/checkoutCreateAccount'
import { setMocks } from './pageUtils/checkout/checkoutMocks'

const EMAIL_ERROR = { email: 'Please provide a valid email address' }

describe("Given I'm a logged out user", () => {
  describe('When I land on the first step of checkout', () => {
    before(() => {
      setMocks({ validPostcode: true })
      cy.mockDate()
      goToCheckout()
    })

    beforeEach(() => {
      cy.intercept('POST', /validate/, { fixture: 'checkout/validate/validate.json' })
    })

    describe('And I have not filled in my email correctly', () => {
      beforeEach(() => {
        clearAndFillAccountForm({
          email: '123456.com',
          password: 'ValidPassword1!',
        })
      })

      it('Then the CTA should be disabled and I should not be able to proceed to the next page', () => {
        cy.get('[data-testing="checkoutCTA"]').eq(0).should('be.disabled')
        cy.window().then(getAccountSyncErrors).should('deep.equal', EMAIL_ERROR)
        cy.url().should('include', 'check-out/account')
      })
    })

    describe('And I have not filled in my password correctly', () => {
      beforeEach(() => {
        cy.intercept('POST', /validate/, { fixture: 'checkout/validate/validateFailed.json' })
        clearAndFillAccountForm({
          email: '123@456.com',
          password: 'Valid',
        })
      })

      it('Then the CTA should be disabled and I should not be able to proceed to the next page', () => {
        cy.get('[data-testing="checkoutCTA"]').eq(0).should('be.disabled')
        cy.url().should('include', 'check-out/account')
      })
    })

    describe('And I have not interacted with the marketing email checkbox', () => {
      it('Then the checkbox should be ticked and stored as true in the Redux store', () => {
        cy.get('[data-testing="checkoutAllowEmailCheckbox"]').should('be.checked')
        cy.window().then(getAllowEmail).should('equal', true)
      })
    })

    describe('And I have clicked the marketing email checkbox', () => {
      it('Then the checkbox should be unticked and stored as true in the Redux store', () => {
        cy.get('[data-testing="checkoutAllowEmailCheckbox"]')
          .click({ force: true })
          .should('not.be.checked')
        cy.window().then(getAllowEmail).should('equal', false)
      })
    })

    describe('And I have filled in all fields correctly', () => {
      beforeEach(() => {
        clearAndFillAccountForm({
          email: '123@456.com',
          password: 'ValidPassword1!',
        })
      })

      it('Then the CTA should be enabled', () => {
        cy.get('[data-testing="checkoutCTA"]').eq(0).click()
        cy.url().should('include', 'check-out/delivery')
      })
    })
  })
})
