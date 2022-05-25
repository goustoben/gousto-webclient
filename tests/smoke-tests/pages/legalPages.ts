import Page from "./page";

class LegalPages extends Page {
  // Arrange
  visit() {
    cy.visit("/terms-and-conditions");
  }

  // Act
  clickNthHelpCentreLink(n: number) {
    cy.findAllByText("Help Centre").eq(n).click();
  }

  // Assert
  assertBaseUrl() {
    cy.assertURLIncludes("/terms-and-conditions");
  }

  assertTermsAndConditionsHeader() {
    cy.findByText(/Terms & Conditions/i);
  }

  assertTermsOfUseHeader() {
    cy.findByText("Terms of use");
  }
}

export const legalPages = new LegalPages();
