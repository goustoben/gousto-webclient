import React, { Provider, ReactElement } from "react";
import { RecipeContextProvider } from "./recipe";
import { UseBasketContextProvider } from "./useBasket";
import { UseGetAlternativeOptionsForRecipeContextProvider } from "./useGetAlternativeOptionsForRecipe";
import { UseSetBrowserCTAVisibilityContextProvider } from "./useSetBrowserCTAVisibility";
import { UseStockContextProvider } from "./useStock";

type ExtractValueTypeFromContextProvider<T> = T extends Provider<infer U>
  ? U
  : never;

type RecipeTileDependenciesArgs = {
  children: ReactElement;
  useStock: ExtractValueTypeFromContextProvider<typeof UseStockContextProvider>;
  useGetAlternativeOptionsForRecipe: ExtractValueTypeFromContextProvider<
    typeof UseGetAlternativeOptionsForRecipeContextProvider
  >;
  useBasket: ExtractValueTypeFromContextProvider<
    typeof UseBasketContextProvider
  >;
  useSetBrowserCTAVisibility: ExtractValueTypeFromContextProvider<
    typeof UseSetBrowserCTAVisibilityContextProvider
  >;
  recipe: ExtractValueTypeFromContextProvider<typeof RecipeContextProvider>;
};

/**
 * Populates all contexts necessary for rendering `RecipeTile`.
 *
 * Note: the contexts include not only data but "hooks" which could be called from within `RecipeTile`
 * component sub-tree.
 */
export const RecipeTileDependencies = ({
  children,
  useStock,
  useGetAlternativeOptionsForRecipe,
  useBasket,
  useSetBrowserCTAVisibility,
  recipe,
}: RecipeTileDependenciesArgs) => (
  // Each logical item uses its own provider to minimize re-renderings
  <UseStockContextProvider value={useStock}>
    <UseGetAlternativeOptionsForRecipeContextProvider
      value={useGetAlternativeOptionsForRecipe}
    >
      <UseBasketContextProvider value={useBasket}>
        <UseSetBrowserCTAVisibilityContextProvider
          value={useSetBrowserCTAVisibility}
        >
          <RecipeContextProvider value={recipe}>
            {children}
          </RecipeContextProvider>
        </UseSetBrowserCTAVisibilityContextProvider>
      </UseBasketContextProvider>
    </UseGetAlternativeOptionsForRecipeContextProvider>
  </UseStockContextProvider>
);
