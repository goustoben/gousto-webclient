export const getRecipeTitle = recipe => recipe.get('title')

export const getRecipeURL = recipe => recipe.get('url')

export const getRecipeID = recipe => recipe.get('id')

export const getRecipeImages = recipe => recipe.getIn(['media', 'images', 0, 'urls'])

export const getMicronutrientsForRecipeID = ({ recipes }, recipeID) => {
  const recipeDetails = recipes.get(recipeID)

  if (!recipeDetails) {
    return null
  }

  const nutritionalInformation = recipeDetails.get('nutritionalInformation')

  return nutritionalInformation && nutritionalInformation.get('micronutrients')
}

export const getRecipeById = ({ recipes }, recipeId) => recipes.get(recipeId, null)
