import { useCallback } from 'react'

import { RootStateOrAny, useSelector } from 'react-redux'

import menuConfig from 'config/menu'
import { getStock } from 'selectors/root'

import { useGetStockForRecipe, MenuRecipeStock } from './useGetStockForRecipe'

export function useStockAPI({
  numPortions,
  isRecipeInBasket,
}: {
  numPortions: number
  isRecipeInBasket: (recipeId: string) => boolean
}) {
  const menuRecipeStock = useSelector<RootStateOrAny, MenuRecipeStock>(getStock)

  const getStockForRecipe = useGetStockForRecipe({ menuRecipeStock, numPortions })

  const isRecipeOutOfStock = useCallback(
    (recipeId: string) => {
      const stockLevelForRecipe = getStockForRecipe(recipeId)

      if (stockLevelForRecipe === null) {
        // We choose to be optimistic and assume recipe is in stock
        // while the stock data is still loading
        return false
      }

      return stockLevelForRecipe <= menuConfig.stockThreshold && !isRecipeInBasket(recipeId)
    },
    [getStockForRecipe, isRecipeInBasket],
  )

  const getOutOfStockRecipeIds = useCallback(
    (recipeIds: string[]) => {
      if (recipeIds.some((id: string) => getStockForRecipe(id) === null)) {
        return null
      }

      return recipeIds.filter(isRecipeOutOfStock)
    },
    [getStockForRecipe, isRecipeOutOfStock],
  )

  return {
    getOutOfStockRecipeIds,
    getStockForRecipe,
    isRecipeOutOfStock,
  }
}
