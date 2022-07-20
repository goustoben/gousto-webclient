import { useCallback } from 'react'
import { StockAPIData } from '../api/response'
import { NumberOfPortions, STOCK_LEVEL_MAX, STOCK_LEVEL_NONE } from '../types'

export function useGetStockForRecipe(stockPending: boolean, stock: StockAPIData) {
  return useCallback(
    (recipeId: string, numPortions: number) => {
      if (stockPending || !stock) {
        return STOCK_LEVEL_MAX
      }

      const stockForRecipe = stock[recipeId]

      // TODO should we return 0 here if stock can't be found for recipe? or 1000?
      if (!stockForRecipe) {
        return STOCK_LEVEL_NONE
      }

      if (stockForRecipe.committed === '0') {
        return STOCK_LEVEL_MAX
      }

      if (numPortions === NumberOfPortions.TWO) {
        // this doesnt appear to need parsing, old impl did it anyway
        return stockForRecipe.number
      }

      if (numPortions === NumberOfPortions.FOUR) {
        // this doesnt appear to need parsing, old impl did it anyway
        return stockForRecipe.family_number
      }

      // we shouldn't reach here except in a state I can't predict right now.. so return 0
      // TODO add log
      return STOCK_LEVEL_NONE
    },
    [stockPending, stock],
  )
}
