import { set } from "utils/cookieHelper2"
import Cookies from "utils/GoustoCookies"
import config from "config/cookies"
import { actionTypes } from "actions/actionTypes"

function cookiePolicyAcceptanceChange(isAccepted) {
  return dispatch => {
    if (__CLIENT__) {
      set(Cookies, 'cookie_policy_v2', {isAccepted}, config.cookiePolicyAcceptanceExpireTime)
    }

    dispatch({
      type: actionTypes.COOKIE_POLICY_ACCEPTANCE_CHANGE,
      isAccepted,
    })
  }
}

export { cookiePolicyAcceptanceChange }
