import { orderTrackingActions } from "config/order"
import { getTrackingInformationForV2 } from "actions/order/getTrackingInformationForV2"
import { getTrackingInformationForV1 } from "actions/order/getTrackingInformationForV1"
import { trackAffiliatePurchase } from "actions/tracking/trackAffiliatePurchase"

export const trackOrder = (orderAction, order) => (
  (dispatch, getState) => {
    if (Object.keys(orderTrackingActions).includes(orderAction)) {
      const {actionType, trackAffiliate} = orderTrackingActions[orderAction]

      if (trackAffiliate) {
        const {basket} = getState()
        const fn = order.attributes ? getTrackingInformationForV2 : getTrackingInformationForV1
        const {id, promoCode, total = ''} = fn(order)

        const affiliateTracking = {
          orderId: id,
          total,
          commissionGroup: 'EXISTING',
          promoCode: promoCode || basket.get('promoCode') || '',
        }

        dispatch(trackAffiliatePurchase(affiliateTracking))
      }

      if (actionType) {
        dispatch({
          type: actionType,
          order,
        })
      }
    }
  }
)
