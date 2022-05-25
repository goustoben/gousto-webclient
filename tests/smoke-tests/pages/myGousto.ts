import Page from "./page";

class MyGousto extends Page {
  // Arrange
  // Act
  // Assert
  assertPageContents() {
    cy.findByText(/Last delivery/i);
  }
}

export const myGousto = new MyGousto();
