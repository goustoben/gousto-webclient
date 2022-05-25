Cypress.Commands.add(
  "assertURLEquals",
  (assertion: string): Cypress.Chainable => {
    return cy.url().should("equal", assertion);
  }
);

Cypress.Commands.add(
  "assertURLIncludes",
  (assertion: string): Cypress.Chainable => {
    return cy.url().should("include", assertion);
  }
);
