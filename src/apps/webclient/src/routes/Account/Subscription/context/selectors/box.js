import { createSelector } from 'reselect'

export const getBox = ({ box }) => (box || {})
export const getBoxPrices = ({ boxPrices }) => (boxPrices || {})

export const getSubscriptionSettingsUnsupported = createSelector(
  getBox,
  ({ subscriptionSettingsUnsupported }) => !!subscriptionSettingsUnsupported
)

export const getNumPortions = createSelector(
  getBox,
  ({ numPortions }) => numPortions
)

export const getSelectedBoxSize = createSelector(
  getBox,
  ({ boxSize }) => (boxSize || {}).currentValue
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

export const getNumRecipes = createSelector(
  getBox,
  ({ numRecipes }) => numRecipes
)

export const getBoxPricesNumPortion = createSelector(
  [getBoxPrices, getNumPortions],
  (boxPrices, numPortions) => (boxPrices || {})[numPortions]
)

export const getIsBoxPricesLoaded = createSelector(
  getBoxPrices,
  ({ requestState }) => Boolean((requestState || {}).isLoaded)
)

export const getPricePerPortionDiscounted = createSelector(
  getDietaryPreference,
  getMealsPerBox,
  getBoxPricesNumPortion,
  (dietaryPreference, mealPerBox, pricePerNumPortion) => (pricePerNumPortion ? pricePerNumPortion[mealPerBox][dietaryPreference].pricePerPortionDiscounted : null)
)

export const getTotalBoxPriceDiscounted = createSelector(
  getDietaryPreference,
  getMealsPerBox,
  getBoxPricesNumPortion,
  (dietaryPreference, mealPerBox, pricePerNumPortion) => (pricePerNumPortion ? pricePerNumPortion[mealPerBox][dietaryPreference].recipeTotalDiscounted : null)
)

export const getIsBoxAndPricesLoaded = createSelector(
  getIsBoxLoaded,
  getIsBoxPricesLoaded,
  (isBoxLoaded, isBoxPricesLoaded) => isBoxLoaded && isBoxPricesLoaded
)
