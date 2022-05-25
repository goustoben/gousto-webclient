import { home, myGousto, getHelp } from "../pages";

describe("Get help", () => {
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
      getHelp.visit();
    });

    // Check key elements on the page
    it("routes to the correct application", () => {
      getHelp.assertPageHeader();
    });

    // Check page is interactive
    it.only("is interactive", () => {
      getHelp.clickContactUs();
      getHelp.assertContactPageContents();
    });
  });
});
