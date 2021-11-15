import { actionTypes } from "actions/actionTypes"

export function menuLoadingError(message) {
  return {
    type: actionTypes.MENU_LOADING_ERROR,
    message,
  }
}
