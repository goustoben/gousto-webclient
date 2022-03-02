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
    cy.get('select[data-testing="houseNo"] > option')
      .eq(1)
      .then((element) => cy.get('select[data-testing="houseNo"]').select(element.val()))
  } else {
    cy.get('select[data-testing="houseNo"]').select('"25953315"')
  }
}

export const selectDeliveryOption = (option) => {
  if (PLATFORM === 'WEB') {
    cy.get('select[data-testing="checkoutDeliveryDetailsInstruction"] > option')
      .eq(option)
      .then((element) =>
        cy.get('select[data-testing="checkoutDeliveryDetailsInstruction"]').select(element.val())
      )
  } else {
    const optionToSelect = ['Please select an option', 'Back Porch', '', '', '', '', '', 'Other']
    cy.get('[data-testing="checkoutDeliveryDetailsInstruction"]')
      .eq(0)
      .select(optionToSelect[option])
  }
}
