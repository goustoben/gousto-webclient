import { getUserOrders } from "selectors/user"
import { actionTypes } from "actions/actionTypes"
import * as trackingKeys from "actions/trackingKeys"
import { basketIdChange } from "actions/basket/basketIdChange"
import { getUTMAndPromoCode } from "selectors/tracking"
import { pricingRequest } from "actions/pricing/pricingRequest"

export const basketSlotChange = slotId => (
  (dispatch, getState) => {
    const state = getState()
    const date = state.basket.get('date')
    const userOrders = getUserOrders(getState())
    const orderForDate = userOrders.find(order => {
      const deliveryDay = order.get('deliveryDate').split(' ')[0]

      return (deliveryDay === date)
    })

    dispatch({
      type: actionTypes.BASKET_SLOT_CHANGE,
      slotId,
      trackingData: {
        actionType: trackingKeys.changeBasketSlot,
        slotId,
        date,
        dayId: state.boxSummaryDeliveryDays.getIn([date, 'id']),
      },
    })
    if (orderForDate) {
      const orderId = orderForDate.get('id')
      dispatch(basketIdChange(orderId))
    }
    dispatch(pricingRequest())

    const slots = state.boxSummaryDeliveryDays.getIn([date, 'slots'], null)
    if (slots && slots.size > 0) {
      const selectedSlot = slots.find(slot => slot.get('id') === slotId)
      const defaultDelivery = selectedSlot && selectedSlot.get('isDefault') && state.boxSummaryDeliveryDays.getIn([date, 'isDefault'])
      const {promoCode, UTM} = getUTMAndPromoCode(state)
      dispatch({
        type: actionTypes.BASKET_SELECT_DELIVERY_SLOT,
        trackingData: {
          actionType: trackingKeys.selectDeliverySlot,
          ...UTM,
          promoCode,
          deliverySlot: defaultDelivery ? 'default' : 'not default'
        },
      })
    }
  }
)
