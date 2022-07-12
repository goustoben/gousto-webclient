import { useEffect } from 'react'

import { Map } from 'immutable'

import { useRemoveRecipe } from './recipes/useRemoveRecipe'
import { useNumPortions } from './useNumPortions'
import { useSupportedBoxTypes } from './useSupportedBoxTypes'

export const sumQuantities = (recipes: Map<string, number>) =>
  recipes.reduce((total = 0, current = 0) => total + current, 0)

export const useRecipeLimitExceeded = (recipes: Map<string, number>): boolean => {
  const { maxRecipesForPortion } = useSupportedBoxTypes()
  const { numPortions } = useNumPortions()

  return sumQuantities(recipes) > maxRecipesForPortion(numPortions)
}

export const useRecipeLimitReached = (recipes: Map<string, number>): boolean => {
  const { maxRecipesForPortion } = useSupportedBoxTypes()
  const { numPortions } = useNumPortions()

  return sumQuantities(recipes) >= maxRecipesForPortion(numPortions)
}

export const useRemoveRecipesOverLimit = (recipes: Map<string, number>) => {
  const removeRecipeQuantity = useRemoveRecipe()
  const recipeLimitExceeded = useRecipeLimitExceeded(recipes)

  useEffect(() => {
    if (!recipeLimitExceeded) {
      return
    }

    recipes
      .keySeq()
      .toArray()
      .filter((recipeId) => recipeId !== null)
      .forEach((recipeId) => {
        const recipeQuantity = recipes.get(recipeId)
        for (let x = 0; x < recipeQuantity; x++) {
          removeRecipeQuantity(recipeId)
        }
      })
  }, [recipes, removeRecipeQuantity, recipeLimitExceeded])
}
