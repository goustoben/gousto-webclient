import { useCallback } from 'react'
import Immutable from 'immutable'
import { MenuRecipeStock } from './types'

type UseGetStockForRecipeArgs = {
  menuRecipeStock: MenuRecipeStock;
  numPortions: number;
}

export const useGetStockForRecipe = ({menuRecipeStock, numPortions}: UseGetStockForRecipeArgs) => {
  const getStockForRecipe = useCallback(
    /**
     * Get the stock level for a given `recipeId`.
     */
    (recipeId: string): number => {
      const noRecipeProvided = ! recipeId
      const noRecipesStock = ! menuRecipeStock
      const recipesStockIsNotImmutable = ! Immutable.Iterable.isIterable(menuRecipeStock)

      if (noRecipeProvided || noRecipesStock || recipesStockIsNotImmutable) {
        return 0
      }

      return menuRecipeStock.getIn([recipeId, String(numPortions)], 0)
    },
    [numPortions, menuRecipeStock]
  )

  return getStockForRecipe
}
