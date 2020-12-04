import { createSelector } from 'reselect'

export const getBox = ({ box }) => (box || {})
export const getBoxPrices = ({ boxPrices }) => (boxPrices || {})

export const getNumPortions = createSelector(
  getBox,
  ({ numPortions }) => numPortions
)

export const getDietaryPreference = createSelector(
  getBox,
  ({ dietaryPreference }) => (dietaryPreference || {}).currentValue
)

export const getIsBoxLoaded = createSelector(
  getBox,
  ({ requestState }) => Boolean((requestState || {}).isLoaded)
)

export const getMealsPerBox = createSelector(
  getBox,
  ({ mealsPerBox }) => (mealsPerBox || {}).currentValue
)

export const getBoxPricesNumPortion = createSelector(
  [getBoxPrices, getNumPortions],
  (boxPrices, numPortions) => (boxPrices || {})[numPortions]
)

export const getIsBoxPricesLoaded = createSelector(
  getBoxPrices,
  ({ requestState }) => Boolean((requestState || {}).isLoaded)
)
