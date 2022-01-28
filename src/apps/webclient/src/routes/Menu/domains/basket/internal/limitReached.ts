import { Map } from 'immutable'
export const USER_RECIPE_LIMIT = 4

export const sumQuantities = (recipes: Map<string, number>) =>
  recipes.reduce((total = 0, current = 0) => total + current, 0)

export const limitReached = (recipes: Map<string, number>) =>
  sumQuantities(recipes) >= USER_RECIPE_LIMIT
