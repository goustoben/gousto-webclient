import type { RouteMatcher, WaitOptions } from 'cypress/types/net-stubbing'
import { datadogRum } from '@datadog/browser-rum'

declare global {
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Chainable {
      /**
       * Custom command to get select nth select option
       * @example cy.selectNthOption('[data-testing="select"]', 2)
       */
      selectNthOption(selectSelector: string, n: number, opts?: { force: boolean }): Chainable

      /**
       * Custom command to get parse iframe body
       * to enable Cypress to interact with it
       * @example cy.getIframeBody('iframe[data-testing="some-iframe"]')
       */
      getIframeBody(iframeSelector: string): Chainable

      /**
       * Custom command to configure interceptors, act and then wait for interceptors
       * Helps wait until page is stable for actions that trigger multiple side effects
       */
      actAndWaitForInterceptors(
        action: () => void,
        interceptors: Array<RouteMatcher>,
        waitOptions?: Partial<WaitOptions>,
      ): void

      /**
       * Custom command wait until element's attachment to DOM is stable
       * Helps work around "Cypress requires elements be attached in the DOM to interact with them." errors
       * @example cy.waitUntilDOMAttachmentStable('some-element')
       */
      waitUntilDOMAttachmentStable(selector: string): Chainable<Element>

      /**
       * Sets 'gousto flavour' browser cookie
       * Used to control visibility of overlays/modals
       * @example cy.setGoustoCookie('tutorial_viewed', { justforyou: 1 })
       */
      setGoustoCookie(
        name: string,
        value: Record<string, unknown>,
        opts?: { version: number },
      ): Chainable<Cypress.Cookie>

      /**
       * Gets DataDog RUM from Cypress window
       * Used to instrument e2e tests
       * or check whether instrumentation is already initialised
       */
      getDDRUM(): Chainable<typeof datadogRum>

      /**
       * Start DataDog session recording if it is not already
       * initialised.
       * This must be invoked AFTER the page is loaded, as DD_RUM
       * is added to the window by the client bundle
       *
       * Note: this has been added to cy.visit
       */
      startDDSessionRecording(): Chainable<typeof datadogRum>

      /**
       * Stops DataDog session recording
       * Intended for use after a test suite
       */
      stopDDSessionRecording(): Chainable<typeof datadogRum>

      /**
       * Append values to the DataDog global context
       * @example
       * ```ts
       * addDDContext(isLoggedIn, true)
       * ```
       */
      addDDContext(contextKey: string, contextValue: unknown): Chainable<typeof datadogRum>
    }
  }
}
