import { Map } from 'immutable'
import { useSelector } from 'react-redux'
import { getBasketRecipes, getBasketPostcode } from 'selectors/basket'
import { useCallback } from 'react'
import { sumQuantities, useRecipeLimitReached } from '../useRecipeLimitReached'
import { useAddRecipe } from './useAddRecipe'
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

  const getQuantitiesForRecipeId = useCallback(
    (recipeId: string) => recipeQuantities.get(recipeId, 0),
    [recipeQuantities],
  )

  const addRecipe = useAddRecipe()
  const removeRecipe = useRemoveRecipe()
  const reachedLimit = useRecipeLimitReached(recipeQuantities)
  const canAddRecipes = useCanAddRecipes()

  const recipeCount = sumQuantities(recipeQuantities)

  return {
    addRecipe,
    removeRecipe,
    canAddRecipes,
    reachedLimit,
    recipeCount,
    getQuantitiesForRecipeId,
  }
}

export { useBasketRecipes, useIsRecipeInBasket }
