import { home, myGousto, subscriptionSettings } from "../pages";

// TODO - These don't work at the moment, investigate

xdescribe("Subscription settings", () => {
  beforeEach(() => {
    home.visit();
    home.assertPageHeader();
    home.clickLoginNavLink();
    home.waitForRecaptchaLoaded();
    home.enterEmail();
    home.enterPassword();
    home.clickLogIn();

    myGousto.assertPageContents();
    // subscriptionSettings.visit();
  });

  describe("direct requests", () => {
    // Check key elements on the page
    it("routes to the correct application", () => {
      subscriptionSettings.assertPageHeader();
    });
  });
});
