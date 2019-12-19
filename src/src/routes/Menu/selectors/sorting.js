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

const sortRecipesByStock = (recipes, inStockRecipes) => {
  const { inStock, outOfStock } = recipes.reduce((acc, cur) => {
    if (inStockRecipes.includes(cur)) {
      return {
        outOfStock: acc.outOfStock,
        inStock: acc.inStock.push(cur)
      }
    }

    return {
      outOfStock: acc.outOfStock.push(cur),
      inStock: acc.inStock
    }
  }, { outOfStock: Immutable.List(), inStock: Immutable.List() })

  return inStock.concat(outOfStock)
}

export const getRecipes = createSelector(
  [getFilteredRecipes, getInStockRecipes],
  (filteredRecipes, inStockRecipes) => sortRecipesByStock(filteredRecipes, inStockRecipes)
)
