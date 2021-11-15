import { actionTypes } from 'actions/actionTypes'
import { trackingOrderPlaceAttemptSucceeded } from 'actions/checkout/trackingOrderPlaceAttemptSucceeded'
import { checkoutSignup } from 'actions/checkout/checkoutSignup'

export function setPayPalNonce(nonce) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.PAYMENT_SET_PAYPAL_NONCE,
      nonce
    })

    dispatch(trackingOrderPlaceAttemptSucceeded())
    dispatch(checkoutSignup())
  }
}
