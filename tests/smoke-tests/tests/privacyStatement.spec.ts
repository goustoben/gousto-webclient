import { privacyStatement } from "../pages";

describe("Feature", () => {
  describe("direct requests", () => {
    beforeEach(() => {
      privacyStatement.visit();
    });

    // Check key elements on the page
    it("routes to the correct application", () => {
      privacyStatement.assertPageHeader();
    });
  });
});
