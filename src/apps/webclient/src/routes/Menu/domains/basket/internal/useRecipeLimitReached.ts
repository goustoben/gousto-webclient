import { Map } from 'immutable'

import { useNumPortions } from 'routes/Menu/domains/basket/internal/useNumPortions'

import { useSupportedBoxTypes } from './useSupportedBoxTypes'

export const sumQuantities = (recipes: Map<string, number>) =>
  recipes.reduce((total = 0, current = 0) => total + current, 0)

export const useRecipeLimitReached = (recipes: Map<string, number>): boolean => {
  const { maxRecipesForPortion } = useSupportedBoxTypes()
  const { numPortions } = useNumPortions()

  return sumQuantities(recipes) >= maxRecipesForPortion(numPortions)
}
