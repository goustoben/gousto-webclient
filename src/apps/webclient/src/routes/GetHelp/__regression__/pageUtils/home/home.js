export const clickHelp = () => {
  // Without this cy.wait(), sometimes the pre Help login modal shows wiht a message
  // that you are logged in, (race condition?) when clicking help. Instead of going
  // to Self Serve Resolution.
  cy.wait(1000)

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
    cy.get('[data-testing=burgerMenu]').click({ force: true })
    cy.get('[href="/my-gousto"] li').click({ force: true })
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
