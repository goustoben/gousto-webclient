import { useCallback } from 'react'

import Immutable from 'immutable'

import { MenuRecipeStock } from './types'

type UseGetStockForRecipeArgs = {
  menuRecipeStock: MenuRecipeStock
  numPortions: number
}

export const useGetStockForRecipe = ({ menuRecipeStock, numPortions }: UseGetStockForRecipeArgs) =>
  useCallback(
    /**
     * Get the stock level for a given `recipeId` or `null` if stock level data is not available.
     */
    (recipeId: string): number | null => {
      const noRecipeProvided = !recipeId
      const noRecipesStock = !menuRecipeStock
      const recipesStockIsNotImmutable = !Immutable.Iterable.isIterable(menuRecipeStock)

      if (noRecipeProvided || noRecipesStock || recipesStockIsNotImmutable) {
        return null
      }

      if (menuRecipeStock.size === 0) {
        // Stock level data is empty meaning it was not loaded yet
        return null
      }

      return menuRecipeStock.getIn([recipeId, String(numPortions)], 0)
    },
    [numPortions, menuRecipeStock],
  )
