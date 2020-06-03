export const clickHelp = () => {
  const platform = Cypress.env('platform')
  if (platform === 'mobile') {
    cy.get('[data-testing=burgerMenu]').click()
    cy.get('[href="/get-help/eligibility-check"] > [class^=MobileMenu]').click()
  }

  if (platform === 'web') {
    cy.get('[class^=Header__container]').contains('Help').click()
  }
}