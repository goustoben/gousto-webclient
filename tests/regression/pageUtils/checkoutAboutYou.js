const PLATFORM = Cypress.env().platform.toString().toUpperCase()
const getFormState = (win) => {
  return win.__store__.getState().form
}

export const getAllowEmail = (win) => {
  if (PLATFORM === 'WEB'){
    return getFormState(win).aboutyou.values.aboutyou.allowEmail
  } else {
    return getFormState(win).yourdetails.values.aboutyou.allowEmail
  }
}

export const getAboutYouSyncErrors = (win) => {
  return getFormState(win).yourdetails.syncErrors.aboutyou
}

export const getSyncErrors = (win) => {
  return getFormState(win).yourdetails.syncErrors
}

export const goToCheckout = () => {
  if (Cypress.env().platform === 'mobile') {
    cy.visit('/check-out/boxdetails')
    cy.wait(['@getDeliveries', '@previewOrder'])
    cy.get('[data-testing="checkoutCTA"]')
      .eq(0)
      .click()
  } else {
    cy.visit('/check-out/aboutyou')
    cy.wait(['@getDeliveries'])
  }
}

export const clearAndFillCheckoutForm = ({ firstname: firstname, lastname: lastname, email: email, password: password }) => {
  cy.get('[data-testing="checkoutFirstNameInput"]').click().clear().type(firstname)
  cy.get('[data-testing="checkoutLastNameInput"]').click().clear().type(lastname)
  cy.get('[data-testing="checkoutEmailInput"]').click().clear().type(email)
  cy.get('[data-testing="checkoutPasswordInput"]').click().clear().type(password)
}
