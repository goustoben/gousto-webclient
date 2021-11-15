import { actionTypes } from "actions/actionTypes"

export const authUserRememberMe = rememberMe => ({
  type: actionTypes.USER_REMEMBER_ME,
  rememberMe,
})
