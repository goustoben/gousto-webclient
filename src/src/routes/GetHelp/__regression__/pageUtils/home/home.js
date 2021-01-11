export const clickHelp = () => {
  const platform = Cypress.env('platform')
  if (platform === 'mobile') {
    cy.get('[data-testing=burgerMenu]').click()
    cy.get('[href="/get-help/eligibility-check"] li').click()
  }

  if (platform === 'web') {
    cy.get('[data-testing="header"]').contains('Help').click()
  }
}
