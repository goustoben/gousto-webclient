import {
  getCardPaymentDetails,
  getDecoupledPaymentData,
  getPayPalPaymentDetails,
  isCardPayment
} from 'selectors/payment'
import { actionTypes } from 'actions/actionTypes'
import { handleCheckoutError } from 'actions/checkout/handleCheckoutError'
import { checkoutPostSignup } from 'actions/checkout/checkoutPostSignup'
import { clearGoustoRef } from 'actions/checkout/clearGoustoRef'
import { pending } from "actions/status/pending"
import { logLevels } from "actions/log/logLevels"
import { feLoggingLogEvent } from "actions/log/feLoggingLogEvent"
import { signupPayment } from "apis/payments/signupPayment"

export function checkoutSignupPayment(sourceId = null) {
  return async (dispatch, getState) => {
    try {
      const state = getState()
      const reqData = getDecoupledPaymentData(state)
      const provider = isCardPayment(state)
        ? getCardPaymentDetails(state)
        : getPayPalPaymentDetails(state)

      if (sourceId) {
        reqData.card_token = sourceId
      }

      await signupPayment(reqData, provider.payment_provider)
      await dispatch(checkoutPostSignup())
    } catch (err) {
      dispatch(feLoggingLogEvent(logLevels.error, `signup payment failed: ${err.message}`))
      await handleCheckoutError(err, 'checkoutSignupPayment', dispatch, getState)
    } finally {
      dispatch(pending(actionTypes.CHECKOUT_SIGNUP, false))
      dispatch(clearGoustoRef())
    }
  }
}
