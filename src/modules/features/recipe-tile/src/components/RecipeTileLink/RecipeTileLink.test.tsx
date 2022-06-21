import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";
import { UseGetRecipeTileLinkDataContextProvider } from "../../model/context/useGetRecipeTileLinkData";
import { RecipeTileLink } from "../RecipeTileLink";
import { cleanup } from "@testing-library/react-hooks";

const dispatchTrackClickMoreRecipeDetails = jest.fn();
const mockedProps = {
  isFineDineIn: false,
  onClickTile: jest.fn(),
};

const getMockContext = () => () => ({
  isRecipeTileLinkVisible: true,
  dispatchTrackClickMoreRecipeDetails,
});

describe("Given: RecipeTileLink component", () => {
  describe('When: User clicks on "More description ->" button', () => {
    afterEach(() => {
      cleanup();
      jest.clearAllMocks();
    });

    test("Click event should trigger dispatch", () => {
      render(
        <UseGetRecipeTileLinkDataContextProvider value={getMockContext()}>
          <RecipeTileLink {...mockedProps} />
        </UseGetRecipeTileLinkDataContextProvider>
      );

      const button = screen.getByRole("button", { name: "More details" });

      fireEvent(
        button,
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        })
      );

      expect(dispatchTrackClickMoreRecipeDetails).toHaveBeenCalledTimes(1);
    });
  });

  describe("When: user sees different kind of recipes", () => {
    afterEach(() => {
      cleanup();
      jest.clearAllMocks();
    });
    test("With fineDineIn enabled", () => {
      const updatedProps = { ...mockedProps, isFineDineIn: true };
      render(
        <UseGetRecipeTileLinkDataContextProvider value={getMockContext()}>
          <RecipeTileLink {...updatedProps} />
        </UseGetRecipeTileLinkDataContextProvider>
      );

      expect(screen.getByText("More details")).toBeDefined();
      expect(
        screen.getByRole("button", { name: "More details" })
      ).toBeDefined();
      expect(screen.getByTestId("arrow_right")).toBeDefined();
    });

    test("With fineDineIn disabled", () => {
      render(
        <UseGetRecipeTileLinkDataContextProvider value={getMockContext()}>
          <RecipeTileLink {...mockedProps} />
        </UseGetRecipeTileLinkDataContextProvider>
      );

      expect(screen.getByText("More details")).toBeDefined();
      expect(
        screen.getByRole("button", { name: "More details" })
      ).toBeDefined();
      expect(screen.getByTestId("arrow_right")).toBeDefined();
    });
  });
});
