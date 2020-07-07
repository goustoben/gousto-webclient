const PLATFORM = Cypress.env().platform.toString().toUpperCase()
const getFormState = (win) => (
  win.__store__.getState().form
)

const getCheckoutAddressDropdown = () => (
  cy.get('[data-testing="checkoutAddressDropdown"]')
)

export const getAllowEmail = (win) => {
  if (PLATFORM === 'WEB') {
    return getFormState(win).aboutyou.values.aboutyou.allowEmail
  } else {
    return getFormState(win).yourdetails.values.aboutyou.allowEmail
  }
}

export const getAboutYouSyncErrors = (win) => (
  getFormState(win).yourdetails.syncErrors.aboutyou
)

export const getSyncErrors = (win) => (
  getFormState(win).yourdetails.syncErrors
)

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

export const clearAndFillCheckoutForm = ({ firstname, lastname, email, password }) => {
  cy.get('[data-testing="checkoutFirstNameInput"]').click().clear().type(firstname)
  cy.get('[data-testing="checkoutLastNameInput"]').click().clear().type(lastname)
  cy.get('[data-testing="checkoutEmailInput"]').click().clear().type(email)
  cy.get('[data-testing="checkoutPasswordInput"]').click().clear().type(password)
}

export const goToCheckoutDeliveryDetails = () => {
  clearAndFillCheckoutForm({
    firstname: 'Joe',
    lastname: 'Tester',
    email: 'test@email.com',
    password: '1234abcd'
  })

  if (Cypress.env().platform === 'web') {
    cy.get('[data-testing="checkoutCTA"]').click()

    cy.pipe(getCheckoutAddressDropdown)
      .click()
      .get('.Select-menu-outer .Select-menu .Select-option')
      .eq(1)
      .click()
  } else {
    cy.get('select[data-testing="houseNo"]').select('"25953315"')
  }

  cy.get('[data-testing="checkoutSelectAddressCTA"]').click()
}
