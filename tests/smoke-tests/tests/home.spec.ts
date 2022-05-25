import { home } from "../pages";

describe("Homepage", () => {
  describe("proxied requests", () => {
    // Check proxy rules from redirect_rules.conf
    it("proxies /home -> /", () => {
      cy.visit("/home");
      home.assertBaseUrl();
    });
  });

  describe("direct requests", () => {
    beforeEach(() => {
      home.visit();
    });

    // Check key elements on the page
    it("routes to the correct application", () => {
      home.assertPageHeader();
    });

    // Check page is interactive
    it("is interactive", () => {
      // Click something, check the result
      home.clickGetStarted();
      cy.assertURLIncludes("/signup/box-size");
    });
  });
});
