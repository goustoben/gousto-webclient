import { goToCheckout, clearAndFillAccountForm } from './checkoutCreateAccount'
import {
  selectAddress,
  selectDeliveryOption,
  clearAndFillFirstAndLastNames,
  clearAndFillPhoneNumber,
} from './checkoutDelivery'
import { getFormState, getStore } from './checkoutGeneralUtils'
import { getIsRecaptchaEnabled } from '../../../../../selectors/auth'

export const goToPayment = () => {
  goToCheckout()
  clearAndFillAccountForm({
    email: '123@456.com',
    password: '1234abcd',
  })
  cy.get('[data-testing="checkoutCTA"]').eq(0).click()
  clearAndFillFirstAndLastNames({
    firstname: 'John',
    lastname: 'Smith',
  })
  selectAddress()
  clearAndFillPhoneNumber(1234567890)
  selectDeliveryOption(1)
  cy.get('[data-testing="checkoutCTA"]').eq(0).click()
}

const getIframeDocument = (element) =>
  cy.get('iframe').eq(element).its('0.contentDocument').should('exist')

const getIframeBody = (element) =>
  getIframeDocument(element).its('body').should('not.be.undefined').then(cy.wrap)

export const getHouseNo = (win) => {
  if (Cypress.env().platform === 'mobile') {
    return getFormState(win).yourdetails.values.delivery.houseNo
  } else {
    return getFormState(win).delivery.values.delivery.houseNo
  }
}

export const getPaymentSyncErrors = (win) => getFormState(win).payment.syncErrors.payment

export const fillAllIframe = ({ number, expiry, cvv }) => {
  getIframeBody(0).find('#checkout-frames-card-number').click().type(number, { force: true })
  getIframeBody(1).find('#checkout-frames-expiry-date').click().type(expiry, { force: true })
  getIframeBody(2).find('#checkout-frames-cvv').click().type(cvv, { force: true })
}

export const clearAndFillNumberIframe = ({ number }) => {
  getIframeBody(0)
    .find('#checkout-frames-card-number')
    .click()
    .clear({ force: true })
    .type(number, { force: true })
}

export const cyGetIsRecaptchaEnabled = (win) => getIsRecaptchaEnabled(getStore(win).getState())
