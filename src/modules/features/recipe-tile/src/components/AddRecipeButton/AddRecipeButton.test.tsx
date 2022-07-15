import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { UseBasketContextProvider } from "../../model/context/useBasket";
import { UseSetBrowserCTAVisibilityContextProvider } from "../../model/context/useSetBrowserCTAVisibility";
import { AddRecipeButton } from "./AddRecipeButton";

describe("AddRecipeButton", () => {
  const recipeId = "1234";

  describe("when can NOT add recipes (no postcode in store)", () => {
    test("click should dispatch menuBrowseCTAVisibilityChange", () => {
      const setBrowserCTAVisible = jest.fn();

      render(
        <UseBasketContextProvider
          value={() => ({
            canAddRecipes: false,
            addRecipe: jest.fn(),
            removeRecipe: jest.fn(),
            reachedLimit: false,
            isRecipeInBasket: () => false,
            numPortions: 2,
          })}
        >
          <UseSetBrowserCTAVisibilityContextProvider
            value={() => ({
              setBrowserCTAVisible,
            })}
          >
            <AddRecipeButton recipeId={recipeId} />
          </UseSetBrowserCTAVisibilityContextProvider>
        </UseBasketContextProvider>
      );

      const button = screen.getByRole("button" as any);
      fireEvent.click(button);

      expect(setBrowserCTAVisible).toHaveBeenCalled();
    });
  });

  describe("when can add recipes (postcode in store)", () => {
    describe("when basket limit is reached", () => {
      test("click should dispatch nothing", () => {
        const addRecipe = jest.fn();
        const removeRecipe = jest.fn();

        render(
          <UseBasketContextProvider
            value={() => ({
              canAddRecipes: true,
              addRecipe,
              removeRecipe,
              reachedLimit: true,
              isRecipeInBasket: () => false,
              numPortions: 2,
            })}
          >
            <UseSetBrowserCTAVisibilityContextProvider
              value={() => ({
                setBrowserCTAVisible: () => false,
              })}
            >
              <AddRecipeButton recipeId={recipeId} />
            </UseSetBrowserCTAVisibilityContextProvider>
          </UseBasketContextProvider>
        );

        const button = screen.getByRole("button" as any);
        fireEvent.click(button);

        expect(addRecipe).not.toHaveBeenCalled();
        expect(removeRecipe).not.toHaveBeenCalled();
      });
    });

    describe("when basket has space", () => {
      test("click should dispatch adding a recipe to basket", () => {
        const addRecipe = jest.fn();
        const removeRecipe = jest.fn();

        render(
          <UseBasketContextProvider
            value={() => ({
              canAddRecipes: true,
              addRecipe,
              removeRecipe,
              reachedLimit: false,
              isRecipeInBasket: () => false,
              numPortions: 2,
            })}
          >
            <UseSetBrowserCTAVisibilityContextProvider
              value={() => ({
                setBrowserCTAVisible: () => false,
              })}
            >
              <AddRecipeButton recipeId={recipeId} />
            </UseSetBrowserCTAVisibilityContextProvider>
          </UseBasketContextProvider>
        );

        const button = screen.getByRole("button" as any);
        fireEvent.click(button);

        expect(addRecipe).toHaveBeenCalled();
        expect(removeRecipe).not.toHaveBeenCalled();
      });
    });

    describe("when basket already contains a recipe", () => {
      test("click should dispatch removing recipe from basket", () => {
        const addRecipe = jest.fn();
        const removeRecipe = jest.fn();

        render(
          <UseBasketContextProvider
            value={() => ({
              canAddRecipes: true,
              addRecipe,
              removeRecipe,
              reachedLimit: false,
              isRecipeInBasket: () => true,
              numPortions: 2,
            })}
          >
            <UseSetBrowserCTAVisibilityContextProvider
              value={() => ({
                setBrowserCTAVisible: () => false,
              })}
            >
              <AddRecipeButton recipeId={recipeId} />
            </UseSetBrowserCTAVisibilityContextProvider>
          </UseBasketContextProvider>
        );

        const button = screen.getByRole("button" as any);
        fireEvent.click(button);

        expect(addRecipe).not.toHaveBeenCalled();
        expect(removeRecipe).toHaveBeenCalled();
      });
    });
  });
});
