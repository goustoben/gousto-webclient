import { shouldUseReactRouter } from "actions/redirect/shouldUseReactRouter"
import { push } from "react-router-redux"
import { server } from "config/globals"
import { actionTypes } from "actions/actionTypes"
import * as windowUtils from "utils/window"

export const redirect = (url, clearCookies) => {
  let action

  if (shouldUseReactRouter()) {
    action = push(url)
  } else if (server) {
    action = {
      type: actionTypes.SERVER_REDIRECT,
      url,
      clearCookies,
    }
  } else {
    windowUtils.redirect(url)

    action = {
      type: actionTypes.VOID,
    }
  }

  return action
}
