import Page from "./page";

class MyDetails extends Page {
  // Arrange
  visit() {
    cy.visit("/my-details");
  }

  // Act
  clickEditName() {
    cy.get("span.glyphicon-user").siblings("button.detail-edit").click();
  }

  clickSave(formName: string) {
    cy.get(`form#${formName}`).findByText(/save/i).click();
  }

  clickSendEmail() {
    cy.findByText(/send email/i).click();
  }

  clickDisableAccount() {
    cy.findByText(/click here/i).click();
  }

  clickConfirmDisableAccount() {
    cy.findByText(/confirm disable account/i).click();
  }

  typeFirstName(name: string) {
    cy.findByPlaceholderText("First Name").clear().type(name);
    cy.wait(2000);
  }

  typeLastName(name: string) {
    cy.findByPlaceholderText("Surname").clear().type(name);
    cy.wait(2000);
  }

  // Assert
  assertBaseUrl() {
    cy.assertURLIncludes("/my-details");
  }

  assertPageContents() {
    cy.findByText("My Personal Details");
  }

  assertName(name: string) {
    cy.get("div.change-detail-heading").findByText(name);
  }

  assertPasswordEmailSent() {
    cy.findByText(/email sent/i);
  }
}

export const myDetails = new MyDetails();
