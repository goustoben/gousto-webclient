import { createSelector } from 'reselect'

import { getRecipes, getMenuRecipeIds, getMenuCollections, getMenuRecipes } from 'selectors/root'
import { getRecipeGroupFilter } from 'selectors/filters'
import { getMenuCollectionRecipeIds } from 'selectors/collections'
import { getFoodBrand } from 'utils/recipe'

export const getCurrentMenuRecipes = createSelector(
  [getRecipes, getMenuRecipeIds],
  (allRecipes, currentMenuIds) => (
    currentMenuIds && currentMenuIds.map(recipeId => allRecipes.get(recipeId) || null)
      .filter(recipe => recipe !== null)
  )
)

export const getRecipesFilteredByFoodBrand = createSelector(
  [getCurrentMenuRecipes, getRecipeGroupFilter],
  (currentMenuRecipes, selectedRecipeGroup) => (
    selectedRecipeGroup ? currentMenuRecipes.filter(recipe => getFoodBrand(recipe).get('slug') === selectedRecipeGroup.slug) : null
  )
)

export const getRecipesFilteredByCollectionSlug = createSelector(
  [getCurrentMenuRecipes, getRecipeGroupFilter, getMenuCollections, getMenuRecipes],
  (currentMenuRecipes, selectedRecipeGroup, menuCollections, allMenuCollectionRecipes) => {
    const recipeGroupSlug = selectedRecipeGroup && selectedRecipeGroup.slug
    const currentCollectionRecipes = getMenuCollectionRecipeIds(menuCollections , allMenuCollectionRecipes, recipeGroupSlug)
    const recipesFilteredByThematic = recipeGroupSlug && !!currentCollectionRecipes ? currentMenuRecipes.filter(recipe => currentCollectionRecipes.includes(recipe.get('id'))) : null

    return recipesFilteredByThematic
  }
)
