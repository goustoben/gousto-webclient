import Page from "./page";

class Home extends Page {
  // Arrange
  visit() {
    cy.visit("/");
  }

  waitForRecaptchaLoaded() {
    cy.get("div.grecaptcha-badge", {
      timeout: 30 * 1000,
    });
  }

  // Act
  clickLoginNavLink() {
    cy.findAllByText(/login/i).eq(0).click();
  }

  clickAccountDetailsSubNavLink() {
    cy.findByText(/account details/i).click();
  }

  enterEmail() {
    cy.findByPlaceholderText(/your email/i).type(Cypress.env("EMAIL"));
  }

  enterPassword() {
    cy.findByPlaceholderText(/your password/i).type(Cypress.env("PASSWORD"));
  }

  clickLogIn() {
    cy.findByText(/log in/i).click();
  }

  clickGetStarted() {
    cy.get('[data-testing="homepageHeroCTA"]').click();
  }

  // Assert
  assertPageHeader() {
    cy.findByText("Endless choice in a recipe box");
  }

  assertBaseUrl() {
    cy.assertURLEquals(Cypress.env("BASE_URL"));
  }
}

export const home = new Home();
