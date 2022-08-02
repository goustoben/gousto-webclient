import Page from "./page";

class Home extends Page {
  visit() {
    cy.visit("/");
  }

  clickGetStarted() {
    cy.get('[data-testing="homepageHeroCTA"]').click()
  }
}

export const home = new Home();
