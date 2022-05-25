import Page from "./page";

class Cookbook extends Page {
  // Arrange
  visit() {
    cy.visit("/cookbook");
  }

  // Act
  clickNthRecipeCardInFirstCategory(n: number) {
    cy.get('[data-test="category-section"]')
      .find("ul")
      .find("a") // Recipe card
      .eq(n)
      .as("nthRecipeCard");

    cy.get("@nthRecipeCard").click();
  }

  // Assert
  assertPageHeader() {
    cy.findByText("Our recipes");
  }

  assertBaseURL() {
    cy.assertURLIncludes("/cookbook");
  }

  assertIngredientsTitleExists() {
    cy.findByText("Ingredients");
  }
}

export const cookbook = new Cookbook();
