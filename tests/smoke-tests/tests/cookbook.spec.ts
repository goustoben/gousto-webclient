import { cookbook } from "../pages";

describe("Cookbook", () => {
  describe("proxied requests", () => {
    // Proxied requests
    it("correctly routes to /cookbook/plant-based-recipes", () => {
      cy.visit("/cookbook/plant-based-recipes");
      cy.findAllByText("Plant-Based Recipes").first().should("exist");
    });

    // Doesn't seem to work on staging - data dependent
    // it("proxies /cookbook/recipe-by-id/2668 -> /cookbook/vegan-recipes/the-ultimate-vegan-stack-burger", () => {
    //   cy.visit("/cookbook/recipe-by-id/2668");
    //   cy.assertURLIncludes(
    //     "/cookbook/vegan-recipes/the-ultimate-vegan-stack-burger"
    //   );
    // });

    it("proxies /cookbook/bad-path/slug -> /404", () => {
      cy.visit("/cookbook/bad-path/slug");
      cy.findByText("Oh crumbs!");
    });

    // SEO redirect
    it("redirects from /cookbook/beef-recipes/cheesy-pasta-ragu-pie -> /cookbook/beef-recipes", () => {
      cy.visit("/cookbook/beef-recipes/cheesy-pasta-ragu-pie");
      cy.assertURLIncludes("/cookbook/beef-recipes");
    });
  });

  describe("direct requests", () => {
    beforeEach(() => {
      cookbook.visit();
    });

    it("routes to the correct application", () => {
      cookbook.assertBaseURL();
    });

    it("is interactive", () => {
      cookbook.clickNthRecipeCardInFirstCategory(1);
      cookbook.assertIngredientsTitleExists();
    });
  });
});
