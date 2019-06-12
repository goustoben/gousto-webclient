import { createSelector } from 'reselect'

import { getRecipes, getMenuRecipeIds } from 'selectors/root'
import { getFoodBrandFilter } from 'selectors/filters'
import { getFoodBrand } from 'utils/recipe'

const getCurrentMenuRecipes = createSelector(
  [getRecipes, getMenuRecipeIds],
  (allRecipes, currentMenuIds) => (
    currentMenuIds.map(recipeId => allRecipes.get(recipeId) || null)
      .filter(recipe => recipe !== null)
  )
)
    
export const getRecipesFilteredByFoodBrand = createSelector(
  [getCurrentMenuRecipes, getFoodBrandFilter],
  (currentMenuRecipes, selectedFoodBrand) => (
    currentMenuRecipes.filter(recipe => getFoodBrand(recipe).get('slug') === selectedFoodBrand)
  )   
)
