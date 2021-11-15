import Immutable from 'immutable'
import { deliveryFormName } from 'selectors/checkout'
import { actionTypes } from 'actions/actionTypes'
import * as trackingKeys from 'actions/trackingKeys'
import { getPreviewOrderId } from 'selectors/basket'

export function trackingOrderPlaceAttemptSucceeded() {
  return (dispatch, getState) => {
    const state = getState()
    const {pricing, form} = state
    const prices = pricing.get('prices')
    const deliveryInputs = Immutable.fromJS(form[deliveryFormName].values)
    const intervalId = deliveryInputs.getIn(['delivery', 'interval_id'], '1')

    dispatch({
      type: actionTypes.CHECKOUT_ORDER_PLACE_ATTEMPT_SUCCEEDED,
      trackingData: {
        actionType: trackingKeys.placeOrderAttemptComplete,
        order_id: getPreviewOrderId(state),
        order_total: prices.get('grossTotal'),
        promo_code: prices.get('promoCode'),
        interval_id: intervalId,
        payment_provider: 'checkout'
      }
    })
  }
}
