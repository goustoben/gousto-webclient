import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import {
  useRecipe,
  useGetAlternativeOptionsForRecipeHook,
  useStockHook,
} from "../../model/context";
import { VariantHeader } from "./VariantHeader";

jest.mock("../../model/context");

const useRecipeMock = useRecipe as jest.MockedFunction<typeof useRecipe>;

const useGetAlternativeOptionsForRecipeHookMock =
  useGetAlternativeOptionsForRecipeHook as jest.MockedFunction<
    typeof useGetAlternativeOptionsForRecipeHook
  >;

const useStockHookMock = useStockHook as jest.MockedFunction<
  typeof useStockHook
>;

const recipeId = 'recipe one'

describe("VariantHeader", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe("When there are no alternatives", () => {
    beforeEach(() => {
      mockHooks({
        recipeId,
        useGetAlternativeOptionsForRecipeLight: null,
        isRecipeOutOfStock: false,
      });
    });

    test("then it should not render a header", () => {
      render(<VariantHeader categoryId="123" originalId="123" />);
      expect(screen.queryByText(/options/)).toBeFalsy();
    });
  });

  describe("When a recipe has alternatives", () => {
    describe("When there is an array of recipe variants", () => {
      describe("When the array is empty", () => {
        beforeEach(() => {
          mockHooks({
            recipeId,
            useGetAlternativeOptionsForRecipeLight: [],
            isRecipeOutOfStock: false,
          });
        })

        test("then it should not render a header", () => {
          render(<VariantHeader categoryId="123" originalId="123" />);
          expect(screen.queryByText(/options/)).toBeFalsy();
        });
      });

      describe("When the array contains only recipe itself without any alternatives", () => {
        beforeEach(() => {
          mockHooks({
            recipeId,
            useGetAlternativeOptionsForRecipeLight: [
              { id: "1200-1200", coreRecipeId: "1200", displayName: "Recipe" },
            ],
            isRecipeOutOfStock: false,
          });
        })

        test("then it should not render a header", () => {
          render(<VariantHeader categoryId="123" originalId="123" />);
          expect(screen.queryByText(/options/)).toBeFalsy();
        });
      });

      describe("When there are 3 recipe alternatives", () => {
        beforeEach(() => {
          mockHooks({
            recipeId,
            useGetAlternativeOptionsForRecipeLight: [
              { id: "1200-1200", coreRecipeId: "1200", displayName: "Recipe" },
              {
                id: "1230-1230",
                coreRecipeId: "1230",
                displayName: "Alternative One",
              },
              {
                id: "1234-1234",
                coreRecipeId: "1234",
                displayName: "Alternative Two",
              },
            ],
            isRecipeOutOfStock: false,
          });
        });

        test("then it should render the correct number of recipe variants on the header", () => {
          render(<VariantHeader categoryId="123" originalId="123" />);
          expect(screen.queryByText(/3 options available/)).toBeTruthy();
        });
      });

      describe("When there are 5 recipe alternatives", () => {
        beforeEach(() => {
          mockHooks({
            recipeId,
            useGetAlternativeOptionsForRecipeLight: [
              { id: "1200-1200", coreRecipeId: "1200", displayName: "Recipe" },
              {
                id: "1230-1230",
                coreRecipeId: "1230",
                displayName: "Alternative One",
              },
              {
                id: "1234-1234",
                coreRecipeId: "1234",
                displayName: "Alternative Two",
              },
              {
                id: "1235-1235",
                coreRecipeId: "1235",
                displayName: "Alternative Three",
              },
              {
                id: "1236-1236",
                coreRecipeId: "1236",
                displayName: "Alternative Four",
              },
              {
                id: "1237-1237",
                coreRecipeId: "1237",
                displayName: "Alternative Five",
              },
            ],
            isRecipeOutOfStock: false,
          });
        })

        test("then it should render the correct number of recipe variants on the header", () => {
          render(<VariantHeader categoryId="123" originalId="123" />);
          expect(screen.queryByText(/6 options available/)).toBeTruthy();
        });
      });

      describe("When the recipe is out of stock", () => {
        beforeEach(() => {
          mockHooks({
            recipeId,
            useGetAlternativeOptionsForRecipeLight: [
              { id: "1200-1200", coreRecipeId: "1200", displayName: "Recipe" },
              {
                id: "1230-1230",
                coreRecipeId: "1230",
                displayName: "Alternative One",
              },
              {
                id: "1234-1234",
                coreRecipeId: "1234",
                displayName: "Alternative Two",
              },
            ],
            isRecipeOutOfStock: true,
          });
        })

        test("then it should not render a header", () => {
          render(<VariantHeader categoryId="123" originalId="123" />);
          expect(screen.queryByText(/options/)).toBeFalsy();
        });
      });
    });
  });
});

const mockHooks = ({
  useGetAlternativeOptionsForRecipeLight = [],
  isRecipeOutOfStock = false,
  recipeId = "123",
}: any) => {
  if (useGetAlternativeOptionsForRecipeLight !== undefined) {
    useGetAlternativeOptionsForRecipeHookMock.mockImplementation(
      () => () => () => useGetAlternativeOptionsForRecipeLight
    );
  }

  if (isRecipeOutOfStock !== undefined) {
    useStockHookMock.mockImplementation(() => () => ({
      isRecipeOutOfStock: () => isRecipeOutOfStock as boolean,
    }));
  }

  if (recipeId !== undefined) {
    useRecipeMock.mockImplementation(() => ({ id: recipeId }));
  }
};
