import Immutable from 'immutable'
import { createSelector } from 'reselect'

import { getNumPortions, getBasketRecipes } from 'selectors/basket'
import { isRecipeInBasket, isRecipeInStock } from 'utils/menu'
import { getStock } from 'selectors/root'

import { getFilteredRecipes } from './filters'

const getInStockRecipes = createSelector(
  [getFilteredRecipes, getStock, getBasketRecipes, getNumPortions],
  (filteredRecipes, stock, basketRecipes, numPortions) => (
    filteredRecipes
      .filter(recipe =>
        isRecipeInStock(recipe, stock, numPortions) ||
        isRecipeInBasket(recipe, basketRecipes)
      )
  )
)

export const getOutOfStockRecipes = createSelector(
  [getFilteredRecipes, getInStockRecipes],
  (filteredRecipes, inStockRecipes) => (
    filteredRecipes.filter(recipe => !inStockRecipes.includes(recipe))
  )
)

export const getFeaturedRecipes = createSelector(
  [getFilteredRecipes, getInStockRecipes],
  (filteredRecipes, inStockRecipes) => (
    (inStockRecipes.includes(filteredRecipes.first()))
      ? Immutable.List([filteredRecipes.first()])
      : Immutable.List([])
  )
)

export const getRemainingRecipes = createSelector(
  [getFilteredRecipes, getOutOfStockRecipes, getFeaturedRecipes],
  (filteredRecipes, outOfStockRecipes, featuredRecipes) => (
    filteredRecipes.filter(
      recipe => (
        !(outOfStockRecipes.includes(recipe) || featuredRecipes.includes(recipe))
      )
    )
  )
)

export const getSortedRecipes = createSelector(
  [getFeaturedRecipes, getOutOfStockRecipes, getRemainingRecipes],
  (featuredRecipes, outOfStockRecipes, remainingRecipes) => (
    featuredRecipes.concat(remainingRecipes).concat(outOfStockRecipes)
  )
)

export default {
  getFeaturedRecipes,
  getRemainingRecipes,
  getOutOfStockRecipes,
  getSortedRecipes
}
