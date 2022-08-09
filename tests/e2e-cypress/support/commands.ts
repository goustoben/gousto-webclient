import '@testing-library/cypress/add-commands'
import 'cypress-wait-until'
import type { RouteMatcher, WaitOptions } from 'cypress/types/net-stubbing'

Cypress.Commands.add(
  'selectNthOption',
  (selectSelector: string, n: number, opts = { force: false }) =>
    cy.get(selectSelector).select(n, opts),
)

// Need to improve this by making it chainable
Cypress.Commands.add('getIframeBody', (iframeSelector: string) => {
  cy.log('getIframeBody')

  return cy
    .get(iframeSelector, { log: false })
    .its('0.contentDocument.body', { log: false })
    .should('not.be.empty')
    .then((body) => cy.wrap(body, { log: false }))
})

Cypress.Commands.add(
  'actAndWaitForInterceptors',
  (action: () => void, interceptors: Array<RouteMatcher>, waitOptions?: Partial<WaitOptions>) => {
    // Configure interceptors prior to acting
    const interceptorAliases = interceptors.map((route, idx) => {
      cy.intercept(route).as(`${idx}`)
      return `@${idx}`
    })

    // Act
    action()

    // Wait for interceptors in parallel
    cy.wait(interceptorAliases, { timeout: 15 * 1000, ...waitOptions })
  },
)

Cypress.Commands.add('waitUntilDOMAttachmentStable', (selector: string): Cypress.Chainable => {
  return cy.waitUntil(() => cy.get(selector).then(($el) => Cypress.dom.isAttached($el)))
})

Cypress.Commands.add(
  'setGoustoCookie',
  (name: string, value: Record<string, unknown>, opts?: { version: number }) => {
    const version = opts ? opts.version : 1

    return cy.setCookie(`v${version}_${name}`, encodeURIComponent(JSON.stringify(value)))
  },
)

Cypress.Commands.add('getDDRUM', () => cy.window().its('DD_RUM'))

Cypress.Commands.add('startDDSessionRecording', () =>
  cy.getDDRUM().then((DD_RUM) => {
    const DDCtx = DD_RUM.getInternalContext()
    const isInitialised = DDCtx && DDCtx.session_id

    if (isInitialised) return

    DD_RUM.init({
      applicationId: Cypress.env('DD_APPLICATION_ID'),
      clientToken: Cypress.env('DD_CLIENT_TOKEN'),
      site: 'datadoghq.eu',
      service: Cypress.env('DD_SERVICE'),
      sampleRate: 100,
      trackInteractions: true,
    })

    DD_RUM.setRumGlobalContext({
      testName: Cypress.currentTest.titlePath.join(' '),
      build: process.env.CIRCLE_BUILD_NUM,
      testRunner: 'cypress',
    })

    DD_RUM.startSessionReplayRecording()
  }),
)

Cypress.Commands.add('stopDDSessionRecording', () => {
  cy.getDDRUM().then((DD_RUM) => {
    const DDCtx = DD_RUM.getInternalContext()
    const isInitialised = DDCtx && DDCtx.session_id

    if (isInitialised) return

    DD_RUM.stopSessionReplayRecording()
  })
})

Cypress.Commands.add('addDDContext', (contextKey, contextValue) =>
  cy.getDDRUM().then((DD_RUM) => {
    DD_RUM.addRumGlobalContext(contextKey, contextValue)
  }),
)

// WIP
// Cypress.Commands.add(
//   "clickWhereParentDoesntContain",
//   (selector: string, parentSelector: string, excludes: string) => {
//     cy.get(parentSelector)
//       .not(`:contains('${excludes}')`)
//       // .eq(idx)
//       .within(() => cy.get(`[data-testing="${selector}"]`).click());
//   }
// );
