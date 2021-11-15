import { actionTypes } from "actions/actionTypes"

export const menuLoadComplete = (timeToLoadMs, useMenuService) => ({
  type: actionTypes.MENU_LOAD_COMPLETE,
  timeToLoadMs,
  useMenuService
})
