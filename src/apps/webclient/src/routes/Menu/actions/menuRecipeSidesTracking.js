import { actionTypes } from '../../../actions/actionTypes'

export const trackAddSide = (recipeId, variantRecipeId) => ({
  type: actionTypes.TRACKING,
  trackingData: {
    actionType: 'add_side',
    recipe_id: recipeId,
    variant_recipe_id: variantRecipeId
  }
})

export const trackNoSide = (recipeId) => ({
  type: actionTypes.TRACKING,
  trackingData: {
    actionType: 'no_side',
    recipe_id: recipeId,
  }
})

export const trackCloseSide = (recipeId) => ({
  type: actionTypes.TRACKING,
  trackingData: {
    actionType: 'close_side',
    recipe_id: recipeId,
  }
})

export const trackSelectSide = (recipeId, variantRecipeId, screenName) => ({
  type: actionTypes.TRACKING,
  trackingData: {
    actionType: 'select_side',
    recipe_id: recipeId,
    variant_recipe_id: variantRecipeId,
    screen_name: screenName
  }
})

export const trackDeselectSide = (recipeId, variantRecipeId, screenName) => ({
  type: actionTypes.TRACKING,
  trackingData: {
    actionType: 'deselect_side',
    recipe_id: recipeId,
    variant_recipe_id: variantRecipeId,
    screen_name: screenName
  }
})
