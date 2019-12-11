import config from 'config/menu'

export const isMenuRecommended = recipes => recipes.some(recipe => recipe.get('isRecommended') === true)

export function isRecommendedRecipe(recipeId, allRecipesList, recipesStore) {
  if (allRecipesList && isMenuRecommended(recipesStore)) {
    const top5Recipes = allRecipesList.slice(0, 5)

    return top5Recipes.indexOf(recipeId) > -1
  }

  return false
}

export const isRecipeInStock = (recipe, stock, numPortions) => {
  const recipeStock = stock.getIn([recipe.get('id'), String(numPortions)])

  return recipeStock > config.stockThreshold || recipeStock === null
}

export const isRecipeInBasket = (recipe, basketRecipes) => basketRecipes.has(recipe.get('id'))

export const getImage = (fileName) => require(`media/images/${fileName}`) // eslint-disable-line global-require

export const getScrollOffset = (threshold, animationThreshold, scrolledPastPoint) => {
  if (window.pageYOffset < threshold && scrolledPastPoint) {
    
    return ({
      scrolledPastPoint: false,
      scrollJumped: false
    })
  }
  if (window.pageYOffset >= threshold && !scrolledPastPoint) {
    
    return({
      scrolledPastPoint: true,
      scrollJumped: (window.pageYOffset - threshold) > animationThreshold,
    })
  }
}
