import { useCallback, useMemo } from 'react'
import { useMenuService, UseMenuSWRArgs } from './http'
import { TransformedRecipe, transformMenuForDate } from './transformer'
import { getOutOfStockRecipeReplacer, getRecipeReferenceInjector, getSelectedVariantsReplacer } from './recipes/mappers'
import { getRecipeComparatorForOutOfStock, orderCollectionRecipesByCuisine } from './recipes/sorting'
import { UseMenuDependencies } from './types'

/**
 * TypeScript Type guard (for `TransformedRecipe` type)
 *
 * This function will take a `TransformedRecipe | undefined` and will change the type to a `TransformedRecipe` if applicable
 */
function recipeIsTruthy(recipe: TransformedRecipe | undefined): recipe is TransformedRecipe {
  return Boolean(recipe)
}

type GetRecipeForCollectionIdArgs = {
  selectedCuisines?: string[]
}

type RecipePair = {
  recipe: TransformedRecipe
  originalId: string
  reference: string
}

export function useGetRecipesForCollectionId(
  requestArgs: UseMenuSWRArgs,
  date: string,
  { numPortions, selectedRecipeVariants, isRecipeInStock }: UseMenuDependencies,
) {
  const menuServiceData = useMenuService(requestArgs)

  const recipeComparatorForOutOfStock = useMemo(
    () => getRecipeComparatorForOutOfStock(isRecipeInStock, numPortions),
    [isRecipeInStock, numPortions],
  )

  return useCallback(
    (collectionId: string, args?: GetRecipeForCollectionIdArgs): RecipePair[] => {
      if (!menuServiceData) {
        return []
      }

      const { menu, collections, recipes } = transformMenuForDate(menuServiceData, date)
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
        replacementMap: (selectedRecipeVariants || {})[collectionId] || {},
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
        const { orderedRecipes } = orderCollectionRecipesByCuisine(sortedRecipes, args.selectedCuisines)

        return orderedRecipes
      }

      return sortedRecipes
    },
    [menuServiceData, isRecipeInStock, numPortions, date, recipeComparatorForOutOfStock, selectedRecipeVariants],
  )
}
