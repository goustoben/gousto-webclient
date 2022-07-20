import React from 'react'
import { useStockSWR, UseStockSWRArgs } from './api'
import { UseStockDependencies } from './types'
import { useGetStockForRecipe } from './utils/getStockForRecipe'
import { useIsRecipeInStock } from './utils/isRecipeInStock'

/**
 * Hook interface for the `/delivery_day/___/stock` endpoint in core
 *
 * @param {UseStockArgs} args - SWR arguments
 * @param {string} args.coreUrl - Base core URL
 * @param {string} args.deliveryDayId - Delivery day id to query
 * @param {BaseFetcher<StockAPIResponse>} args.getFetcher - Fetcher for use in SWR (passed in for compatibility with webclient)
 *
 *
 * @param deps - General functional (non-HTTP) dependencies for the hook
 * @param deps.minimumThreshold - The minimum quantity of stock which a recipe must exceed to be considered 'in stock'
 */
export function useStock(swrArgs: UseStockSWRArgs, deps: UseStockDependencies) {
  const { isPending: stockPending, stock } = useStockSWR(swrArgs)

  const getStockForRecipe = useGetStockForRecipe(stockPending, stock)

  const isRecipeInStock = useIsRecipeInStock(deps, getStockForRecipe)

  const isRecipeOutOfStock = React.useCallback(
    (recipeId: string, numPortions: number) => !isRecipeInStock(recipeId, numPortions),
    [isRecipeInStock],
  )

  return {
    /**
     * Get the stock count for a specific recipe
     *
     * @param recipeId - The recipe to query
     * @param numPortions - The number of portions the user has selected
     *
     * @returns The stock count
     */
    getStockForRecipe,

    /**
     * See if a recipe is in stock, according to the `minimumThreshold` value.
     *
     * @param recipeId - The recipe to query
     * @param numPortions - The number of portions the user has selected
     *
     * @returns `true` if in stock, otherwise `false`.
     */
    isRecipeInStock,

    /**
     * See if a recipe is out of stock, according to the `minimumThreshold` value.
     *
     * @param recipeId - The recipe to query
     * @param numPortions - The number of portions the user has selected
     *
     * @returns `true` if out of stock, otherwise `false`.
     */
    isRecipeOutOfStock,
  }
}
