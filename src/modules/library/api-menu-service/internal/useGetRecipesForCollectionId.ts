import { useCallback, useMemo } from 'react'
import { TransformedRecipe } from './transformer'
import {
  getOutOfStockRecipeReplacer,
  getRecipeReferenceInjector,
  getSelectedVariantsReplacer,
} from './recipes/mappers'
import {
  getRecipeComparatorForOutOfStock,
  orderCollectionRecipesByCuisine,
} from './recipes/sorting'
import { UseMenuDependencies } from './types'
import { useTransformedMenuForDate } from './transformer/useTransformedMenus'
import { useNormalisedData } from "./http/useNormalisedData"

/**
 * TypeScript Type guard (for `TransformedRecipe` type)
 *
 * This function will take a `TransformedRecipe | undefined` and will change the type to a `TransformedRecipe` if applicable
 */
function recipeIsTruthy(recipe: TransformedRecipe | undefined): recipe is TransformedRecipe {
  return Boolean(recipe)
}

type GetRecipeForCollectionIdArgs = {
  selectedCuisines?: string[] | null
  selectedRecipeVariants?: Record<string, Record<string, string>>,
}

export type RecipeOptionPair = {
  recipe: TransformedRecipe
  originalId: string
  reference: string
}

export function useGetRecipesForCollectionId(
  menuServiceData: ReturnType<typeof useNormalisedData>['data'],
  { menu, collections, recipes }: ReturnType<typeof useTransformedMenuForDate>,
  { numPortions, isRecipeInStock }: UseMenuDependencies,
) {
  // VPP TODO memoise recipeReferenceInjector

  const recipeComparatorForOutOfStock = useMemo(
    () => getRecipeComparatorForOutOfStock(isRecipeInStock, numPortions),
    [isRecipeInStock, numPortions],
  )

  return useCallback(
    (collectionId: string | null, args?: GetRecipeForCollectionIdArgs): RecipeOptionPair[] => {
      if (!menuServiceData || !collectionId) {
        return []
      }

      if (!menu) {
        return []
      }

      const collection = collections.find((c) => c.id === collectionId)
      if (!collection) {
        return []
      }

      const recipeIds = collection.recipesInCollection
      if (!recipeIds || recipeIds.length === 0) {
        return []
      }

      const selectedVariantReplacer = getSelectedVariantsReplacer({
        recipes,
        replacementMap: (args?.selectedRecipeVariants || {})[collectionId] || {},
      })

      const outOfStockRecipeReplacer = getOutOfStockRecipeReplacer({
        menu,
        isRecipeInStock,
        numPortions,
        recipes,
        dietaryClaims: collection.requirements.dietary_claims,
      })

      const recipeReferenceInjector = getRecipeReferenceInjector({ menu })

      const unsortedRecipes = recipeIds
        .map((id) => recipes.find((other) => other.id === id))
        .filter(recipeIsTruthy)
        .map(recipeReferenceInjector)
        .map(selectedVariantReplacer)
        .map(outOfStockRecipeReplacer)

      const sortedRecipes = unsortedRecipes.sort(recipeComparatorForOutOfStock)

      if (args?.selectedCuisines) {
        const { orderedRecipes } = orderCollectionRecipesByCuisine(
          sortedRecipes,
          args.selectedCuisines,
        )

        return orderedRecipes
      }

      return sortedRecipes
    },
    [
      menuServiceData,
      menu,
      collections,
      recipes,
      isRecipeInStock,
      numPortions,
      recipeComparatorForOutOfStock,
    ],
  )
}
