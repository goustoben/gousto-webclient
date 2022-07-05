import { useCallback } from 'react'

import { Map } from 'immutable'
import { useSelector } from 'react-redux'

import { getBasketRecipes, getBasketPostcode } from 'selectors/basket'

import { useIsRecipeInBasket } from '../useIsRecipeInBasket'
import { sumQuantities, useRecipeLimitReached } from '../useRecipeLimitReached'
import { useAddRecipe, AddRecipeFn } from './useAddRecipe'
import { useRemoveRecipe, RemoveRecipeFn } from './useRemoveRecipe'

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

  const isRecipeInBasket = useIsRecipeInBasket()

  const addRecipe = useAddRecipe()
  const removeRecipe = useRemoveRecipe()
  const reachedLimit = useRecipeLimitReached(recipeQuantities)
  const canAddRecipes = useCanAddRecipes()

  const recipeCount = sumQuantities(recipeQuantities)

  const swapRecipes = useCallback(
    (oldRecipeId: string, newRecipeId: string, view?: string) => {
      removeRecipe(oldRecipeId, view)
      addRecipe(newRecipeId, view)
    },
    [removeRecipe, addRecipe],
  )

  return {
    addRecipe,
    removeRecipe,
    swapRecipes,
    canAddRecipes,
    reachedLimit,
    recipeCount,
    getQuantitiesForRecipeId,
    isRecipeInBasket,
  }
}

export { useBasketRecipes, useIsRecipeInBasket, AddRecipeFn, RemoveRecipeFn }
