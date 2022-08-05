import { datadogRum } from '@datadog/browser-rum'

// TODO LIST
// Fix types for cypress overwrite
// Create separate config files - CI + local (and adjust package.json scripts + docs)
// Move credentials below into config file env variables
// Set environment variable in both config files to enable/disable DD
// Enable DD based on the above 👆🏻
// Create DD utils? i.e. getIsDDInitialized etc.

Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  // First, visit the page so DD_RUM is on the window
  const chainableVisit = originalFn(url, options)

  // cy.initDDRUM()
  // cy.getDDRUM().startSessionReplayRecording()

  cy.window().its('DD_RUM').then((DD_RUM: typeof datadogRum) => {
    if (DD_RUM.getInternalContext()?.session_id) return

    DD_RUM.init({
      applicationId: "7eaa558f-a187-40c5-b743-9fd52d7aff3a",
      clientToken: "pub7210de2a9d84977c7611bb974aa9f74f",
      site: 'datadoghq.eu',
      service:'gousto-webclient-e2e-staging---test',
      sampleRate: 100,
      trackInteractions: true
    })

    DD_RUM.setRumGlobalContext({
      testName: Cypress.currentTest.titlePath.join(' '),
      build: process.env.CIRCLE_BUILD_NUM,
      testRunner: 'cypress'
    })

    DD_RUM.startSessionReplayRecording();
  })

  return chainableVisit
})
