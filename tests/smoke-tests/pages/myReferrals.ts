import Page from "./page";

class MyReferrals extends Page {
  // Arrange
  visit() {
    cy.visit("/my-referrals");
  }

  // Act
  clickEmailButton() {
    cy.findByText(/email/i).click();
  }

  typeEmail(email: string) {
    cy.findByPlaceholderText(/your friend's email/i).type(email);
  }

  clickSendEmail() {
    cy.findByText(/send email/i).click();
  }

  // Assert
  assertBaseUrl() {
    cy.assertURLIncludes("/my-referrals");
  }

  assertPageHeader() {
    cy.findByText("Invite your friends to try out Gousto!");
  }

  assertEmailSent() {
    cy.findByText(/An invitation has been sent to your friend/i);
  }
}

export const myReferrals = new MyReferrals();
