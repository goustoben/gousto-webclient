export const clickHelp = () => {
  const platform = Cypress.env('platform')
  if (platform === 'mobile') {
    cy.get('[data-testing=burgerMenu]').click()
    cy.get('[href="/get-help/eligibility-check"] li').click()
  }

  if (platform === 'web') {
    cy.get('[data-testing="header"]').contains('Help').click({ force: true })
  }
}

export const clickMyGousto = () => {
  const platform = Cypress.env('platform')
  if (platform === 'mobile') {
    cy.get('[data-testing=burgerMenu]').click()
    cy.get('[href="/get-help/eligibility-check"] li').click()
  }

  if (platform === 'web') {
    cy.get('[data-testing="header"]').contains('My Gousto').click()
  }
}

export const setFeatureFlag = (featureFlagName, featureFlagValue = true) => {
  cy.window().then($window => {
    // eslint-disable-next-line no-underscore-dangle
    $window.__loadFeatures__({
      features: {
        [featureFlagName]: featureFlagValue,
      }
    })
  })
}
