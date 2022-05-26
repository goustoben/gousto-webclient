import { setMocks, setPaymentSpecificMocks } from './pageUtils/checkout/checkoutMocks'
import {
  goToPayment,
  fillAllIframe,
  cyGetIsRecaptchaEnabled,
  getPaymentSyncErrors,
  clearAndFillNumberIframe,
} from './pageUtils/checkout/checkoutPayment'

const CARDNAME_ERROR = { cardName: 'Card name is required' }

describe("Given I'm a logged out user who has made a mistake in the first steps of checkout", () => {
  before(() => {
    cy.stubAll3rdParties()
    cy.setCookie('v1_goustoStateStore_basket_postcode', '"W140EE"')
    setMocks({ validPostcode: true })
    setPaymentSpecificMocks()
    cy.mockDate()
    goToPayment()
  })

  describe('When I land on the payment step of checkout ', () => {
    it('Then my address has persisted from the previous step', () => {
      cy.get('[data-testing="checkoutBillingAddressToggle"]').should('be.checked')
    })

    describe('And I have not filled in my card name', () => {
      describe('And I click the CTA', () => {
        it('Then I should stay on the page and receive the correct error message', () => {
          cy.window()
            .then(cyGetIsRecaptchaEnabled)
            .then((isRecaptchaEnabled) => {
              // Wait until recaptcha is loaded because submitting the form
              // relies on recaptcha.execute().  In normal operation, recaptcha
              // (a third-party script) loads faster than the user is able to
              // press the Submit button; but this test presses more quickly, so
              // the wait is needed.
              if (isRecaptchaEnabled) {
                cy.get('.grecaptcha-badge')
              }

              cy.get('[data-testing="checkoutCTA"]').click()

              cy.url().should('include', 'check-out/payment')

              cy.window().then(getPaymentSyncErrors).should('deep.equal', CARDNAME_ERROR)

              cy.get('[data-testing="checkoutCardNameInputError"] p', { timeout: 12000 }).should(
                'be.visible',
              )
            })
        })
      })
    })

    describe('And I have filled in my name correctly', () => {
      beforeEach(() => {
        cy.get('[data-testing="checkoutCardNameInput"]').click().clear().type('Test')
      })

      describe('And I have not filled in my card details', () => {
        describe('And I click the CTA', () => {
          beforeEach(() => {
            cy.get('[data-testing="checkoutCTA"]').click()
          })

          it('Then I will see the right error', () => {
            cy.url().should('include', 'check-out/payment')
            cy.get('[data-testing="valid-card-details-not-provided"]').should('be.visible')
          })
        })
      })

      describe('And I have made a mistake in my card details', () => {
        beforeEach(() => {
          fillAllIframe({
            number: '4242',
            expiry: '0550',
            cvv: '100',
          })
        })

        describe('And I click the CTA', () => {
          beforeEach(() => {
            cy.get('[data-testing="checkoutCTA"]').click()
          })

          it('Then I will see the right error', () => {
            cy.url().should('include', 'check-out/payment')
            cy.get('[data-testing="checkoutFrameCardNoError"]').should('be.visible')
          })
        })
      })

      describe('And I have filled in my card details correctly', () => {
        beforeEach(() => {
          clearAndFillNumberIframe({ number: '4485 0403 7153 6584' })
          cy.get('[data-testing="checkoutCTA"]').click()
        })

        it('Then no input errors are shown', () => {
          cy.get('[data-testing="checkoutFrameCardNoError"]').should('not.be.visible')
          cy.get('[data-testing="checkoutFrameExpiryError"]').should('not.be.visible')
          cy.get('[data-testing="checkoutFrameCVVError"]').should('not.be.visible')
        })
      })
    })
  })
})
