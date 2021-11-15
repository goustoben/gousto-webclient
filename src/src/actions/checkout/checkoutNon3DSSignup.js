import { actionTypes } from 'actions/actionTypes'
import { handleCheckoutError } from 'actions/checkout/handleCheckoutError'
import { errorCodes } from 'actions/checkout/errorCodes'
import { pending } from "actions/status/pending"
import { resetDuplicateCheck } from 'actions/checkout/resetDuplicateCheck'
import { checkoutPostSignup } from 'actions/checkout/checkoutPostSignup'
import { clearGoustoRef } from 'actions/checkout/clearGoustoRef'
import { logLevels } from "actions/log/logLevels"
import { feLoggingLogEvent } from "actions/log/feLoggingLogEvent"
import { userSubscribe } from "actions/user/userSubscribe"

export function checkoutNon3DSSignup() {
  return async (dispatch, getState) => {
    let needClearGoustoRef = true

    dispatch(error(actionTypes.CHECKOUT_SIGNUP, null))
    dispatch(pending(actionTypes.CHECKOUT_SIGNUP, true))

    try {
      dispatch(resetDuplicateCheck())
      await dispatch(userSubscribe(false, null))
      await dispatch(checkoutPostSignup())
    } catch (err) {
      dispatch(feLoggingLogEvent(logLevels.error, `Non3ds signup failed: ${err.message}`))
      needClearGoustoRef = err.code !== errorCodes.duplicateDetails
      await handleCheckoutError(err, 'checkoutNon3DSSignup', dispatch, getState)
    } finally {
      dispatch(pending(actionTypes.CHECKOUT_SIGNUP, false))
      if (needClearGoustoRef) {
        dispatch(clearGoustoRef())
      }
    }
  }
}
