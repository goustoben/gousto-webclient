import { useCallback, useMemo } from 'react'
import { getMenuIdForDate } from './date/getMenuIdForDate'
import { useMenuService, UseMenuSWRArgs } from './http'
import { TransformedRecipe, transformMenu } from './transformer'
import { use_legacy_InStockRecipeIds } from './stock'
import { getOutOfStockRecipeReplacer, getRecipeReferenceInjector, getSelectedVariantsReplacer } from './recipes/mappers'
import { getRecipeComparatorForOutOfStock, orderCollectionRecipesByCuisine } from './recipes/sorting'
import { use_legacy_CurrentMenuVariants } from './recipes'
import { UseMenuDependencies } from './types'

/**
 * This function will take a `TransformedRecipe | undefined` and will change the type to a `TransformedRecipe` if applicable
 */
function recipeIsTruthy(recipe: TransformedRecipe | undefined): recipe is TransformedRecipe {
  return Boolean(recipe)
}

type GetRecipeForCollectionIdArgs = {
  selectedCuisines?: string[]
}

export function useGetRecipesForCollectionId(
  requestArgs: UseMenuSWRArgs,
  date: string,
  { numPortions, selectedRecipeVariants }: UseMenuDependencies,
) {
  const menuServiceData = useMenuService(requestArgs)
  const recipesInStockIds = use_legacy_InStockRecipeIds({ numPortions })
  const recipesVariants = use_legacy_CurrentMenuVariants('menu-id-JAMES-CHANGE-THIS!!!!')

  const recipeComparatorForOutOfStock = useMemo(
    () => getRecipeComparatorForOutOfStock(recipesInStockIds),
    [recipesInStockIds],
  )

  return useCallback(
    (collectionId: string, args: GetRecipeForCollectionIdArgs) => {
      if (!menuServiceData) {
        return []
      }

      const menuId = getMenuIdForDate(menuServiceData, date)

      const menu = menuServiceData.data.find((m) => m.id === menuId)

      if (!menu) {
        return []
      }

      const { collections, recipes } = transformMenu(menuServiceData, menu)

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
        recipesInStockIds,
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

      if (args.selectedCuisines) {
        const { orderedRecipes } = orderCollectionRecipesByCuisine(sortedRecipes, args.selectedCuisines)

        return orderedRecipes
      }

      return sortedRecipes
    },
    [menuServiceData, date, recipeComparatorForOutOfStock, recipesInStockIds, recipesVariants, selectedRecipeVariants],
  )
}
