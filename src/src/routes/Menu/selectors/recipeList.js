import { createSelector } from 'reselect'

import { getStock, getMenuRecipes as getMenuCollectionRecipes } from 'selectors/root'
import { getNumPortions, getBasketRecipes } from 'selectors/basket'
import { isRecipeInBasket, isRecipeInStock } from 'utils/menu'
import { getRecipeId } from 'utils/recipe'
import { getRecommendationsCollection, getCollectionId, getCurrentCollectionId } from './collections'
import { getCurrentMenuRecipes } from './menu'
import { getSelectedRecipeVariants, getCurrentMenuVariants } from './variants'

export const getInStockRecipes = createSelector(
  [getCurrentMenuRecipes, getStock, getBasketRecipes, getNumPortions],
  (recipes, stock, basketRecipes, numPortions) => (
    recipes.filter(recipe => isRecipeInStock(recipe, stock, numPortions) || isRecipeInBasket(recipe, basketRecipes))
  )
)

const SORT_A_FIRST = -1
const SORT_B_FIRST = 1
export const getRecipeComparatorFactory = createSelector(
  [getInStockRecipes],
  (inStockRecipes) => (
    (originalOrderedRecipes) => (
      (a, b) => {
        const aInStock = inStockRecipes.includes(a)
        const bInStock = inStockRecipes.includes(b)

        if (aInStock && !bInStock) {
          return SORT_A_FIRST
        }

        if (bInStock && !aInStock) {
          return SORT_B_FIRST
        }

        const aIndex = originalOrderedRecipes.indexOf(a)
        const bIndex = originalOrderedRecipes.indexOf(b)

        /* this shouldn't happen, safety catch */
        if (aIndex === -1) {
          return SORT_B_FIRST
        }

        if (bIndex === -1) {
          return SORT_A_FIRST
        }
        /* end of safety catch */

        if (aIndex < bIndex) {
          return SORT_A_FIRST
        }

        if (bIndex < aIndex) {
          return SORT_B_FIRST
        }

        return SORT_A_FIRST
      }
    )
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

// an object to store a recipe, and the original ID that recipe relates to
// e.g. if 'Fish Curry' is selected as a variant of 'Chicken Curry', 'Chicken Curry' is the originalId
const createRecipeView = (originalId, recipe) => ({ originalId, recipe })

// sometimes we don't need to consider replacements
const createStandardRecipeView = (recipe) => ({ originalId: recipe.get('id'), recipe })

const replaceRecipes = (recipeIds, recipeViews, replacements) => {
  // for each recipe ID, if there is a replacement, substitute that id
  const newRecipeIds = recipeIds.map(originalId => (replacements[originalId] ? getRecipeId(replacements[originalId]) : originalId))

  const newRecipeViews = recipeViews.map(originalView => {
    const originalId = getRecipeId(originalView.recipe)

    const replacement = replacements[originalId]

    if (replacement) {
      return createRecipeView(originalId, replacement)
    }

    return originalView
  })

  return {
    recipeIds: newRecipeIds,
    recipes: newRecipeViews
  }
}

const createRecipesResponse = (recipeViews, filterFn, recipeComparatorFactory, replacements) => {
  // only filter if there is a filter function provided
  const filteredViews = filterFn ? recipeViews.filter(({ recipe }) => filterFn(recipe)) : recipeViews

  const originalOrderRecipeIds = filteredViews.map(({ recipe }) => getRecipeId(recipe))

  const compare = recipeComparatorFactory(filteredViews.map(({ recipe }) => recipe))
  const sortedViews = filteredViews.sort(({ recipe: recipeA }, { recipe: recipeB }) => compare(recipeA, recipeB))

  if (replacements) {
    const {
      recipeIds: replacedRecipeIds,
      recipes: replacedRecipes
    } = replaceRecipes(originalOrderRecipeIds, sortedViews, replacements)

    return {
      originalOrderRecipeIds: replacedRecipeIds,
      recipes: replacedRecipes
    }
  }

  return {
    originalOrderRecipeIds,
    recipes: sortedViews
  }
}

const getSelectedVariantId = (selectedVariants, collectionId, recipeId) => {
  if (!selectedVariants || !selectedVariants[collectionId] || !selectedVariants[collectionId][recipeId]) {
    return null
  }

  return selectedVariants[collectionId][recipeId]
}

const getVariantsForRecipe = (variants, recipeId) => {
  if (!variants) {
    return null
  }

  const recipeVariants = variants.get(recipeId)

  if (!recipeVariants) {
    return null
  }

  const alternatives = recipeVariants.get('alternatives')

  if (!alternatives || !alternatives.size) {
    return null
  }

  return alternatives
}

const getInStockVariantRecipe = (variants, menuRecipes, inStockRecipes) => {
  const inStockVariant = variants.find(variant => {
    const coreRecipeId = variant.get('coreRecipeId')

    const variantRecipe = menuRecipes.find(r => getRecipeId(r) === coreRecipeId)

    return inStockRecipes.includes(variantRecipe)
  })

  // if there is no in stock variant then just use the original recipe
  if (!inStockVariant) {
    return null
  }

  const coreRecipeId = inStockVariant.get('coreRecipeId')

  const variantRecipe = menuRecipes.find(r => getRecipeId(r) === coreRecipeId)

  return variantRecipe
}

const getRecipesForIds = (recipeList, ids) => (
  ids.map(recipeId => {
    const recipe = recipeList.find(r => getRecipeId(r) === recipeId)

    if (!recipe) {
      return null
    }

    return recipe
  }).filter(recipe => recipe !== null)
)

// take in recipes and return RecipeViews with out-of-stock recipes replaced with in-stock variants, where possible
const replaceOutOfStockWithVariants = (recipes, currentMenuRecipes, inStockRecipes, selectedVariants, currentMenuVariants, collectionId) => (
  recipes.map(recipe => {
    // if recipe is in stock then just use it
    if (inStockRecipes.includes(recipe)) {
      return createStandardRecipeView(recipe)
    }

    const recipeId = getRecipeId(recipe)

    // if there is a variant selected for this recipe, don't do any further substitutions yet
    const selectedVariantId = getSelectedVariantId(selectedVariants, collectionId, recipeId)
    if (selectedVariantId) {
      return createStandardRecipeView(recipe)
    }

    // if there are no variants then just use the original recipe
    const recipeVariants = getVariantsForRecipe(currentMenuVariants, recipeId)
    if (recipeVariants === null) {
      return createStandardRecipeView(recipe)
    }

    const inStockVariant = getInStockVariantRecipe(recipeVariants, currentMenuRecipes, inStockRecipes)

    // if there is no in stock variant then just use the original recipe
    if (!inStockVariant) {
      return createStandardRecipeView(recipe)
    }

    // by using recipeId as original, this is effectively pre-selecting the in stock variant
    return createRecipeView(recipeId, inStockVariant)
  })
)

const getReplacements = (recipeList, recipeIds, getVariantFn) => (
  recipeIds.reduce((acc, recipeId) => {
    const selectedVariantId = getVariantFn(recipeId)

    if (!selectedVariantId) {
      return acc
    }

    const replacement = recipeList.find(r => getRecipeId(r) === selectedVariantId)

    return {
      ...acc,
      [recipeId]: replacement
    }
  }, {})
)

export const getRecipeListRecipes = createSelector(
  [getCurrentMenuRecipes, getMenuCollectionRecipes, getInStockRecipes, getCurrentMenuVariants, getSelectedRecipeVariants, getCollectionIdForFiltering, getFilterFn, getRecipeComparatorFactory],
  (currentMenuRecipes, collectionRecipes, inStockRecipes, currentMenuVariants, selectedVariants, collectionId, filterFn, recipeComparatorFactory) => {
    if (!collectionId) {
      // return all recipes on menu
      return createRecipesResponse(currentMenuRecipes.map(createStandardRecipeView), filterFn, recipeComparatorFactory)
    }

    const recipeIdsInCollection = collectionRecipes.get(collectionId)

    if (!recipeIdsInCollection) {
      // return all recipes on menu
      return createRecipesResponse(currentMenuRecipes.map(createStandardRecipeView), filterFn, recipeComparatorFactory)
    }

    const recipesInCollection = getRecipesForIds(currentMenuRecipes, recipeIdsInCollection)

    const recipesWithOutOfStockReplaced = replaceOutOfStockWithVariants(
      recipesInCollection,
      currentMenuRecipes,
      inStockRecipes,
      selectedVariants,
      currentMenuVariants,
      collectionId
    )

    const replacements = getReplacements(
      currentMenuRecipes,
      recipeIdsInCollection,
      recipeId => getSelectedVariantId(selectedVariants, collectionId, recipeId)
    )

    return createRecipesResponse(recipesWithOutOfStockReplaced, filterFn, recipeComparatorFactory, replacements)
  }
)

