import { Map } from 'immutable'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { basketRecipeAdd, basketRecipeRemove } from 'routes/Menu/actions/basketRecipes'
import { getBasketRecipes } from '../../../../../selectors/basket'
import { useBasketDelivery } from './delivery'

const USER_RECIPE_LIMIT = 4

const useModifyRecipes = () => {
  const dispatch = useDispatch()

  const addRecipe = (recipeId: string, view?: string) => {
    dispatch(basketRecipeAdd(recipeId, view))
  }

  const removeRecipe = (recipeId: string, view?: string, position?: number | null) => {
    dispatch(basketRecipeRemove(recipeId, view, position))
  }

  return {
    addRecipe,
    removeRecipe
  }
}

/**
 * Users can add recipes if the basket has a postcode
 */
const useCanAddRecipes = () => {
  const { postcode } = useBasketDelivery()

  return Boolean(postcode)
}

const useRecipeQuantities = (): Map<string, number> => {
  const recipesFromState = useSelector(getBasketRecipes)

  return recipesFromState
}

const sumQuantities = (recipes: Map<string, number>) => recipes
  .reduce((total = 0, current = 0) => total + current, 0)

export const useBasketRecipes = () => {
  const recipeQuantities = useRecipeQuantities()
  const canAddRecipes = useCanAddRecipes()

  const isRecipeInBasket = useCallback(
    (recipeId: string) => recipeQuantities.get(recipeId, 0) > 0,
    [recipeQuantities]
  )

  const limitReached = sumQuantities(recipeQuantities) >= USER_RECIPE_LIMIT

  return {
    ...useModifyRecipes(),

    canAddRecipes,
    limitReached,
    isRecipeInBasket,
  }
}
