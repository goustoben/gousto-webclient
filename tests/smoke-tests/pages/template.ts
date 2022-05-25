import Page from "./page";

class SomePage extends Page {
  // Arrange
  visit() {
    cy.visit("/some-url");
  }

  // Act
  clickNthThing(n: number) {
    cy.get("something").eq(n).click();
  }

  // Assert
  assertBaseUrl() {
    cy.assertURLIncludes("/some-url");
  }

  assertPageHeader() {
    cy.findByText("Some page header");
  }
}

export const somePage = new SomePage();
