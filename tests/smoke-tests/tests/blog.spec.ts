import { blog } from "../pages";

// Blog is only available in production
xdescribe("Blog", () => {
  describe("proxied requests", () => {
    // Check proxy rules from redirect_rules.conf
    it("proxies /we-care -> /blog/values", () => {
      cy.visit("/we-care");
      cy.assertURLIncludes("/values");
    });

    it("proxies /suppliers -> /blog/suppliers", () => {
      cy.visit("/suppliers");
      cy.assertURLIncludes("/blog/suppliers");
    });

    it("proxies /2021 -> /blog/2021", () => {
      cy.visit("/2021");
      cy.assertURLIncludes("/blog/2021");
    });

    // Check sample of SEO redirects
    it("proxies /blog/recipes/drinks-snack-recipes -> blog/recipes/snacks-sides-recipes", () => {
      cy.visit("/blog/recipes/drinks-snack-recipes");
      cy.assertURLIncludes("/blog/recipes/snacks-sides-recipes");
    });
  });

  describe("direct requests", () => {
    beforeEach(() => {
      blog.visit();
    });

    // Check key elements on the page
    it("routes to the correct application", () => {
      blog.assertPageHeader();
    });

    // Check page is interactive
    it("is interactive", () => {
      blog.clickBoxPricesNavLink();
      cy.assertURLIncludes("/box-prices");
    });
  });
});
