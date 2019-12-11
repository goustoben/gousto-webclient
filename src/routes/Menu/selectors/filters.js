//This file is for Quick Filters and Collection filters only - should change file name eventually

import Immutable from 'immutable'
import { createSelector } from 'reselect'

import { getRecipes, getMenuRecipes, getMenuCollections } from 'selectors/root'
import { getCurrentCollectionId } from 'selectors/filters'
import { getRecipesFilteredByFoodBrand, getRecipesFilteredByCollectionSlug } from './recipeGroupFilters'

export const getAllRecipesCollectionId = createSelector(
  [getMenuCollections],
  (menuCollections) => (
    menuCollections.find(
      collection => collection.get('default') === true,
      null,
      Immutable.Map({})
    ).get('id')
  )
)

const getRecipesFilteredByCollection = createSelector(
  [getRecipes, getMenuRecipes, getCurrentCollectionId, getAllRecipesCollectionId],
  (allRecipes, menuRecipes, currentCollectionId, allRecipesId) => (
    menuRecipes.get((currentCollectionId || allRecipesId), Immutable.List([]))
      .filter(recipeId => allRecipes.has(recipeId))
      .map(recipeId => allRecipes.get(recipeId))
  )
)

export const getFilteredFoodBrandRecipes = createSelector(
  [getRecipesFilteredByCollection, getRecipesFilteredByFoodBrand],
  (filteredRecipes, foodBrandRecipes) => (
    foodBrandRecipes || filteredRecipes
  )
)

export const getFilteredRecipesByCollectionsBySlug = createSelector(
  [getFilteredFoodBrandRecipes, getRecipesFilteredByCollectionSlug],
  (filteredFoodBrandRecipes, filteredCollectionRecipes) => {

    return filteredCollectionRecipes || filteredFoodBrandRecipes
  }
)

export const getFilteredRecipes = createSelector(
  [getFilteredRecipesByCollectionsBySlug],
  (filteredRecipes) => (
    filteredRecipes
  )
)

export const getFilteredRecipeIds = createSelector(
  [getFilteredRecipes],
  (filteredRecipes) => (
    filteredRecipes
      .map(recipe => recipe.get('id'))
  )
)

export default {
  getFilteredRecipeIds,
  getFilteredRecipes,
}
