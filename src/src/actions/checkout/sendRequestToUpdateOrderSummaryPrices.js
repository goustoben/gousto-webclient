import { getIsPaymentBeforeChoosingEnabled } from 'selectors/features'
import { checkoutCreatePreviewOrder } from "routes/Menu/actions/checkout/checkoutCreatePreviewOrder"
import { pricingRequest } from "actions/pricing/pricingRequest"

export const sendRequestToUpdateOrderSummaryPrices = () => async (dispatch, getState) => {
  const state = getState()
  const isPaymentBeforeChoosingEnabled = getIsPaymentBeforeChoosingEnabled(state)

  if (isPaymentBeforeChoosingEnabled) {
    await dispatch(checkoutCreatePreviewOrder())
  } else {
    await dispatch(pricingRequest())
  }
}
