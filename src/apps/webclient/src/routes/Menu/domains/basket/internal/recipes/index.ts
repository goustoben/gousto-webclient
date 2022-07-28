import { useCallback } from 'react'

import { Map } from 'immutable'
import { useSelector } from 'react-redux'

import { getBasketRecipes, getBasketPostcode } from 'selectors/basket'

import { useRecipeLimitReached, useRemoveRecipesOverLimit, sumQuantities } from '../limits'
import { useIsRecipeInBasket } from '../useIsRecipeInBasket'
import { useAddRecipe } from './useAddRecipe'
import { useRemoveRecipe } from './useRemoveRecipe'

/**
 * Can recipes be added to the basket at this point?
 *
 * Requires a postcode to be set
 *
 * @returns
 */
const useCanAddRecipes = () => {
  const postcode = useSelector(getBasketPostcode)

  return Boolean(postcode)
}

/**
 * Get the recipes currently in the basket
 *
 * @returns a `Map<string, number>` where the key is the recipe ID and the value is the number of that recipe in basket
 */
const useRecipeQuantities = (): Map<string, number> => useSelector(getBasketRecipes)

/**
 * Entrypoint for the `basket recipes` information
 *
 * @returns addRecipe - add a recipe to the basket
 * @returns removeRecipe - remove a recipe from the basket
 * @returns swapRecipe - replace a recipe in the basket
 *
 */
export const useBasketRecipes = () => {
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

  useRemoveRecipesOverLimit(recipeQuantities)

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
