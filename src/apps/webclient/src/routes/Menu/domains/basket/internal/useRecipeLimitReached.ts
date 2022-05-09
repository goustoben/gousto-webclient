import { Map } from 'immutable'
import { useRecipeLimit } from './useRecipeLimit'

export const sumQuantities = (recipes: Map<string, number>) =>
  recipes.reduce((total = 0, current = 0) => total + current, 0)

export const useRecipeLimitReached = (recipes: Map<string, number>): boolean => {
  const maxRecipesAllowed = useRecipeLimit()

  return sumQuantities(recipes) >= maxRecipesAllowed
}
