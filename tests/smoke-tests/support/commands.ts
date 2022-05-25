import "@testing-library/cypress/add-commands";
import "cypress-wait-until";
import { RouteMatcher, StringMatcher } from "cypress/types/net-stubbing";
import axios from "axios";

Cypress.Commands.add("getInputByLabel", (label: string) =>
  cy
    .contains("label", label)
    .invoke("attr", "for")
    .then((id) => {
      cy.get(`#${id}`);
    })
);

Cypress.Commands.add(
  "selectNthOption",
  (selectSelector: string, n: number, opts = { force: false }) =>
    cy.get(selectSelector).select(n, opts)
);

// Need to improve this by making it chainable
Cypress.Commands.add("getIframeBody", (iframeSelector: string) => {
  cy.log("getIframeBody");

  return cy
    .get(iframeSelector, { log: false })
    .its("0.contentDocument.body", { log: false })
    .should("not.be.empty")
    .then((body) => cy.wrap(body, { log: false }));
});

Cypress.Commands.add(
  "actAndWaitForInterceptors",
  (
    action: () => Cypress.Chainable,
    interceptors: Array<RouteMatcher | StringMatcher>
  ) => {
    // Configure interceptors prior to acting
    const interceptorAliases = interceptors.map((route, idx) => {
      cy.intercept(route).as(`${idx}`);
      return `@${idx}`;
    });

    // Act
    action();

    // Wait for interceptors in parallel
    cy.wait(interceptorAliases, { timeout: 15 * 1000 });
  }
);

Cypress.Commands.add(
  "waitUntilDOMAttachmentStable",
  (selector: string): Cypress.Chainable => {
    return cy.waitUntil(() =>
      cy.get(selector).then(($el) => Cypress.dom.isAttached($el))
    );
  }
);

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
