import { actionTypes } from 'actions/actionTypes'
import { getPaymentAuthData, is3DSCardPayment } from 'selectors/payment'
import * as trackingKeys from 'actions/trackingKeys'
import { handleCheckoutError } from 'actions/checkout/handleCheckoutError'
import { errorCodes } from 'actions/checkout/errorCodes'
import { error } from "actions/status/error"
import { pending } from "actions/status/pending"
import { resetDuplicateCheck } from 'actions/checkout/resetDuplicateCheck'
import { checkoutSignupPayment } from 'actions/checkout/checkoutSignupPayment'
import { clearGoustoRef } from 'actions/checkout/clearGoustoRef'
import { logLevels } from "actions/log/logLevels"
import { feLoggingLogEvent } from "actions/log/feLoggingLogEvent"
import { trackUTMAndPromoCode } from "actions/tracking/trackUTMAndPromoCode"
import { userSubscribe } from "actions/user/userSubscribe"
import { authPayment } from "apis/payments/authPayment"

export function checkoutDecoupledPaymentSignup() {
  return async (dispatch, getState) => {
    let needClearGoustoRef = false
    const state = getState()

    dispatch(error(actionTypes.CHECKOUT_SIGNUP, null))
    dispatch(pending(actionTypes.CHECKOUT_SIGNUP, true))

    try {
      dispatch(resetDuplicateCheck())
      await dispatch(userSubscribe(false, null))

      if (is3DSCardPayment(state)) {
        const reqData = getPaymentAuthData(state)
        if (reqData.order_id) {
          const {data} = await authPayment(reqData)
          dispatch({
            type: actionTypes.PAYMENT_SHOW_MODAL,
            challengeUrl: data.responsePayload.redirectLink,
          })
          dispatch(trackUTMAndPromoCode(trackingKeys.signupChallengeModalDisplay))
        } else {
          dispatch(feLoggingLogEvent(logLevels.error, 'decoupled auth payment failed: order_id does not exist'))
        }
      } else {
        await dispatch(checkoutSignupPayment())
      }
    } catch (err) {
      dispatch(feLoggingLogEvent(logLevels.error, `Decoupled signup failed: ${err.message}`))
      needClearGoustoRef = err.code !== errorCodes.duplicateDetails
      await handleCheckoutError(err, 'checkoutDecoupledPaymentSignup', dispatch, getState)
    } finally {
      dispatch(pending(actionTypes.CHECKOUT_SIGNUP, false))
      if (needClearGoustoRef) {
        dispatch(clearGoustoRef())
      }
    }
  }
}
