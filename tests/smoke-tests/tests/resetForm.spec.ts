import { resetForm } from "../pages";

describe("Feature", () => {
  describe("proxied requests", () => {
    it("proxies /newpasswordform -> newpasswordform", () => {
      cy.visit("/newpasswordform");
      resetForm.assertPageHeader();
    });
  });

  describe("direct requests", () => {
    beforeEach(() => {
      resetForm.visit();
    });

    // Check key elements on the page
    it("routes to the correct application", () => {
      resetForm.assertPageHeader();
    });

    // Check page is interactive
    it("is interactive", () => {
      resetForm.enterEmailAddress();
      resetForm.clickResetPassword();
      resetForm.assertFeedbackText();
    });
  });
});
