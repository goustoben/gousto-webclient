import { actionTypes } from 'actions/actionTypes'
import { getPromoCodeValidationDetails } from 'selectors/checkout'
import { getPaymentAuthData } from 'selectors/payment'
import * as trackingKeys from 'actions/trackingKeys'
import { errorCodes } from 'actions/checkout/errorCodes'
import { error } from "actions/status/error"
import { pending } from "actions/status/pending"
import { clearGoustoRef } from 'actions/checkout/clearGoustoRef'
import { handlePromoCodeRemoved } from 'actions/checkout/handlePromoCodeRemoved'
import { handleCheckoutError } from 'actions/checkout/handleCheckoutError'
import { logLevels } from "actions/log/logLevels"
import { feLoggingLogEvent } from "actions/log/feLoggingLogEvent"
import { trackUTMAndPromoCode } from "actions/tracking/trackUTMAndPromoCode"
import { trackCheckoutError } from "actions/tracking/trackCheckoutError"
import { fetchPromoCodeValidity } from "apis/customers/fetchPromoCodeValidity"
import { authPayment } from "apis/payments/authPayment"

export function checkout3DSSignup() {
  return async (dispatch, getState) => {
    dispatch(error(actionTypes.CHECKOUT_SIGNUP, null))
    dispatch(pending(actionTypes.CHECKOUT_SIGNUP, true))

    const state = getState()

    try {
      const promoCodeValidityDetails = getPromoCodeValidationDetails(state)
      if (promoCodeValidityDetails.promo_code) {
        const validationResult = await fetchPromoCodeValidity(promoCodeValidityDetails)

        if (!validationResult.data.valid) {
          dispatch(trackCheckoutError(actionTypes.CHECKOUT_SIGNUP, errorCodes.duplicateDetails, 'checkout3DSSignup'))
          dispatch(error(actionTypes.CHECKOUT_SIGNUP, errorCodes.duplicateDetails))
          await handlePromoCodeRemoved(dispatch, getState)
          dispatch(pending(actionTypes.CHECKOUT_SIGNUP, false))

          return
        }
      }

      const reqData = getPaymentAuthData(state)
      if (reqData.order_id) {
        const {data} = await authPayment(reqData)
        dispatch({
          type: actionTypes.PAYMENT_SHOW_MODAL,
          challengeUrl: data.responsePayload.redirectLink,
        })
        dispatch(trackUTMAndPromoCode(trackingKeys.signupChallengeModalDisplay))
      } else {
        dispatch(feLoggingLogEvent(logLevels.error, 'auth payment failed: order_id does not exist'))
      }
    } catch (err) {
      dispatch(feLoggingLogEvent(logLevels.error, `auth payment failed: ${err.message}`))
      const skipPromoCodeRemovedCheck = err.code !== errorCodes.promoCodeHasBeenUsed
      await handleCheckoutError(err, 'checkout3DSSignup', dispatch, getState, {skipPromoCodeRemovedCheck})
      dispatch(pending(actionTypes.CHECKOUT_SIGNUP, false))
      dispatch(clearGoustoRef())
    }
  }
}
