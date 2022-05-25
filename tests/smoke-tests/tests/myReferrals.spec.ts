import { internet } from "faker";
import { home, myGousto, myReferrals } from "../pages";

describe("My referrals", () => {
  beforeEach(() => {
    // TODO - should this be a command/pattern?
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
      myReferrals.visit();
    });

    // Check key elements on the page
    it("routes to the correct application", () => {
      myReferrals.assertPageHeader();
    });

    // Check page is interactive
    it("is interactive", () => {
      myReferrals.clickEmailButton();
      myReferrals.typeEmail(internet.email());
      myReferrals.clickSendEmail();
      myReferrals.assertEmailSent();
    });
  });
});
