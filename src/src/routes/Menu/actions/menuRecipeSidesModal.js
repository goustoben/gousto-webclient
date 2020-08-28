import { actionTypes } from '../../../actions/actionTypes'

export const setSidesModalRecipe = (data) => ({
  type: actionTypes.MENU_SET_SIDES_MODAL_RECIPE,
  payload: {
    data,
  }
})

export const clearSidesModalRecipe = () => ({
  type: actionTypes.MENU_CLEAR_SIDES_MODAL_RECIPE,
})
