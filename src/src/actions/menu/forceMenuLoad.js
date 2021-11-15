import { actionTypes } from "actions/actionTypes"

export const forceMenuLoad = (forceLoad) => ({
  type: actionTypes.MENU_FORCE_LOAD,
  forceLoad,
})
