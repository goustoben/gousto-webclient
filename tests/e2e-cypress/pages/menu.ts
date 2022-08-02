import Page from "./page";

class Menu extends Page {
  visit() {
    cy.visit("/menu");
  }

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

  clickCheckout() {
    cy.get('[data-testing="boxSummaryButton"]')
      .find("button:visible")
      .should("not.be.disabled")
      .click();
  }

  waitForMenuLoaded() {
    cy.get('[data-testing="boxSummaryButtonSpinner"]').should("not.be.visible");
  }
}

export const menu = new Menu();
