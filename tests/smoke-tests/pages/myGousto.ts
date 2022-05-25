import Page from "./page";

class MyGousto extends Page {
  // Arrange
  // Act
  // Assert
  assertPageContents() {
    cy.findByText(/your recent recipes/i);
  }
}

export const myGousto = new MyGousto();
