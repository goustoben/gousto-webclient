import { createSelector } from 'reselect'

export const getBox = ({ box }) => (box || {})

export const getNumPortions = createSelector(
  getBox,
  ({ numPortions }) => numPortions
)

export const getNumRecipes = createSelector(
  getBox,
  ({ numRecipes }) => numRecipes
)

export const getDietaryPreference = createSelector(
  getBox,
  ({ dietaryPreference }) => (dietaryPreference || {}).currentValue
)
