import { useSelector } from 'react-redux'
import { getRecipeOutOfStock, getRecipeSurcharge } from '../../selectors/recipe'

export const useIfRecipeIdIsOutOfStock = (recipeId) =>
  useSelector(state => getRecipeOutOfStock(state, { recipeId }))

export const useGetSurchargeForRecipeId = (recipeId) =>
  useSelector(state => getRecipeSurcharge(state, { recipeId })) || 0
