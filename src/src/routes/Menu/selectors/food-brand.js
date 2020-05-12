import { createSelector } from 'reselect'
import { getFoodBrand } from 'utils/recipe'
import { getInStockRecipes, sortRecipesByStock } from './sorting'
import { getCurrentMenuRecipes } from './menu'

export const getFoodBrandForSlug = createSelector(
  [getCurrentMenuRecipes, getInStockRecipes],
  (recipes, inStockRecipes) => slug => {
    const matchingRecipes = recipes.filter(recipe => getFoodBrand(recipe).get('slug') === slug).toList()

    if (matchingRecipes.size === 0) {
      return null
    }

    // get food brand details from the first matching recipe
    const firstRecipe = matchingRecipes.get(0)

    const recipeIds = matchingRecipes.map(r => r.get('id'))
    const sortedRecipes = sortRecipesByStock(matchingRecipes, inStockRecipes)

    return {
      foodBrand: getFoodBrand(firstRecipe),
      recipes: sortedRecipes,
      recipeIds
    }
  }
)
