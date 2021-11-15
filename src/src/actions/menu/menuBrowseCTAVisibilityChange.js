import { actionTypes } from "actions/actionTypes"

export function menuBrowseCTAVisibilityChange(show) {
  return {
    type: actionTypes.MENU_BROWSE_CTA_VISIBILITY_CHANGE,
    show,
  }
}
