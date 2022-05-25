import { internet } from "faker";
import Page from "./page";

class ResetForm extends Page {
  // Arrange
  visit() {
    cy.visit("/resetform");
  }

  // Act
  enterEmailAddress() {
    cy.findByRole("textbox").type(internet.email());
  }

  clickResetPassword() {
    cy.findByText("Reset Password").click();
  }

  // Assert
  assertBaseUrl() {
    cy.assertURLIncludes("/resetform");
  }

  assertPageHeader() {
    cy.findByText("Reset your Password");
  }

  assertFeedbackText() {
    cy.findByText(
      "Please check your e-mail for instructions on resetting your password."
    );
  }
}

export const resetForm = new ResetForm();
