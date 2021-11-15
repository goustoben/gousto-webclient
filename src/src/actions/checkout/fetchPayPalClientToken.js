import { actionTypes } from 'actions/actionTypes'
import logger from 'utils/logger'
import { error } from "actions/status/error"
import { trackCheckoutError } from "actions/tracking/trackCheckoutError"
import { fetchPayPalToken } from "apis/payments/fetchPayPalToken"

export function fetchPayPalClientToken() {
  return async (dispatch) => {
    try {
      const {data} = await fetchPayPalToken()

      dispatch({
        type: actionTypes.PAYMENT_SET_PAYPAL_CLIENT_TOKEN,
        token: data.clientToken
      })
    } catch (err) {
      logger.error({message: `${actionTypes.PAYPAL_TOKEN_FETCH_FAILED} - ${err.message}`, errors: [err]})
      dispatch(trackCheckoutError(actionTypes.PAYPAL_TOKEN_FETCH_FAILED, true, 'fetchPayPalClientToken'))
      dispatch(error(actionTypes.PAYPAL_TOKEN_FETCH_FAILED, true))
    }
  }
}
