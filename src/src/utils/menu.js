import config from 'config/menu'

export const isMenuRecommended = recipes => recipes.some(recipe => recipe.get('isRecommended') === true)

export function isRecommendedRecipe(recipeId, allRecipesList, recipesStore) {
  if (allRecipesList && isMenuRecommended(recipesStore)) {
    const top5Recipes = allRecipesList.slice(0, 5)

    return top5Recipes.indexOf(recipeId) > -1
  }

  return false
}

export const isFeaturedRecipe = (recipe, menuRecieveMenuPending, cutoffDate, prevCutoffDate) => {
  let dateNow
  if (!menuRecieveMenuPending) {
    dateNow = new Date(cutoffDate)
  } else {
    dateNow = new Date(prevCutoffDate)
  }
  const isFeatured = recipe.get('availability').filter((entry) => {
    const dateFrom = new Date(entry.get('from'))
    const dateUntil = new Date(entry.get('until'))

    return entry.get('featured') && (dateNow <= dateUntil) && (dateNow >= dateFrom)
  }).size > 0

  return isFeatured
}

export const isRecipeInStock = (recipe, stock, numPortions) => {
  const recipeStock = stock.getIn([recipe.get('id'), String(numPortions)])

  return recipeStock > config.stockThreshold || recipeStock === null
}

export const isRecipeInBasket = (recipe, basketRecipes) => basketRecipes.has(recipe.get('id'))
