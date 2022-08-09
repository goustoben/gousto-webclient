Cypress.Commands.overwrite('visit', (originalFn, url, options?) => {
  // First, visit the page so DD_RUM is on the window
  // @ts-ignore Cypress type issue: https://github.com/cypress-io/cypress/issues/19564
  originalFn(url, options)

  // Start DataDog RUM recording if in CI environment
  if (Cypress.env('DD_ENABLED')) {
    cy.startDDSessionRecording()
  }
})
