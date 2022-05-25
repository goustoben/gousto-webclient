import Page from "./page";

class Jobs extends Page {
  // Arrange
  visit() {
    cy.visit("/jobs");
  }

  // Act
  clickBoxPricesNavLink() {
    cy.findAllByText(/box prices/i)
      .eq(0)
      .click();
  }

  // Assert
  assertBaseUrl() {
    cy.assertURLIncludes("/jobs");
  }

  assertPageHeader() {
    cy.findByText("Give your career some Gousto");
  }
}

export const jobs = new Jobs();
