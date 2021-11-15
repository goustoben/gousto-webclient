import { validateEmail } from "utils/auth"
import { error } from "actions/status/error"
import { actionTypes } from "actions/actionTypes"

export const cannotLogin = ({email, password}) => (
  async (dispatch) => {
    let err
    if (!email) {
      err = 'Please enter an email address.'
    } else if (!password) {
      err = 'Please enter a password.'
    } else if (!validateEmail(email)) {
      err = 'The email address you\'ve entered is formatted incorrectly.'
    }
    if (err) {
      dispatch(error(actionTypes.USER_LOGIN, err))
      dispatch({type: actionTypes.LOGIN_FAILED})
    }
  }
)
