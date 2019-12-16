import boxPricesResponse from './fixtures/boxPricesResponse.js'

describe("Test", () => {
  it("Shows choose recipes", () => {
    cy.visit("/menu");
    cy.get("h1")
      .should("have.text", "Choose Recipes");
  })

  it("can allow a user login", () => {
    cy.visit("/");
    if (Cypress.env('MEDIA') === 'mobile') {
      cy.get('button[data-testing="burgerMenu"]').click();
      cy.get('li[data-testing="burgerMenuLogin"]').click();
    } else {
      cy.contains('Login').click();
    }

    cy.get('form').within(($form) => {
      cy.get('input[name="email"]').eq(1).type('email@gmail.com', {force: true})
      cy.get('input[name="password"]').type('password', {force: true})
      cy.contains('Go').click();
    })
    cy.get('div[data-testing="loginErrMsg"]')
      .should("have.text", "Incorrect email/password.");
  })

  it("Shows box prices with mocked backend api", () => {
    // mock backend api response
    cy.server();
    cy.route('POST', '**/graphql/v1/graphql', boxPricesResponse);

    // Please be aware that Cypress only currently supports intercepting XMLHttpRequests.
    // Requests using the Fetch API and other types of network requests like page loads
    // and <script> tags will not be intercepted or visible in the Command Log.
    // See #95 for more details and temporary workarounds.
    // https://docs.cypress.io/api/commands/route.html#Syntax
    // https://github.com/cypress-io/cypress/issues/95
    cy.visit("/box-prices", {
      onBeforeLoad (win) {
        delete win.fetch
      },
    });
    cy.get("span")
      .should((spans) => {
        expect(spans).to.contain('£12329.11');
      })
  })
})
