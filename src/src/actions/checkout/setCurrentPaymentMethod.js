import { actionTypes } from 'actions/actionTypes'
import { PaymentMethod } from 'config/signup'
import * as trackingKeys from 'actions/trackingKeys'
import { trackUTMAndPromoCode } from "actions/tracking/trackUTMAndPromoCode"

export function setCurrentPaymentMethod(paymentMethod, options = {}) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.PAYMENT_SET_PAYMENT_METHOD,
      paymentMethod
    })

    if (!options.disableTracking) {
      const trackingKey = paymentMethod === PaymentMethod.Card
        ? trackingKeys.selectCardPayment
        : trackingKeys.selectPayPalPayment
      dispatch(trackUTMAndPromoCode(trackingKey))
    }
  }
}
