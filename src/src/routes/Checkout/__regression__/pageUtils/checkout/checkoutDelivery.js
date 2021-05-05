const PLATFORM = Cypress.env().platform.toString().toUpperCase()

export const clearAndFillFirstAndLastNames = ({ firstname, lastname }) => {
  cy.get('[data-testing="checkoutFirstNameInput"]').click().clear().type(firstname)
  cy.get('[data-testing="checkoutLastNameInput"]').click().clear().type(lastname)
}

export const clearAndFillPhoneNumber = (phoneNumber) => {
  cy.get('[data-testing="checkoutPhoneNumberInput"]').click().clear().type(phoneNumber)
}

export const selectAddress = () => {
  if (PLATFORM === 'WEB') {
    cy.get('[data-testing="checkoutAddressDropdown"]')
      .find('.Select')
      .click()
      .get('.Select-menu-outer .Select-menu .Select-option')
      .eq(1)
      .click()
  } else {
    cy.get('select[data-testing="houseNo"]').select('"25953315"')
  }
}

export const selectDeliveryOption = (option) => {
  if (PLATFORM === 'WEB') {
    cy.get('[data-testing="checkoutDeliveryDetailsInstruction"]')
      .find('.Select')
      .click()
      .get('.Select-menu-outer .Select-menu .Select-option')
      .eq(option)
      .click()
  } else {
    const optionToSelect = ['Please select an option', 'Back Porch', '', '', '', '', '', 'Other']
    cy.get('[data-testing="checkoutDeliveryDetailsInstruction"]')
      .eq(0)
      .select(optionToSelect[option])
  }
}
