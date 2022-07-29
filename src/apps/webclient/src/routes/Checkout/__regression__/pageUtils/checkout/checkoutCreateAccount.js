import { getFormState } from './checkoutGeneralUtils'

export const getAccountSyncErrors = (win) => getFormState(win).account.syncErrors.account

export const getAllowEmail = (win) => getFormState(win).account.values.account.allowEmail

export const goToCheckout = () => {
  cy.mockDate()
  cy.intercept('/order/preview*').as('preview')
  cy.intercept('/menu/v1/menus*').as('menus')
  cy.visit('/check-out/account')
  cy.wait(['@preview', '@menus'], { timeout: 15000 })
}

export const clearAndFillAccountForm = ({ email, password }) => {
  cy.get('[data-testing="checkoutEmailInput"]').click().clear().type(email)
  cy.get('[data-testing="checkoutPasswordInput"]').click().clear().type(password)
}
