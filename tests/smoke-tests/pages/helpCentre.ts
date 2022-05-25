import Page from "./page";

class HelpCentre extends Page {
  // Arrange
  visit() {
    cy.visit("/help-centre");
  }

  // Act
  clickNthFrequentlyAskedQuestion(n: number) {
    cy.get('div[data-tracking-action="kb_click_top_article"] a').eq(n).click();
  }

  // Assert
  assertBaseUrl() {
    cy.assertURLIncludes("/help-centre");
  }

  assertPageHeader() {
    cy.findByText("Hi, how can we help?");
  }

  assertOnActiclePage() {
    cy.findByText("Articles in this section");
  }
}

export const helpCentre = new HelpCentre();
