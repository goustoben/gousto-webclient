import { error } from "actions/status/error"
import { trackCheckoutError } from "actions/tracking/trackCheckoutError"

export const fireCheckoutError = (errorName, errorValue = true) => dispatch => {
  dispatch(trackCheckoutError(errorName, errorValue, 'fireCheckoutError'))
  dispatch(error(errorName, errorValue))
}
