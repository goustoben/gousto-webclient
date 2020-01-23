import Immutable from 'immutable'
import { createSelector } from 'reselect'

import { getRecipes, getMenuRecipeIds, getStock, getMenuRecipes as getMenuCollectionRecipes } from 'selectors/root'
import { getNumPortions, getBasketRecipes } from 'selectors/basket'
import { isRecipeInBasket, isRecipeInStock } from 'utils/menu'

const getRecipeId = (recipe) => recipe.get('id')

const createSortedRecipesResponse = (recipes, inStockRecipes) => {
  const recipeIds = recipes.map(getRecipeId)
  const sortedRecipes = sortRecipesByStock(recipes, inStockRecipes)

  return {
    recipeIds,
    recipes: sortedRecipes
  }
}

export const getCurrentMenuRecipes = createSelector(
  [getRecipes, getMenuRecipeIds],
  (allRecipes, currentMenuIds) => (
    currentMenuIds && currentMenuIds.map(recipeId => allRecipes.get(recipeId) || null)
      .filter(recipe => recipe !== null)
  )
)

export const getInStockRecipes = createSelector(
  [getCurrentMenuRecipes, getStock, getBasketRecipes, getNumPortions],
  (recipes, stock, basketRecipes, numPortions) => (
    recipes.filter(recipe => isRecipeInStock(recipe, stock, numPortions) || isRecipeInBasket(recipe, basketRecipes))
  )
)

export const sortRecipesByStock = (recipes, inStockRecipes) => {
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

export const getSortedRecipes = createSelector(
  [getMenuCollectionRecipes, getCurrentMenuRecipes, getInStockRecipes],
  (menuCollectionRecipes, allRecipes, inStockRecipes) => {
    return (collectionId) => {
      if (!collectionId) {
        return createSortedRecipesResponse(allRecipes, inStockRecipes)
      }

      const recipesInCollection = menuCollectionRecipes.get(collectionId)
      if (!recipesInCollection) {
        return createSortedRecipesResponse(allRecipes, inStockRecipes)
      }

      const recipeIsInCollection = (recipe) => {
        const id = getRecipeId(recipe)

        if (!id) {
          return false
        }

        return recipesInCollection.includes(id)
      }

      const filtered = allRecipes.filter(recipeIsInCollection)

      return createSortedRecipesResponse(filtered, inStockRecipes)
    }
  }
)
