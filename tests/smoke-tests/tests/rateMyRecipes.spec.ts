import { home, myGousto, rateMyRecipes } from "../pages";

describe("Rate my recipes", () => {
  beforeEach(() => {
    home.visit();
    home.assertPageHeader();
    home.clickLoginNavLink();
    home.waitForRecaptchaLoaded();
    home.enterEmail();
    home.enterPassword();
    home.clickLogIn();

    myGousto.assertPageContents();
  });

  describe("direct requests", () => {
    beforeEach(() => {
      rateMyRecipes.visit();
    });

    // Check key elements on the page
    it("routes to the correct application", () => {
      rateMyRecipes.assertPageHeader();
    });

    // Check page is interactive
    it("is interactive", () => {
      rateMyRecipes.clickHomeNavLink();
      home.assertBaseUrl();
    });
  });
});
