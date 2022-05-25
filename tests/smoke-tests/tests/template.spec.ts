import { somePage } from "../pages";

xdescribe("Feature", () => {
  describe("proxied requests", () => {
    // Check proxy rules from redirect_rules.conf
    it("proxies /A -> /B", () => {
      cy.visit("/help");
      somePage.assertBaseUrl();
    });

    // Check sample of SEO redirects
    it("proxies /contact -> /help-centre", () => {
      cy.visit("/contact");
      somePage.assertBaseUrl();
    });
  });

  describe("direct requests", () => {
    beforeEach(() => {
      somePage.visit();
    });

    // Check key elements on the page
    it("routes to the correct application", () => {
      somePage.assertPageHeader();
    });

    // Check page is interactive
    it("is interactive", () => {
      // Click something, check the result
    });
  });
});
