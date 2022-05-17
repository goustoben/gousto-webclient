import React, { Provider, ReactElement } from "react";
import { RecipeContextProvider } from "./recipe";
import { UseGetAlternativeOptionsForRecipeContextProvider } from "./useGetAlternativeOptionsForRecipe";
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
  recipe,
}: RecipeTileDependenciesArgs) => (
  // Each logical item uses its own provider to minimize re-renderings
  <UseStockContextProvider value={useStock}>
    <UseGetAlternativeOptionsForRecipeContextProvider
      value={useGetAlternativeOptionsForRecipe}
    >
      <RecipeContextProvider value={recipe}>{children}</RecipeContextProvider>
    </UseGetAlternativeOptionsForRecipeContextProvider>
  </UseStockContextProvider>
);
