import Page from "./page";

class PrivacyStatement extends Page {
  // Arrange
  visit() {
    cy.visit("/privacy-statement");
  }

  // Act

  // Assert
  assertBaseUrl() {
    cy.assertURLIncludes("/privacy-statement");
  }

  assertPageHeader() {
    cy.findByText("Privacy Statement");
  }
}

export const privacyStatement = new PrivacyStatement();
