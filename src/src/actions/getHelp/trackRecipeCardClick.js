import { actionTypes } from "actions/actionTypes"

const trackRecipeCardClick = recipeId => ({
  type: actionTypes.TRACKING,
  trackingData: {
    actionType: 'GetHelpRecipeCard Clicked',
    recipeId,
  }
})
export { trackRecipeCardClick }
