import Page from "./page";

class Blog extends Page {
  // Arrange
  visit() {
    cy.visit("/blog");
  }

  // Act
  clickRecipesCategory() {
    cy.findByText(/recipes/i).click();
  }

  clickBoxPricesNavLink() {
    cy.findAllByText(/box prices/i)
      .eq(0)
      .click();
  }

  // Assert
  assertBaseUrl() {
    cy.assertURLIncludes("/blog");
  }

  assertPageHeader() {
    cy.findByText("The Gousto Blog");
  }
}

export const blog = new Blog();
