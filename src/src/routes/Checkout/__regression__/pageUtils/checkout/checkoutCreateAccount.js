import { getFormState } from './checkoutGeneralUtils'

export const getAccountSyncErrors = (win) => getFormState(win).account.syncErrors.account

export const getAllowEmail = (win) => getFormState(win).account.values.account.allowEmail

export const goToCheckout = () => {
  cy.mockDate()
  cy.visit('/check-out/account')
}

export const clearAndFillAccountForm = ({ email, password }) => {
  cy.get('[data-testing="checkoutEmailInput"]').click().clear().type(email)
  cy.get('[data-testing="checkoutPasswordInput"]').click().clear().type(password)
}
