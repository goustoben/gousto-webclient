import React, { Provider, ReactElement } from "react";
import { RecipeContextProvider } from "./recipe";
import { UseBasketContextProvider } from "./useBasket";
import { UseGetAlternativeOptionsForRecipeContextProvider } from "./useGetAlternativeOptionsForRecipe";
import { UseGetRecipeTileLinkDataContextProvider } from "./useGetRecipeTileLinkData";
import { UseGetSurchargeForRecipeIdContextProvider } from "./useGetSurchargeForRecipeId";
import { UseMakeOnCheckRecipeContextProvider } from "./useMakeOnCheckRecipe";
import { UseRecipeBrandContextProvider } from "./useRecipeBrand";
import { RecipeReferenceProvider } from "./useRecipeReference";
import { UseSetBrowserCTAVisibilityContextProvider } from "./useSetBrowserCTAVisibility";
import { UseStockContextProvider } from "./useStock";
import { UseTrackingContextProvider } from "./useTracking";

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
  useTracking: ExtractValueTypeFromContextProvider<typeof UseTrackingContextProvider>;
  useGetSurchargeForRecipeId: ExtractValueTypeFromContextProvider<typeof UseGetSurchargeForRecipeIdContextProvider>
  useRecipeBrand: ExtractValueTypeFromContextProvider<typeof UseRecipeBrandContextProvider>
  recipeReference?: ExtractValueTypeFromContextProvider<typeof RecipeReferenceProvider>;
  useGetRecipeTileLinkData: ExtractValueTypeFromContextProvider<typeof UseGetRecipeTileLinkDataContextProvider>;
  useMakeOnCheckRecipe: ExtractValueTypeFromContextProvider<typeof UseMakeOnCheckRecipeContextProvider>;
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
  useTracking,
  useGetSurchargeForRecipeId,
  recipeReference = null,
  useRecipeBrand,
  useGetRecipeTileLinkData,
  useMakeOnCheckRecipe,
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
            <UseTrackingContextProvider value={useTracking}>
              <UseGetSurchargeForRecipeIdContextProvider value={useGetSurchargeForRecipeId}>
                <RecipeReferenceProvider value={recipeReference}>
                  <UseRecipeBrandContextProvider value={useRecipeBrand}>
                    <UseGetRecipeTileLinkDataContextProvider value={useGetRecipeTileLinkData}>
                      <UseMakeOnCheckRecipeContextProvider value={useMakeOnCheckRecipe}>
                        {children}
                      </UseMakeOnCheckRecipeContextProvider>
                    </UseGetRecipeTileLinkDataContextProvider>
                  </UseRecipeBrandContextProvider>
                </RecipeReferenceProvider>
              </UseGetSurchargeForRecipeIdContextProvider>
            </UseTrackingContextProvider>
          </RecipeContextProvider>
        </UseSetBrowserCTAVisibilityContextProvider>
      </UseBasketContextProvider>
    </UseGetAlternativeOptionsForRecipeContextProvider>
  </UseStockContextProvider>
);
