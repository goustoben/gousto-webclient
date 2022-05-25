import { legalPages, helpCentre } from "../pages";

describe("LegalPages", () => {
  describe("direct requests", () => {
    describe("terms and conditions", () => {
      beforeEach(() => {
        legalPages.visit();
      });

      // Check key elements on the page
      it("routes to the correct application", () => {
        legalPages.assertTermsAndConditionsHeader();
      });

      // Check page is interactive
      it("is interactive", () => {
        legalPages.clickNthHelpCentreLink(0);
        helpCentre.assertBaseUrl;
      });
    });

    describe("terms of use", () => {
      beforeEach(() => {
        cy.visit("/terms-of-use");
      });

      // Check key elements on the page
      it("routes to the correct application", () => {
        legalPages.assertTermsOfUseHeader();
      });

      // Check page is interactive
      it("is interactive", () => {
        legalPages.clickNthHelpCentreLink(0);
        helpCentre.assertBaseUrl;
      });
    });
  });
});
