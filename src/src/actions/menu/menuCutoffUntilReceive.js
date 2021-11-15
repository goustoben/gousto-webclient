import { actionTypes } from "actions/actionTypes"

export function menuCutoffUntilReceive(cutoffUntil) {
  return {
    type: actionTypes.MENU_CUTOFF_UNTIL_RECEIVE,
    cutoffUntil,
  }
}
