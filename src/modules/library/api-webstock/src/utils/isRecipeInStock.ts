import { useCallback } from 'react'
import { NumberOfPortions, UseStockDependencies } from '../types'
import { useGetStockForRecipe } from './getStockForRecipe'

export function useIsRecipeInStock(
  deps: UseStockDependencies,
  getStockForRecipe: ReturnType<typeof useGetStockForRecipe>,
) {
  const minimumThreshold = deps.minimumThreshold || 0

  return useCallback(
    (recipeId: string, numPortions: NumberOfPortions) => {
      const recipeStockCount = getStockForRecipe(recipeId, numPortions)

      return recipeStockCount > minimumThreshold
    },
    [getStockForRecipe, minimumThreshold],
  )
}
