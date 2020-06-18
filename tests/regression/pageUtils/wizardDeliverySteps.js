export const getTempDate = (win) => {
  return win.__store__.getState().temp.get('date')
}

export const selectDate = () => {
  if(Cypress.env('platform') === 'mobile'){
    cy.get('[data-testing="signupDeliveryDay"]')
      .click()
      .get('select')
      .eq(0)
      .select("\"2020-05-05\"")
  } else {
    cy.get('[data-testing="signupDeliveryDay"]')
      .click()
      .get('.Select-option')
      .eq(1)
      .click()
  }
}

export const goToDeliveryStep = () => {
  cy.visit('/signup/box-size')
  cy.mockDate()
  cy.get('[data-testing="signupBoxSize2Portions"]').click()
  cy.get('[data-testing="signupPostcodeInput"]').type('W140EE')
  cy.wait(['@getDeliveries'])
  cy.get('[data-testing="signupPostcodeCTADesktop"]').click()
}
