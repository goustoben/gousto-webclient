import Page from "./page";

class Menu extends Page {
  // Arrange
  visit() {
    cy.visit("/menu");
  }

  dismissDiscountModal() {
    cy.findByText("Claim discount").click();
  }

  // Act
  clickBoxSummaryButton() {
    cy.get('[data-testing="expandBoxSummaryButton"]').click();
  }

  clickBoxSummaryContinue() {
    cy.findByText(/Continue/i).click();
    cy.get('[data-testing="boxSummaryContinueButtonSpinner"]').should(
      "not.be.visible"
    );
  }

  clickExistingDeliveryDate() {
    cy.get('[data-testing="icon-full-box"]')
      .parentsUntil('[data-testing="dateSlot"]')
      .click();
  }

  clickEditRecipes() {
    cy.findByText(/Edit recipes/i).click();
  }

  addNRecipes(recipeCount = 3) {
    [...new Array(recipeCount)].forEach((_, idx) => {
      cy.findAllByText(/Add recipe/)
        .eq(idx)
        .click();
    });
  }

  inputPostcode() {
    cy.get('[data-testing="menuPostcodeInput"]').type(
      this.defaultData.address.postcode
    );
  }

  clickCheckout() {
    cy.findAllByText(/Checkout/i)
      .filter(":visible")
      .click();
  }

  waitForMenuLoaded() {
    cy.get('[data-testing="boxSummaryButtonSpinner"]').should("not.be.visible");
  }

  // Assert
  assertBaseUrl() {
    cy.assertURLIncludes("/menu");
  }

  assertPageHeader() {
    cy.findAllByText(/Menu for/)
      .first()
      .should("exist");
  }

  assertRecipesAdded() {
    // have to findAll due to multiple similar elements being on the DOM
    cy.findAllByText(/more recipe for the best price per serving/)
      .first()
      .should("exist");
  }
}

export const menu = new Menu();
