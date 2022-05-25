import Page from "./page";

class RateMyRecipes extends Page {
  // Arrange
  visit() {
    cy.visit("/rate-my-recipes");
  }

  // Act
  clickHomeNavLink() {
    cy.findAllByText("Home").eq(0).click();
  }

  // Assert
  assertBaseUrl() {
    cy.assertURLIncludes("/rate-my-recipes");
  }

  assertPageHeader() {
    cy.findByText("Rate my recipes");
  }
}

export const rateMyRecipes = new RateMyRecipes();
