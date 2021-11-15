import { actionTypes } from 'actions/actionTypes'
import * as trackingKeys from 'actions/trackingKeys'
import { getPreviewOrderId } from 'selectors/basket'

export function trackingOrderPlaceAttempt() {
  return (dispatch, getState) => {
    const state = getState()
    const {pricing} = state
    const prices = pricing.get('prices')

    dispatch({
      type: actionTypes.CHECKOUT_ORDER_PLACE_ATTEMPT,
      trackingData: {
        actionType: trackingKeys.placeOrderAttempt,
        order_id: getPreviewOrderId(state),
        order_total: prices.get('grossTotal'),
        promo_code: prices.get('promoCode'),
        payment_provider: 'checkout'
      }
    })
  }
}
