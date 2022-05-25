import Page from "./page";

class SubscriptionSettings extends Page {
  // Arrange
  visit() {
    cy.visit("/subscription-settings");
  }

  // Act
  clickNthThing(n: number) {
    cy.get("something").eq(n).click();
  }

  // Assert
  assertBaseUrl() {
    cy.assertURLIncludes("/subscription-settings");
  }

  assertPageHeader() {
    cy.findByText("Subscription settings");
  }
}

export const subscriptionSettings = new SubscriptionSettings();
