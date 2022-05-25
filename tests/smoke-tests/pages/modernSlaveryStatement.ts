import Page from "./page";

class ModernSlaveryStatement extends Page {
  // Arrange
  visit() {
    cy.visit("/modern-slavery-statement");
  }

  // Act

  // Assert
  assertBaseUrl() {
    cy.assertURLIncludes("/modern-slavery-statement");
  }

  assertPageHeader() {
    cy.findByText("Modern Slavery Statement");
  }
}

export const modernSlaveryStatement = new ModernSlaveryStatement();
