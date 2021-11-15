import { actionTypes } from 'actions/actionTypes'

export function clearPayPalClientToken() {
  return (dispatch) => {
    dispatch({
      type: actionTypes.PAYMENT_SET_PAYPAL_CLIENT_TOKEN,
      token: null
    })
  }
}
