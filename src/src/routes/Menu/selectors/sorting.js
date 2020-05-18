import { createSelector } from 'reselect'

import { getStock, getMenuRecipes as getMenuCollectionRecipes } from 'selectors/root'
import { getNumPortions, getBasketRecipes } from 'selectors/basket'
import { isRecipeInBasket, isRecipeInStock } from 'utils/menu'
import { getRecipeId } from 'utils/recipe'
import { getRecommendationsCollection, getCollectionId, getCurrentCollectionId } from './collections'
import { getCurrentMenuRecipes } from './menu'
import { getSelectedRecipeVariants } from './variants'

export const getInStockRecipes = createSelector(
  [getCurrentMenuRecipes, getStock, getBasketRecipes, getNumPortions],
  (recipes, stock, basketRecipes, numPortions) => (
    recipes.filter(recipe => isRecipeInStock(recipe, stock, numPortions) || isRecipeInBasket(recipe, basketRecipes))
  )
)

const SORT_A_FIRST = -1
const SORT_B_FIRST = 1
export const getSortFn = createSelector(
  [getInStockRecipes],
  (inStockRecipes) => (
    (a, b) => {
      const aInStock = inStockRecipes.includes(a)
      const bInStock = inStockRecipes.includes(b)

      if (aInStock) {
        return SORT_A_FIRST
      }

      if (bInStock) {
        return SORT_B_FIRST
      }

      return SORT_A_FIRST
    }
  )
)

const getCollectionIdFromProps = (state, props) => {
  if (!props) {
    return null
  }

  return props.collectionId || null
}

const getCollectionIdForFiltering = createSelector(
  [getCurrentCollectionId, getCollectionIdFromProps],
  (currentCollectionId, propsCollectionId) => (propsCollectionId || currentCollectionId)
)

export const getFilterFn = createSelector(
  [getCollectionIdForFiltering, getRecommendationsCollection, getInStockRecipes],
  (collectionId, recommendations, inStockRecipes) => {
    const isRecommendationCollection = (recommendations && collectionId === getCollectionId(recommendations))

    if (!isRecommendationCollection) {
      return null
    }

    return (recipe) => inStockRecipes.includes(recipe)
  }
)

const createRecipesResponse = (recipes, filterFn, sortFn) => {
  // only filter if there is a filter function provided
  const filtered = filterFn ? recipes.filter(({ recipe }) => filterFn(recipe)) : recipes

  const recipeIds = filtered.map(({ recipe }) => getRecipeId(recipe))

  const sorted = filtered.sort(({ recipe: recipeA }, { recipe: recipeB }) => sortFn(recipeA, recipeB))

  return {
    recipeIds,
    recipes: sorted
  }
}

const getSelectedVariantId = (selectedVariants, collectionId, recipeId) => {
  if (!selectedVariants || !selectedVariants[collectionId] || !selectedVariants[collectionId][recipeId]) {
    return null
  }

  return selectedVariants[collectionId][recipeId]
}

// an object to store a recipe, and the original ID that recipe relates to
// e.g. if 'Fish Curry' is selected as a variant of 'Chicken Curry', 'Chicken Curry' is the originalId
const createRecipeView = (originalId, recipe) => ({ originalId, recipe })

// sometimes we don't need to consider replacements
const createStandardRecipeView = (recipe) => ({ originalId: recipe.get('id'), recipe })

export const getRecipeListRecipes = createSelector(
  [getCurrentMenuRecipes, getMenuCollectionRecipes, getSelectedRecipeVariants, getCollectionIdForFiltering, getFilterFn, getSortFn],
  (currentMenuRecipes, collectionRecipes, selectedVariants, collectionId, filterFn, sortFn) => {
    if (!collectionId) {
      // return all recipes on menu
      return createRecipesResponse(currentMenuRecipes.map(createStandardRecipeView), filterFn, sortFn)
    }

    const recipeIdsInCollection = collectionRecipes.get(collectionId)

    if (!recipeIdsInCollection) {
      // return all recipes on menu
      return createRecipesResponse(currentMenuRecipes.map(createStandardRecipeView), filterFn, sortFn)
    }

    const findRecipe = (recipeId) => {
      const selectedVariantId = getSelectedVariantId(selectedVariants, collectionId, recipeId)

      const searchId = selectedVariantId === null ? recipeId : selectedVariantId

      return createRecipeView(recipeId, currentMenuRecipes.find(recipe => getRecipeId(recipe) === searchId))
    }
    const recipesInCollection = recipeIdsInCollection.map(findRecipe).filter(result => result.recipe !== undefined)

    return createRecipesResponse(recipesInCollection, filterFn, sortFn)
  }
)
