// Note: this is a helper method, not an action.  It should be called directly
// instead of dispatched.
import { getIsPaymentBeforeChoosingEnabled } from 'selectors/features'
import { basketPromoCodeChange } from 'actions/basket/basketPromoCodeChange'
import { basketPromoCodeAppliedChange } from 'actions/basket/basketPromoCodeAppliedChange'
import { actionTypes } from 'actions/actionTypes'
import { error } from "actions/status/error"
import { checkoutCreatePreviewOrder } from "routes/Menu/actions/checkout/checkoutCreatePreviewOrder"
import { pricingRequest } from "actions/pricing/pricingRequest"

export const handlePromoCodeRemoved = async (dispatch, getState) => {
  const state = getState()
  const isPaymentBeforeChoosingEnabled = getIsPaymentBeforeChoosingEnabled(state)

  dispatch(basketPromoCodeChange(''))
  dispatch(basketPromoCodeAppliedChange(false))
  dispatch(error(actionTypes.CHECKOUT_ERROR_DUPLICATE, true))

  if (isPaymentBeforeChoosingEnabled) {
    await dispatch(checkoutCreatePreviewOrder())
  } else {
    dispatch(pricingRequest())
  }
}
