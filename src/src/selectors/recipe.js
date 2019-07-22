export const getRecipeTitle = recipe => recipe.get('title')

export const getRecipeURL = recipe => recipe.get('url')

export const getRecipeImages = recipe => recipe.getIn(['media', 'images', 1, 'urls'])
