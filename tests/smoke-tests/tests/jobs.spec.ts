import { jobs } from "../pages";

describe("Jobs", () => {
  describe("direct requests", () => {
    beforeEach(() => {
      jobs.visit();
    });

    // Check key elements on the page
    it("routes to the correct application", () => {
      jobs.assertPageHeader();
    });

    // Check page is interactive
    it("is interactive", () => {
      jobs.clickBoxPricesNavLink();
      cy.assertURLIncludes("box-prices");
    });
  });
});
