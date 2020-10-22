import {
  goToCheckout,
  clearAndFillCheckoutForm
} from './checkoutAboutYou'
import { getFormState, getStore } from './checkoutGeneralUtils'
import { getIsRecaptchaEnabled } from '../../../../../selectors/auth'

const selectAddress = () => {
  if (Cypress.env().platform === 'mobile') {
    cy.contains('Find Address').click()
    cy.get('[data-testing="checkoutAddressDropdown"]')
      .click()
      .get('select')
      .eq(1)
      .select('FLAT 10, MORRIS HOUSE, SWAINSON ROAD')
    cy.get('[data-testing="checkoutSelectAddressCTA"]').click()
  } else {
    cy.get('[data-testing="checkoutCTA"]').click()
    cy.get('[data-testing="checkoutFindAddressButton"]').click()
    cy.get('[data-testing="checkoutAddressDropdown"]')
      .find('.Select')
      .click()
      .get('.Select-option')
      .eq(1)
      .click()
    cy.get('[data-testing="checkoutSelectAddressCTA"]').click()
  }
}

const phoneNoStep = () => {
  cy.get('[data-testing="checkoutPhoneNumberInput"]').click().type('7700900077 ')
  cy.get('[data-testing="checkoutCTA"]').click()
}

export const goToPayment = () => {
  goToCheckout()
  clearAndFillCheckoutForm({
    firstname: 'John',
    lastname: 'Smith',
    email: '123@456.com',
    password: '1234abcd'
  })
  selectAddress()
  phoneNoStep()
}

const getIframeDocument = (element) => (
  cy
    .get('iframe')
    .eq(element)
    .its('0.contentDocument').should('exist')
)

const getIframeBody = (element) => (
  getIframeDocument(element)
    .its('body').should('not.be.undefined')
    .then(cy.wrap)
)

export const getHouseNo = (win) => {
  if (Cypress.env().platform === 'mobile') {
    return getFormState(win).yourdetails.values.delivery.houseNo
  } else {
    return getFormState(win).delivery.values.delivery.houseNo
  }
}

export const getPaymentSyncErrors = (win) => (
  getFormState(win).payment.syncErrors.payment
)

export const fillAllIframe = ({number, expiry, cvv}) => {
  getIframeBody(0).find('#checkout-frames-card-number').click().type(number, {force: true})
  getIframeBody(1).find('#checkout-frames-expiry-date').click().type(expiry, {force: true})
  getIframeBody(2).find('#checkout-frames-cvv').click().type(cvv, {force: true})
}

export const clearAndFillNumberIframe = ({number}) => {
  getIframeBody(0).find('#checkout-frames-card-number').click().clear({force: true})
    .type(number, {force: true})
}

export const cyGetIsRecaptchaEnabled = (win) => getIsRecaptchaEnabled(getStore(win).getState())
