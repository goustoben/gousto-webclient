import { actionTypes } from "actions/actionTypes"

export function menuReceiveMenuPending(pending) {
  return ({
    type: actionTypes.MENU_RECIPES_RECEIVE_PENDING,
    pending,
  })
}
