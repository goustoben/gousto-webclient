import Immutable from 'immutable'
import { createSelector } from 'reselect'

import { isFeaturedRecipe, isRecipeInBasket, isRecipeInStock } from 'utils/menu'
import { getFilteredRecipes } from './filters'
import { getIsMenuRecommended } from './menu'
import { getCutoffDate, getPreviousCutoffDate } from './cutoff'
import { getStock, getRecieveMenuPending } from 'selectors/root'
import { getNumPortions, getBasketRecipes } from 'selectors/basket'

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
  [getFilteredRecipes, getInStockRecipes, getIsMenuRecommended, getRecieveMenuPending, getCutoffDate, getPreviousCutoffDate],
  (filteredRecipes, inStockRecipes, isMenuRecommended, recieveMenuPending, cutoffDate, previousCutoffDate) => {
    if (isMenuRecommended && inStockRecipes.includes(filteredRecipes.first())) {
      return Immutable.List([filteredRecipes.first()])
    } else if (!isMenuRecommended) {
      return filteredRecipes.filter(recipe => (
        isFeaturedRecipe(recipe, recieveMenuPending, cutoffDate, previousCutoffDate) && inStockRecipes.includes(recipe)
      ))
    }

    return Immutable.List([])
  }
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

export default {
  getFeaturedRecipes,
  getRemainingRecipes,
  getOutOfStockRecipes,
}
