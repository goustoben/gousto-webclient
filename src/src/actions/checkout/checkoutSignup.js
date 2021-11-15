import { getIsDecoupledPaymentEnabled } from 'selectors/features'
import { is3DSCardPayment } from 'selectors/payment'
import { trackSignupPageChange } from 'actions/checkout/trackSignupPageChange'
import { fetchGoustoRef } from 'actions/checkout/fetchGoustoRef'
import { checkoutDecoupledPaymentSignup } from 'actions/checkout/checkoutDecoupledPaymentSignup'
import { checkout3DSSignup } from 'actions/checkout/checkout3DSSignup'
import { checkoutNon3DSSignup } from 'actions/checkout/checkoutNon3DSSignup'
import { logLevels } from "actions/log/logLevels"
import { feLoggingLogEvent } from "actions/log/feLoggingLogEvent"

export function checkoutSignup() {
  return async (dispatch, getState) => {
    dispatch(feLoggingLogEvent(logLevels.info, 'signup started'))

    const state = getState()
    dispatch(trackSignupPageChange('Submit'))
    await dispatch(fetchGoustoRef())

    if (getIsDecoupledPaymentEnabled(state)) {
      return dispatch(checkoutDecoupledPaymentSignup())
    }

    if (is3DSCardPayment(state)) {
      return dispatch(checkout3DSSignup())
    }

    return dispatch(checkoutNon3DSSignup())
  }
}
