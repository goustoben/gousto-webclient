import { actionTypes } from 'actions/actionTypes'
import * as trackingKeys from 'actions/trackingKeys'
import { getIsDecoupledPaymentEnabled } from 'selectors/features'
import { handleCheckoutError } from 'actions/checkout/handleCheckoutError'
import { errorCodes } from 'actions/checkout/errorCodes'
import { checkoutSignupPayment } from 'actions/checkout/checkoutSignupPayment'
import { resetDuplicateCheck } from 'actions/checkout/resetDuplicateCheck'
import { checkoutPostSignup } from 'actions/checkout/checkoutPostSignup'
import { error } from "actions/status/error"
import { pending } from "actions/status/pending"
import { clearGoustoRef } from 'actions/checkout/clearGoustoRef'
import { checkoutCreatePreviewOrder } from "routes/Menu/actions/checkout/checkoutCreatePreviewOrder"
import { logLevels } from "actions/log/logLevels"
import { feLoggingLogEvent } from "actions/log/feLoggingLogEvent"
import { trackUTMAndPromoCode } from "actions/tracking/trackUTMAndPromoCode"
import { trackCheckoutError } from "actions/tracking/trackCheckoutError"
import { userSubscribe } from "actions/user/userSubscribe"
import { checkPayment } from "apis/payments/checkPayment"

export const checkPaymentAuth = (sessionId) => (
  async (dispatch, getState) => {
    dispatch({type: actionTypes.PAYMENT_HIDE_MODAL})
    dispatch(pending(actionTypes.CHECKOUT_SIGNUP, true))

    try {
      const {data} = await checkPayment(sessionId)
      if (data && data.approved) {
        dispatch(trackUTMAndPromoCode(trackingKeys.signupChallengeSuccessful))

        dispatch(feLoggingLogEvent(logLevels.info, 'signup 3ds challenge success'))
        if (getIsDecoupledPaymentEnabled(getState())) {
          await dispatch(checkoutSignupPayment(data.sourceId))
        } else {
          dispatch(resetDuplicateCheck())
          await dispatch(userSubscribe(true, data.sourceId))
          await dispatch(checkoutPostSignup())
        }
      } else {
        dispatch(feLoggingLogEvent(logLevels.info, 'signup 3ds challenge failed'))
        dispatch(trackUTMAndPromoCode(trackingKeys.signupChallengeFailed))
        dispatch(trackCheckoutError(actionTypes.CHECKOUT_SIGNUP, errorCodes.challengeFailed, 'checkPaymentAuth'))
        dispatch(error(actionTypes.CHECKOUT_SIGNUP, errorCodes.challengeFailed))
        await dispatch(checkoutCreatePreviewOrder())
      }
    } catch (err) {
      dispatch(feLoggingLogEvent(logLevels.error, `check 3ds payment failed: ${err.message}`))
      await handleCheckoutError(err, 'checkPaymentAuth', dispatch, getState)
    } finally {
      dispatch(pending(actionTypes.CHECKOUT_SIGNUP, false))
      dispatch(clearGoustoRef())
    }
  }
)
