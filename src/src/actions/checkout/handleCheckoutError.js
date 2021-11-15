import { getIsDecoupledPaymentEnabled } from 'selectors/features'
import { errorsThatClearOrderPreview, errorsToHandleForDecoupledPayment } from 'config/checkout'
import { actionTypes } from 'actions/actionTypes'
import logger from 'utils/logger'
import { handlePromoCodeRemoved } from 'actions/checkout/handlePromoCodeRemoved'
import { errorCodes } from 'actions/checkout/errorCodes'
import { error } from "actions/status/error"
import { checkoutCreatePreviewOrder } from "routes/Menu/actions/checkout/checkoutCreatePreviewOrder"
import { trackCheckoutError } from "actions/tracking/trackCheckoutError"

export const handleCheckoutError = async (err, initiator, dispatch, getState, options = {}) => {
  const {code} = err
  const errorName = getIsDecoupledPaymentEnabled(getState()) && errorsToHandleForDecoupledPayment.includes(code)
    ? actionTypes.CHECKOUT_PAYMENT
    : actionTypes.CHECKOUT_SIGNUP

  logger.error({message: `${errorName} - ${err.message}`, errors: [err]})

  dispatch(trackCheckoutError(errorName, code, initiator))
  dispatch(error(errorName, code))
  if (code === errorCodes.duplicateDetails || code === errorCodes.promoCodeHasBeenUsed) {
    if (options.skipPromoCodeRemovedCheck) {
      return
    }

    await handlePromoCodeRemoved(dispatch, getState)
  } else if (errorsThatClearOrderPreview.includes(code)) {
    // Certain error scenarios trigger the rollback logic which removes the
    // order preview, hence the preview order id stored at the client becomes
    // invalid.  Regenerate the order preview when such an error is detected.
    await dispatch(checkoutCreatePreviewOrder())
  }
}
