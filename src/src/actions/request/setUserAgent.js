import { actionTypes } from "actions/actionTypes"

export const setUserAgent = userAgent => ({
  type: actionTypes.BROWSER_SET_USER_AGENT,
  userAgent,
})
