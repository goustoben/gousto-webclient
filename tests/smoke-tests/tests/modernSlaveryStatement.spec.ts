import { modernSlaveryStatement } from "../pages";

describe("Feature", () => {
  describe("direct requests", () => {
    beforeEach(() => {
      modernSlaveryStatement.visit();
    });

    // Check key elements on the page
    it("routes to the correct application", () => {
      modernSlaveryStatement.assertPageHeader();
    });
  });
});
