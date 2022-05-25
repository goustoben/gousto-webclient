import Page from "./page";

class GetHelp extends Page {
  // Arrange
  visit() {
    cy.visit("/get-help");
  }

  // Act
  clickContactUs() {
    cy.get('a[href="/get-help/contact"]').click();
  }

  // Assert
  assertBaseUrl() {
    cy.assertURLIncludes("/get-help");
  }

  assertPageHeader() {
    cy.findByText("Get help with your box");
  }

  assertContactPageContents() {
    cy.findByText(/Please get in touch so one of our customer care/i);
  }
}

export const getHelp = new GetHelp();
