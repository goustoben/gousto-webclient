import { name } from "faker";
import { home, myDetails, myGousto } from "../pages";

xdescribe("My Details", () => {
  describe("direct requests", () => {
    beforeEach(() => {
      home.visit();
      home.assertPageHeader();
      home.clickLoginNavLink();
      home.waitForRecaptchaLoaded();
      home.enterEmail();
      home.enterPassword();
      home.clickLogIn();

      myGousto.assertPageContents();

      myDetails.visit();
    });

    // Check key elements on the page
    it("routes to the correct application", () => {
      myDetails.assertPageContents();
    });

    // Check page is interactive
    describe("interactive checks", () => {
      it("can update personal details", () => {
        const firstName = name.firstName();
        const lastName = name.lastName();
        const updatedName = `${firstName} ${lastName}`;

        myDetails.clickEditName();
        myDetails.typeFirstName(firstName);
        myDetails.typeLastName(lastName);
        myDetails.clickSave("account-name");

        myDetails.assertName(updatedName);
      });

      it.only("can update request password reset email", () => {
        myDetails.clickSendEmail();
        myDetails.assertPasswordEmailSent();
      });

      // xit("can disable user account", () => {
      //   myDetails.clickDisableAccount();
      //   myDetails.clickConfirmDisableAccount();
      // This is already broken
      // });

      // it("can add a delivery address", () => {});

      // it("can update payment info", () => {});
    });
  });
});
