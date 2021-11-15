import { actionTypes } from "actions/actionTypes"

export const loginVisibilityChange = visibility => ({
  type: actionTypes.LOGIN_VISIBILITY_CHANGE,
  visibility,
})
