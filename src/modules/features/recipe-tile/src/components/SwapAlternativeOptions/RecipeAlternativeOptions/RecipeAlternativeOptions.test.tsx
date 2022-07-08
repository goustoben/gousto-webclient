import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

import { UseGetAlternativeOptionsForRecipeContextProvider } from "../../../model/context";
import { UseTrackingContextProvider } from "../../../model/context/useTracking";
import { RecipeAlternativeOptions } from ".";
import { UseMakeOnCheckRecipeContextProvider } from "../../../model/context/useMakeOnCheckRecipe";

describe("RecipeAlternativeOptions", () => {
  const useTrackingSwapAlternativeOptions = () => ({
    trackRecipeAlternativeOptionsMenuOpen: () => {},
    trackRecipeAlternativeOptionsMenuSwapRecipes: () => {},
  })

  describe("When there are recipe alternative options", () => {
    const changeCheckedRecipeTwo = jest.fn();

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
        changeCheckedRecipe: changeCheckedRecipeTwo,
        isChecked: false,
        isOnDetailScreen: false,
        isOutOfStock: false,
      },
    ]);

    afterEach(() => {
      cleanup();
      jest.clearAllMocks();
    });

    const renderRecipeAlternativeOptions = () =>
      render(
        <UseGetAlternativeOptionsForRecipeContextProvider
          value={() => getAlternativeOptionsForRecipe}
        >
          <UseTrackingContextProvider
            value={() => ({
              useTrackVariantListDisplay: () => {},
              useTrackingSwapAlternativeOptions,
              track: () => {},
            })}
          >
            <UseMakeOnCheckRecipeContextProvider value={() => () => () => {}}>
              <RecipeAlternativeOptions
                recipeId="recipe_1"
                originalId="recipe_1"
                isOnDetailScreen
                categoryId="category_1"
                onChangeCheckedRecipe={() => {}}
              />
            </UseMakeOnCheckRecipeContextProvider>
          </UseTrackingContextProvider>
        </UseGetAlternativeOptionsForRecipeContextProvider>
      );

    test("it should render recipe list", () => {
      renderRecipeAlternativeOptions();
      expect(screen.queryByRole("list")).toBeInTheDocument();

      const items = screen.getAllByRole("listitem");
      expect(items.length).toEqual(2);
      expect(items[0]).toHaveTextContent(/Test Recipe One/);
      expect(items[1]).toHaveTextContent(/Test Recipe Two/);

      expect(getAlternativeOptionsForRecipe).toHaveBeenCalledWith({
        categoryId: "category_1",
        isOnDetailScreen: true,
        recipeId: "recipe_1",
      });
    });

    describe("when user click on option item", () => {
      const onChange = jest.fn()

      const renderRecipeAlternativeOptionsAndPickAnOption = () => {
        render(
          <UseGetAlternativeOptionsForRecipeContextProvider
            value={() => getAlternativeOptionsForRecipe}
          >
            <UseTrackingContextProvider
              value={() => ({
                useTrackVariantListDisplay: () => {},
                useTrackingSwapAlternativeOptions,
                track: () => {},
              })}
            >
              <UseMakeOnCheckRecipeContextProvider value={() => () => onChange}>
                <RecipeAlternativeOptions
                  recipeId="recipe_1"
                  originalId="recipe_1"
                  isOnDetailScreen
                  categoryId="category_1"
                  onChangeCheckedRecipe={() => {}}
                />
              </UseMakeOnCheckRecipeContextProvider>
            </UseTrackingContextProvider>
          </UseGetAlternativeOptionsForRecipeContextProvider>
        );

        // Pick second item on the list
        fireEvent.click(screen.getAllByRole("radio")[1]);
      };

      test("it should call the handler from the hook", () => {
        renderRecipeAlternativeOptionsAndPickAnOption();
        expect(onChange).toHaveBeenCalled();
      });
    });

    describe("when on details screen", () => {
      test("should call trackVariantListDisplay with details", () => {
        const useTrackVariantListDisplay = jest.fn();

        render(
          <UseGetAlternativeOptionsForRecipeContextProvider
            value={() => getAlternativeOptionsForRecipe}
          >
            <UseTrackingContextProvider
              value={() => ({
                useTrackVariantListDisplay,
                useTrackingSwapAlternativeOptions,
                track: () => {},
              })}
            >
              <UseMakeOnCheckRecipeContextProvider value={() => () => () => {}}>
                <RecipeAlternativeOptions
                  recipeId="recipe_1"
                  originalId="recipe_1"
                  isOnDetailScreen
                  categoryId="category_1"
                  onChangeCheckedRecipe={() => {}}
                />
              </UseMakeOnCheckRecipeContextProvider>
            </UseTrackingContextProvider>
          </UseGetAlternativeOptionsForRecipeContextProvider>
        );

        expect(useTrackVariantListDisplay).toHaveBeenCalledWith({
          hasAlternativeOptions: true,
          view: "details",
        });
      });
    });

    describe("when NOT on details screen", () => {
      test("should call trackVariantListDisplay with grid", () => {
        const useTrackVariantListDisplay = jest.fn();

        render(
          <UseGetAlternativeOptionsForRecipeContextProvider
            value={() => getAlternativeOptionsForRecipe}
          >
            <UseTrackingContextProvider
              value={() => ({
                useTrackVariantListDisplay,
                useTrackingSwapAlternativeOptions,
                track: () => {},
              })}
            >
              <UseMakeOnCheckRecipeContextProvider value={() => () => () => {}}>
                <RecipeAlternativeOptions
                  recipeId="recipe_1"
                  originalId="recipe_1"
                  isOnDetailScreen={false}
                  categoryId="category_1"
                  onChangeCheckedRecipe={() => {}}
                />
              </UseMakeOnCheckRecipeContextProvider>
            </UseTrackingContextProvider>
          </UseGetAlternativeOptionsForRecipeContextProvider>
        );

        expect(useTrackVariantListDisplay).toHaveBeenCalledWith({
          hasAlternativeOptions: true,
          view: "grid",
        });
      });
    });
  });

  describe("When there are no recipe alternative options", () => {
    afterEach(() => {
      cleanup();
      jest.clearAllMocks();
    });

    const getAlternativeOptionsForRecipe = jest
      .fn()
      .mockImplementation(() => []);

    const renderRecipeAlternativeOptions = () =>
      render(
        <UseGetAlternativeOptionsForRecipeContextProvider
          value={() => getAlternativeOptionsForRecipe}
        >
          <UseTrackingContextProvider
            value={() => ({
              useTrackVariantListDisplay: jest.fn(),
              useTrackingSwapAlternativeOptions,
              track: () => {},
            })}
          >
            <UseMakeOnCheckRecipeContextProvider value={() => () => () => {}}>
              <RecipeAlternativeOptions
                recipeId="recipe_1"
                originalId="recipe_1"
                isOnDetailScreen
                categoryId="category_1"
                onChangeCheckedRecipe={() => {}}
              />
            </UseMakeOnCheckRecipeContextProvider>
          </UseTrackingContextProvider>
        </UseGetAlternativeOptionsForRecipeContextProvider>
      );

    test("it should not render the component", () => {
      renderRecipeAlternativeOptions();
      expect(screen.queryByRole("list")).not.toBeInTheDocument();
    });
  });

  describe("When the options consist of just a selected recipe", () => {
    afterEach(() => {
      cleanup();
      jest.clearAllMocks();
    });

    const getAlternativeOptionsForRecipe = jest.fn().mockImplementation(() => [
      {
        recipeId: "111",
        recipeName: "Test Recipe One",
        changeCheckedRecipe: () => {},
        isChecked: true,
        isOnDetailScreen: false,
        isOutOfStock: false,
      },
    ]);

    const renderRecipeAlternativeOptions = () =>
      render(
        <UseGetAlternativeOptionsForRecipeContextProvider
          value={() => getAlternativeOptionsForRecipe}
        >
          <UseTrackingContextProvider
            value={() => ({
              useTrackVariantListDisplay: jest.fn(),
              useTrackingSwapAlternativeOptions,
              track: () => {},
            })}
          >
            <UseMakeOnCheckRecipeContextProvider value={() => () => () => {}}>
              <RecipeAlternativeOptions
                recipeId="recipe_1"
                originalId="recipe_1"
                isOnDetailScreen
                categoryId="category_1"
                onChangeCheckedRecipe={() => {}}
              />
            </UseMakeOnCheckRecipeContextProvider>
          </UseTrackingContextProvider>
        </UseGetAlternativeOptionsForRecipeContextProvider>
      );

    test("it should not render the component", () => {
      renderRecipeAlternativeOptions();
      expect(screen.queryByRole("list")).not.toBeInTheDocument();
    });
  });
});
