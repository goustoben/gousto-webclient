import { actionTypes } from '../../../actions/actionTypes'

export const setSidesModalRecipeId = (recipeId) => ({
  type: actionTypes.MENU_SET_SIDES_MODAL_RECIPE_ID,
  payload: {
    recipeId,
  }
})

export const clearSidesModalRecipeId = () => ({
  type: actionTypes.MENU_CLEAR_SIDES_MODAL_RECIPE_ID,
})
