import logger from 'utils/logger'
import { actionTypes } from 'actions/actionTypes'
import { error } from "actions/status/error"
import { trackCheckoutError } from "actions/tracking/trackCheckoutError"

export function firePayPalError(err) {
  return (dispatch) => {
    logger.error({message: `${actionTypes.PAYPAL_ERROR} - ${err.message}`, errors: [err]})
    dispatch(trackCheckoutError(actionTypes.PAYPAL_ERROR, true, 'firePayPalError'))
    dispatch(error(actionTypes.PAYPAL_ERROR, true))
  }
}
