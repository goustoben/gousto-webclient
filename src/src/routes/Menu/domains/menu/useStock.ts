import { useCallback } from 'react'
import { RootStateOrAny, useSelector } from 'react-redux'
import { getStock } from 'selectors/root'
import menuConfig from 'config/menu'
import { useBasket } from '../basket'
import { useGetStockForRecipe, MenuRecipeStock } from './internal/useGetStockForRecipe'

export const useStock = () => {
  const menuRecipeStock = useSelector<RootStateOrAny, MenuRecipeStock>(getStock)
  const { numPortions, isRecipeInBasket } = useBasket()

  const getStockForRecipe = useGetStockForRecipe({menuRecipeStock, numPortions})

  const isRecipeOutOfStock = useCallback(
    ((recipeId: string) => {
      const stockLevelForRecipe = getStockForRecipe(recipeId)

      if (stockLevelForRecipe === null) {
        // We choose to be optimistic and assume recipe is in stock
        // while the stock data is still loading
        return false
      }

      return (stockLevelForRecipe <= menuConfig.stockThreshold) && !isRecipeInBasket(recipeId)
    }),
    [getStockForRecipe, isRecipeInBasket]
  )

  return {
    getStockForRecipe,
    isRecipeOutOfStock,
  }
}

