import { menu } from "../pages";

describe("Feature", () => {
  describe("proxied requests", () => {
    // Check proxy rules from redirect_rules.conf
    it("proxies /menu2 -> /menu", () => {
      cy.visit("/menu2");
      menu.assertBaseUrl();
    });

    // Check sample of SEO redirects
    it("proxies /next-weeks-recipes -> /menu", () => {
      cy.visit("/next-weeks-recipes");
      menu.assertBaseUrl();
    });

    it("proxies /index.php/next-weeks-recipes -> /menu", () => {
      cy.visit("/index.php/next-weeks-recipes");
      menu.assertBaseUrl();
    });

    it("proxies /index.php/menu -> /menu", () => {
      cy.visit("/index.php/menu");
      menu.assertBaseUrl();
    });

    // TODO - ask Radishes for a valid example
    // it("proxies /menu/thematic/something -> /menu/something", () => {
    //   cy.visit("/menu/thematic");
    //   cy.assertURLIncludes("/menu/something")
    // });

    // TODO - ask Radishes for a valid example
    // it("proxies /menu/food-brand/something -> /menu/something", () => {
    //   cy.visit("/menu/food-brand/something");
    //   cy.assertURLIncludes("/menu/something")
    // });
  });

  describe("direct requests", () => {
    beforeEach(() => {
      menu.visit();
      menu.dismissDiscountModal();
    });

    // Check key elements on the page
    it("routes to the correct application", () => {
      menu.assertPageHeader();
    });

    // Check page is interactive
    it.only("is interactive", () => {
      menu.clickBoxSummaryButton();
      menu.inputPostcode();
      menu.clickBoxSummaryContinue();
      menu.clickBoxSummaryContinue();
      menu.waitForMenuLoaded();
      menu.addNRecipes(3);
      menu.assertRecipesAdded();
    });
  });
});
