import { getFormSyncErrors } from 'redux-form'
import { actionTypes } from 'actions/actionTypes'
import * as trackingKeys from 'actions/trackingKeys'

export function trackingOrderPlaceAttemptFailed() {
  return (dispatch, getState) => {
    const errorMessages = getFormSyncErrors('payment')(getState()).payment

    dispatch({
      type: actionTypes.CHECKOUT_ORDER_PLACE_ATTEMPT_FAILED,
      trackingData: {
        actionType: trackingKeys.placeOrderFailAttempt,
        missing_fields: Object.values(errorMessages)
      }
    })
  }
}
