import { RootStateOrAny, useSelector } from 'react-redux'
import { getStock } from 'selectors/root'
import { useBasket } from '../basket'
import { useGetStockForRecipe, MenuRecipeStock } from './internal/useGetStockForRecipe'

export const useStock = () => {
  const menuRecipeStock = useSelector<RootStateOrAny, MenuRecipeStock>(getStock)
  const { numPortions } = useBasket()

  const getStockForRecipe = useGetStockForRecipe({menuRecipeStock, numPortions})

  return {
    getStockForRecipe
  }
}
