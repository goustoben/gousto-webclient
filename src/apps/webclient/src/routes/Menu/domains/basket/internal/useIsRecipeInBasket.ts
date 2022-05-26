import { useCallback } from 'react'

import { useSelector } from 'react-redux'

import { getBasketRecipes } from 'selectors/basket'

export const useIsRecipeInBasket = () => {
  const recipeQuantities = useSelector(getBasketRecipes)

  return useCallback(
    (recipeId: string) => recipeQuantities !== undefined && recipeQuantities?.get(recipeId, 0) > 0,
    [recipeQuantities],
  )
}
