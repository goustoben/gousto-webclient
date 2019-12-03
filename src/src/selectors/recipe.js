export const getRecipeTitle = recipe => recipe.get('title')

export const getRecipeURL = recipe => recipe.get('url')

export const getRecipeImages = recipe => recipe.getIn(['media', 'images', 0, 'urls'])

export const getDisclaimerForRecipeID = ({recipes}, recipeID) => {
  const recipeDetails = recipes.get(recipeID)

  if (!recipeDetails) {
    return null
  }

  const healthKitchenDetails = recipeDetails.get('healthKitchen')

  return healthKitchenDetails && healthKitchenDetails.get('disclaimer')
}

export const getMicronutrientsForRecipeID = ({recipes}, recipeID) => {
  const recipeDetails = recipes.get(recipeID)

  if (!recipeDetails) {
    return null
  }

  const healthKitchenDetails = recipeDetails.get('healthKitchen')

  return healthKitchenDetails && healthKitchenDetails.get('micronutrients')
}
