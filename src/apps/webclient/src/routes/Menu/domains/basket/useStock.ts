import { useStockAPI } from '../stock'
import { useIsRecipeInBasket } from './internal/useIsRecipeInBasket'
import { useNumPortions } from './internal/useNumPortions'

export function useStock() {
  const { numPortions } = useNumPortions()
  const isRecipeInBasket = useIsRecipeInBasket()

  return useStockAPI({ numPortions, isRecipeInBasket })
}
