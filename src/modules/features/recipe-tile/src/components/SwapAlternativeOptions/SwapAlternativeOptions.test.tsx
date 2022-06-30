import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

import { SwapAlternativeOptions } from "./SwapAlternativeOptions";
import { UseGetAlternativeOptionsForRecipeContextProvider } from "../../model/context";
import { UseTrackingContextProvider } from "../../model/context/useTracking";
import { UseMakeOnCheckRecipeContextProvider } from "../../model/context/useMakeOnCheckRecipe";
import { RecipeReferenceProvider } from "../../model/context/useRecipeReference";

const getAlternativeOptionsForRecipe = jest.fn().mockImplementation(() => [
  {
    recipeId: "111",
    recipeName: "Test Recipe One",
    changeCheckedRecipe: () => {},
    isChecked: true,
    isOnDetailScreen: false,
    isOutOfStock: false,
  },
  {
    recipeId: "222",
    recipeName: "Test Recipe Two",
    changeCheckedRecipe: () => {},
    isChecked: false,
    isOnDetailScreen: false,
    isOutOfStock: false,
  },
]);

describe("<swapAlternativeOptions />", () => {
  const trackRecipeAlternativeOptionsMenuOpen = jest.fn();
  const trackRecipeAlternativeOptionsMenuSwapRecipes = jest.fn();

  const useTrackingSwapAlternativeOptions = () => ({
    trackRecipeAlternativeOptionsMenuOpen,
    trackRecipeAlternativeOptionsMenuSwapRecipes,
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe("when rendered initially", () => {
    const renderOptions = () =>
      render(
        <UseGetAlternativeOptionsForRecipeContextProvider
          value={() => getAlternativeOptionsForRecipe}
        >
          <UseTrackingContextProvider
            value={() => ({
              useTrackVariantListDisplay: () => {},
              useTrackingSwapAlternativeOptions,
            })}
          >
            <UseMakeOnCheckRecipeContextProvider value={() => () => () => {}}>
              <SwapAlternativeOptions
                recipeId="123"
                originalId="123"
                categoryId="111"
              />
            </UseMakeOnCheckRecipeContextProvider>
          </UseTrackingContextProvider>
        </UseGetAlternativeOptionsForRecipeContextProvider>
      );

    test("should show only button", () => {
      renderOptions();
      const button = screen.getByRole("button");
      expect(button).toBeTruthy();
    });

    test("should not show expanded dropdown", () => {
      renderOptions();
      expect(screen.queryByRole("list")).toBeNull();
    });

    test("should show chevron icon pointing downwards", () => {
      renderOptions();
      const button = screen.getByRole("button");
      expect(button).toContainHTML("m 1611,320");
    });

    test("should not fire any tracking events", () => {
      renderOptions();
      expect(trackRecipeAlternativeOptionsMenuOpen).not.toHaveBeenCalled();
      expect(
        trackRecipeAlternativeOptionsMenuSwapRecipes
      ).not.toHaveBeenCalled();
    });
  });

  describe("when clicked on", () => {
    const renderExtendedDropdown = () => {
      const renderedResults = render(
        <UseGetAlternativeOptionsForRecipeContextProvider
          value={() => getAlternativeOptionsForRecipe}
        >
          <UseTrackingContextProvider
            value={() => ({
              useTrackVariantListDisplay: () => {},
              useTrackingSwapAlternativeOptions,
            })}
          >
            <UseMakeOnCheckRecipeContextProvider value={() => () => () => {}}>
              <SwapAlternativeOptions
                recipeId="123"
                originalId="123"
                categoryId="111"
              />
            </UseMakeOnCheckRecipeContextProvider>
          </UseTrackingContextProvider>
        </UseGetAlternativeOptionsForRecipeContextProvider>
      );
      fireEvent.click(screen.getByRole("button"));

      return renderedResults;
    };

    test("should show expanded dropdown", () => {
      renderExtendedDropdown();
      expect(screen.queryByRole("list")).toBeInTheDocument();
    });

    test("should show chevron pointing upwards", () => {
      renderExtendedDropdown();
      const [button] = screen.getAllByRole("button");
      expect(button).toContainHTML("m 1611,832");
    });

    test("should the list in the dropdown should have show all options", () => {
      renderExtendedDropdown();
      const items = screen.getAllByRole("listitem");
      expect(items.length).toEqual(2);
      expect(items[0]).toHaveTextContent(/Test Recipe One/);
      expect(items[1]).toHaveTextContent(/Test Recipe Two/);
    });

    test("should fire only open recipe alternative options menu tracking events", () => {
      renderExtendedDropdown();
      expect(trackRecipeAlternativeOptionsMenuOpen).toHaveBeenCalledWith({
        recipeId: "123",
        collectionId: "111",
      });
      expect(
        trackRecipeAlternativeOptionsMenuSwapRecipes
      ).not.toHaveBeenCalled();
    });
  });

  describe("when clicking on up chevron for opened dropdown", () => {
    test("should close the dropdown", () => {
      render(
        <UseGetAlternativeOptionsForRecipeContextProvider
          value={() => getAlternativeOptionsForRecipe}
        >
          <UseTrackingContextProvider
            value={() => ({
              useTrackVariantListDisplay: () => {},
              useTrackingSwapAlternativeOptions,
            })}
          >
            <UseMakeOnCheckRecipeContextProvider value={() => () => () => {}}>
              <SwapAlternativeOptions
                recipeId="123"
                originalId="123"
                categoryId="111"
              />
            </UseMakeOnCheckRecipeContextProvider>
          </UseTrackingContextProvider>
        </UseGetAlternativeOptionsForRecipeContextProvider>
      );
      fireEvent.click(screen.getByRole("button"));
      expect(screen.queryByRole("list")).toBeInTheDocument();
      fireEvent.click(screen.getAllByRole("button")[0]);
      expect(screen.queryByRole("list")).not.toBeInTheDocument();
    });
  });

  describe("when clicking on item from drop down", () => {
    test("should trigger recipe alternative options recipe swap event", () => {
      const onChange = jest.fn()
      render(
        <UseGetAlternativeOptionsForRecipeContextProvider
          value={() => getAlternativeOptionsForRecipe}
        >
          <UseTrackingContextProvider
            value={() => ({
              useTrackVariantListDisplay: () => {},
              useTrackingSwapAlternativeOptions,
            })}
          >
            <RecipeReferenceProvider value="recipe_ref_one">
              <UseMakeOnCheckRecipeContextProvider value={() => () => onChange}>
                <SwapAlternativeOptions
                  recipeId="123"
                  originalId="123"
                  categoryId="cat111"
                />
              </UseMakeOnCheckRecipeContextProvider>
            </RecipeReferenceProvider>
          </UseTrackingContextProvider>
        </UseGetAlternativeOptionsForRecipeContextProvider>
      );
      // Open dropdown
      fireEvent.click(screen.getByRole("button"));
      expect(
        onChange
      ).not.toHaveBeenCalled();

      // Pick second item on the list
      fireEvent.click(screen.getAllByRole("radio")[1]);
      expect(onChange).toHaveBeenCalledWith("222", false);
    });
  });
});
