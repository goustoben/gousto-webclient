import Immutable from 'immutable'
import { createSelector } from 'reselect'

import { getStock, getMenuRecipes as getMenuCollectionRecipes } from 'selectors/root'
import { getNumPortions, getBasketRecipes } from 'selectors/basket'
import { isRecipeInBasket, isRecipeInStock } from 'utils/menu'
import { getRecipeId } from 'utils/recipe'
import { getRecommendationsCollection, getCollectionId } from './collections'
import { getCurrentMenuRecipesWithVariantsReplaced } from './variants'
import { getCurrentMenuRecipes } from './menu'

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

const createSortedRecipesResponse = (recipes, inStockRecipes, filterOutOfStock) => {
  if (filterOutOfStock) {
    const filteredRecipes = recipes.filter(recipe => inStockRecipes.includes(recipe))

    return {
      recipeIds: filteredRecipes.map(getRecipeId),
      recipes: filteredRecipes
    }
  }

  const recipeIds = recipes.map(getRecipeId)
  const sortedRecipes = sortRecipesByStock(recipes, inStockRecipes)

  return {
    recipeIds,
    recipes: sortedRecipes
  }
}

export const getInStockRecipes = createSelector(
  [getCurrentMenuRecipes, getStock, getBasketRecipes, getNumPortions],
  (recipes, stock, basketRecipes, numPortions) => (
    recipes.filter(recipe => isRecipeInStock(recipe, stock, numPortions) || isRecipeInBasket(recipe, basketRecipes))
  )
)

export const getSortedRecipes = createSelector(
  [getMenuCollectionRecipes, getCurrentMenuRecipes, getInStockRecipes, getRecommendationsCollection, getCurrentMenuRecipesWithVariantsReplaced],
  (menuCollectionRecipes, allRecipes, inStockRecipes, recommendations, getCurrentMenuRecipesReplacedByVariantsFunc) => (collectionId) => {
    if (!collectionId) {
      return createSortedRecipesResponse(allRecipes, inStockRecipes, false)
    }

    const recipesInCollection = menuCollectionRecipes.get(collectionId)

    if (!recipesInCollection) {
      return createSortedRecipesResponse(allRecipes, inStockRecipes, false)
    }

    const getRecipeDetailsById = (recipeId) => allRecipes.find(recipe => getRecipeId(recipe) === recipeId)
    const recipeInCollectionsReplacesByVariant = getCurrentMenuRecipesReplacedByVariantsFunc(recipesInCollection)
    // recipesInCollection is in recommended order whilst allRecipes is the default order of the menu
    const filtered = recipeInCollectionsReplacesByVariant.map(getRecipeDetailsById).filter(recipe => recipe !== undefined)

    const isRecommendationCollection = (recommendations && collectionId === getCollectionId(recommendations))

    return createSortedRecipesResponse(filtered, inStockRecipes, isRecommendationCollection)
  }
)
