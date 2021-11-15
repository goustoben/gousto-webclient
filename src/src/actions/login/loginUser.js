import { error } from "actions/status/error"
import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { authAuthenticate } from "actions/auth/authAuthenticate"
import { authIdentify } from "actions/auth/authIdentify"
import Immutable from "immutable"
import { authorise } from "actions/login/authorise"
import { authUserRememberMe } from "actions/auth/authUserRememberMe"
import { postLoginSteps } from "actions/login/postLoginSteps"
import { isAdmin } from "utils/auth"

export const loginUser = ({email, password, rememberMe, recaptchaToken = null}, orderId = '') => (
  async (dispatch, getState) => {
    dispatch(pending(actionTypes.USER_LOGIN, true))
    dispatch(error(actionTypes.USER_LOGIN, false))
    dispatch({type: actionTypes.LOGIN_ATTEMPT})
    try {
      if (rememberMe) {
        dispatch({type: actionTypes.LOGIN_REMEMBER_ME})
      }
      await dispatch(authAuthenticate(email, password, rememberMe, recaptchaToken))
      await dispatch(authIdentify())

      const userRoles = getState().auth.get('roles', Immutable.List([]))
      if (userRoles.size > 0 && authorise(userRoles)) {
        dispatch(authUserRememberMe(rememberMe))
        await postLoginSteps(isAdmin(userRoles), orderId, getState().features)(dispatch, getState)
      }
    } catch (err) {
      const errMsg = err.message ? err.message : 'Sorry, we were unable to log you in. Please contact customer care.'
      dispatch(error(actionTypes.USER_LOGIN, errMsg))
      dispatch({type: actionTypes.LOGIN_FAILED})
    }

    dispatch(pending(actionTypes.USER_LOGIN, false))
  }
)
