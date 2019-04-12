import Immutable from 'immutable'
import { createSelector } from 'reselect'

import { getRecipes, getMenuRecipes, getMenuCollections } from 'selectors/root'
import { getCurrentCollectionId, getCurrentDietTypes, getCurrentTotalTime, getDietaryAttributes } from 'selectors/filters'
import { getNumPortions } from 'selectors/basket'
import { getTaxonomyTags } from 'utils/recipe'

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

const getRecipesByDietType = createSelector(
  [getRecipesFilteredByCollection, getCurrentDietTypes],
  (recipesFiltered, currentDietTypes) => (currentDietTypes.size
    ?
    recipesFiltered.filter(recipe => currentDietTypes.has(recipe.get('dietType').toLowerCase()))
    :
    recipesFiltered)
)

const getRecipesFilteredByDietaryAttributes = createSelector(
  [getRecipesByDietType, getDietaryAttributes],
  (recipesFiltered, dietaryAttributes) => (
    (dietaryAttributes.size)
      ? recipesFiltered.filter(recipe => {
        const tagSlugs = getTaxonomyTags(recipe, 'dietary-attributes').map(tag => tag.get('slug', '').toLowerCase())

        return (tagSlugs.size) ? dietaryAttributes.every(attribute => tagSlugs.includes(attribute)) : false
      })
      : recipesFiltered
  )
)

export const getRecipesByTotalTime = createSelector(
  [getRecipesFilteredByDietaryAttributes, getNumPortions, getCurrentTotalTime],
  (recipesFiltered, numPortions, currentTotalTime) => (
    (currentTotalTime !== '0')
      ?
      recipesFiltered.filter(recipe => (
        ((numPortions === 2 && parseInt(recipe.get('cookingTime'), 10) <= parseInt(currentTotalTime, 10)))
      ||
      (numPortions === 4 && parseInt(recipe.get('cookingTimeFamily'), 10) <= parseInt(currentTotalTime, 10))
      && recipe))
      :
      recipesFiltered
  )
)

export const getFilteredRecipes = createSelector(
  [getRecipesByTotalTime],
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
