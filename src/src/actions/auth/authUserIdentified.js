import { actionTypes } from "actions/actionTypes"

export const authUserIdentified = user => ({
  type: actionTypes.USER_IDENTIFIED,
  user,
})
