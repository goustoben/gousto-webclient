import { useCallback } from 'react'
import { useNormalisedData } from "./http/useNormalisedData"
import { getVariantsForRecipe } from './recipeOptions'
import { getSurchargeForRecipe } from './recipes/surcharge'
import { formatRecipeTitle } from './recipes/title'
import { useTransformedMenuForDate } from './transformer/useTransformedMenus'
import { UseMenuDependencies } from './types'

const compareCoreRecipeIds = (a: { coreRecipeId: string }, b: { coreRecipeId: string }) =>
  parseInt(a.coreRecipeId, 10) - parseInt(b.coreRecipeId, 10)

type GetOptionsForRecipeArgs = {
  isOnDetailScreen?: boolean
}

export function useGetOptionsForRecipe(
  menuServiceData: ReturnType<typeof useNormalisedData>['data'],
  { menu, collections, recipes }: ReturnType<typeof useTransformedMenuForDate>,
  { numPortions, isRecipeInStock }: UseMenuDependencies,
) {
  return useCallback(
    (
      coreRecipeId: string,
      collectionId?: string,
      { isOnDetailScreen = false }: GetOptionsForRecipeArgs = { isOnDetailScreen: false },
    ) => {
      if (!collectionId) {
        throw new Error(
          `Failed to obtain collectionId while determining Alternative Options for ${coreRecipeId} recipe`,
        )
      }

      if (!menuServiceData) {
        return []
      }

      if (!menu) {
        return []
      }

      const collection = collections.find((c) => c.id === collectionId)
      if (!collection) {
        return []
      }

      const selectedRecipe = recipes.find((r) => r.coreRecipeId === coreRecipeId)
      if (!selectedRecipe) {
        return []
      }

      const recipeAlternativeOptions = getVariantsForRecipe(
        menu,
        coreRecipeId,
        recipes,
        collection.requirements.dietary_claims,
      )
      if (!recipeAlternativeOptions) {
        return []
      }

      const { alternatives } = recipeAlternativeOptions

      const options = [
        {
          displayName: formatRecipeTitle(selectedRecipe),
          coreRecipeId: selectedRecipe.coreRecipeId,
        },
        ...alternatives,
      ]

      options.sort(compareCoreRecipeIds)

      return options.map((option) => {
        const surcharge = getSurchargeForRecipe(recipes, option.coreRecipeId, numPortions)

        return {
          recipeId: option.coreRecipeId,
          recipeName: option.displayName,
          isChecked: String(coreRecipeId) === String(option.coreRecipeId),
          isOnDetailScreen,
          isOutOfStock: isRecipeInStock(option.coreRecipeId, numPortions) === false,
          surcharge,
        }
      })
    },
    [menuServiceData, collections, menu, recipes, isRecipeInStock, numPortions],
  )
}
