import { Map } from 'immutable'
import { useSelector } from 'react-redux'
import { getBasketRecipes, getBasketPostcode } from 'selectors/basket'
import { useAddRecipe } from './useAddRecipe'
import { limitReached } from '../limitReached'
import { useRemoveRecipe } from './useRemoveRecipe'
import { useIsRecipeInBasket } from '../useIsRecipeInBasket'

/**
 * Users can add recipes if the basket has a postcode
 */
const useCanAddRecipes = () => {
  const postcode = useSelector(getBasketPostcode)

  return Boolean(postcode)
}

const useRecipeQuantities = (): Map<string, number> => {
  const recipesFromState = useSelector(getBasketRecipes)

  return recipesFromState
}

const useBasketRecipes = () => {
  const recipeQuantities = useRecipeQuantities()
  const addRecipe = useAddRecipe()
  const removeRecipe = useRemoveRecipe()
  const reachedLimit = limitReached(recipeQuantities)
  const canAddRecipes = useCanAddRecipes()

  return {
    addRecipe,
    removeRecipe,
    canAddRecipes,
    reachedLimit,
  }
}

export { useBasketRecipes, useIsRecipeInBasket }
