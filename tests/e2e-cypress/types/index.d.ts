/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to get input by label text
     * @example cy.getInputByLabel('First Name')
     */
    getInputByLabel(label: string): Chainable<Element>;

    /**
     * Custom command to get select nth select option
     * @example cy.selectNthOption('[data-testing="select"]', 2)
     */
    selectNthOption(
      selectSelector: string,
      n: number,
      opts?: { force: boolean }
    ): Chainable<Element>;

    /**
     * Custom command to get parse iframe body
     * to enable Cypress to interact with it
     * @example cy.getIframeBody('iframe[data-testing="some-iframe"]')
     */
    getIframeBody(iframeSelector: string): Chainable<Element>;

    /**
     * Custom command to configure interceptors, act and then wait for interceptors
     * Helps wait until page is stable for actions that trigger multiple side effects
     */
    actAndWaitForInterceptors(
      action: () => void,
      interceptors: Array<Partial<Cypress.RouteOptions>>,
      waitOptions?: { timeout: number } // WaitOptions isn't exported by Cypress
    ): void;

    /**
     * Custom command wait until element's attachment to DOM is stable
     * Helps work around "Cypress requires elements be attached in the DOM to interact with them." errors
     * @example cy.waitUntilDOMAttachmentStable('some-element')
     */
    waitUntilDOMAttachmentStable(selector: string): Chainable<Element>;
  }
}
