import { useStockAPI } from '../stock'
import { useIsRecipeInBasket } from './internal/useIsRecipeInBasket'
import { useNumPortions } from './internal/useNumPortions'

// TODO move this into ../stock folder (it doesn't belong here)
/**
 * Bridge around the webstock API
 *
 * @returns the webstock module result
 */
export function useStock() {
  const { numPortions } = useNumPortions()
  const isRecipeInBasket = useIsRecipeInBasket()

  return useStockAPI({ numPortions, isRecipeInBasket })
}
