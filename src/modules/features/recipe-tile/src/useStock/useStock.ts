import { useCallback } from 'react'
import { useStockSWR, UseStockSWRArgs } from './api'
import { NumberOfPortions } from './types'
import { buildGetStockForRecipe } from './utils/getStockForRecipe'

type UseStockArgs =
  UseStockSWRArgs
  & {
    numPortions: NumberOfPortions,
  }

/**
 * Hook interface for the `/delivery_day/___/stock` endpoint in core
 *
 * @param {UseStockArgs} args - Hook arguments
 * @param {2 | 4} args.numPortions - The number of portions to use when querying stock
 * @param {string} args.deliveryDayId - Delivery day for the endpoint url
 * @param {string} args.coreUrl - Base core URL
 * @param {BaseFetcher<StockAPIResponse>} args.getFetcher - Fetcher for use in SWR (passed in for compatibility with webclient)
 */
export function useStock({ numPortions, ...swrArgs }: UseStockArgs) {
  const { isPending: stockPending, stock } = useStockSWR(swrArgs)

  /**
   * Get the stock count for a specific recipe
   *
   * @param {string} recipeId - The recipe to query
   *
   * @returns The stock count
   */
  const getStockForRecipe = useCallback(
    buildGetStockForRecipe(stockPending, stock, numPortions),
    [stockPending, stock, numPortions]
  )

  /**
   * Get whether a recipe is out of stock
   *
   * @param {string} recipeId - The recipe to query
   *
   * @returns `true` if the recipe is out-of-stock, otherwise `false`
   */
  const isRecipeOutOfStock = useCallback(
    (recipeId: string) => getStockForRecipe(recipeId) === 0,
    [getStockForRecipe]
  )

  return {
    getStockForRecipe,
    isRecipeOutOfStock
  }
}
