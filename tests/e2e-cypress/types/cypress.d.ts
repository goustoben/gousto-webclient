import type { RouteMatcher, WaitOptions } from 'cypress/types/net-stubbing'

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
    }
  }
}
