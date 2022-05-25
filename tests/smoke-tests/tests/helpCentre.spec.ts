import { helpCentre } from "../pages";

describe("Help Centre", () => {
  describe("proxied requests", () => {
    // Check proxy from help -> help-centre
    it("proxies /help -> /help-centre", () => {
      cy.visit("/help");
      helpCentre.assertBaseUrl();
    });

    // SEO redirect
    it("proxies /contact -> /help-centre", () => {
      cy.visit("/contact");
      helpCentre.assertBaseUrl();
    });

    it("proxies /learn-more -> /help-centre", () => {
      cy.visit("/learn-more");
      helpCentre.assertBaseUrl();
    });
  });

  describe("direct requests", () => {
    beforeEach(() => {
      helpCentre.visit();
    });

    // Check key elements on the page
    it("routes to the correct application", () => {
      helpCentre.assertPageHeader();
    });

    // Check page is interactive
    it("is interactive", () => {
      helpCentre.clickNthFrequentlyAskedQuestion(1);
      helpCentre.assertOnActiclePage();
    });
  });
});
