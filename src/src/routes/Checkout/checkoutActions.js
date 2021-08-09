import { actionTypes } from 'actions/actionTypes'
import { getUTMAndPromoCode } from 'selectors/tracking'

export const checkoutUrgencySetCurrentStatus = (currentStatus) => ({
  type: actionTypes.CHECKOUT_URGENCY_SET_CURRENT_STATUS,
  currentStatus,
})

export const trackCheckoutUrgencyAction =
  (type, additionalData = {}) =>
  (dispatch, getState) => {
    const { promoCode, UTM } = getUTMAndPromoCode(getState())

    dispatch({
      type,
      trackingData: {
        actionType: type,
        ...UTM,
        promoCode,
        ...additionalData,
      },
    })
  }
