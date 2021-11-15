import { actionTypes } from 'actions/actionTypes'
import logger from 'utils/logger'
import { passwordRules } from 'config/checkout'
import { validateUserPassword } from "apis/auth/validateUserPassword"

export function validatePassword(password) {
  return async (dispatch) => {
    if (password) {
      try {
        await validateUserPassword(password, 2)

        dispatch({type: actionTypes.CHECKOUT_PASSWORD_VALIDATION_RULES_SET, password, errors: []})
      } catch (err) {
        dispatch({
          type: actionTypes.CHECKOUT_PASSWORD_VALIDATION_RULES_SET,
          errors: err.errors,
          password,
        })
        logger.error({message: err.message, errors: err})
      }
    } else {
      dispatch({
        type: actionTypes.CHECKOUT_PASSWORD_VALIDATION_RULES_SET,
        errors: passwordRules,
        password,
      })
    }
  }
}
