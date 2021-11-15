import { actionTypes } from "actions/actionTypes"
import globals from "config/globals"
import { logoutRedirect } from "actions/login/logoutRedirect"

export const postLogoutSteps = () => (
  (dispatch) => {
    dispatch({type: actionTypes.BASKET_RESET})
    dispatch({type: actionTypes.USER_LOGGED_OUT}) // resets auth state
    if (globals.client) {
      dispatch(logoutRedirect())
    }
  }
)
