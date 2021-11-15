import { error } from "actions/status/error"
import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { getSlot } from "utils/deliveries"
import { userToggleEditDateSection } from "actions/user/userToggleEditDateSection"
import { saveOrder } from "apis/orders/saveOrder"

export const orderUpdateDayAndSlot = (orderId, coreDayId, coreSlotId, slotId, slotDate, availableDeliveryDays) => (
  async (dispatch, getState) => {
    dispatch(error(actionTypes.ORDER_UPDATE_DELIVERY_DAY_AND_SLOT, null))
    dispatch(pending(actionTypes.ORDER_UPDATE_DELIVERY_DAY_AND_SLOT, true))

    const slot = getSlot(availableDeliveryDays, slotDate, slotId)

    const originalSlotId = getState().user.getIn(['newOrders', orderId, 'deliverySlotId'])
    const trackingData = {
      order_id: orderId,
      original_deliveryslot_id: originalSlotId,
      new_deliveryslot_id: slotId,
    }

    try {
      const order = {
        delivery_day_id: coreDayId,
        delivery_slot_id: coreSlotId,
        day_slot_lead_time_id: slot.get('daySlotLeadTimeId', ''),
      }
      const accessToken = getState().auth.get('accessToken')
      dispatch({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: 'OrderDeliverySlot SaveAttempt',
          ...trackingData
        }
      })
      const {data: updatedOrder} = await saveOrder(accessToken, orderId, order)
      dispatch({
        type: actionTypes.ORDER_UPDATE_DELIVERY_DAY_AND_SLOT,
        orderId,
        coreDayId,
        slotId: coreSlotId,
        deliveryDay: updatedOrder.deliveryDate,
        humanDeliveryDay: updatedOrder.humanDeliveryDate,
        deliverySlotStart: slot.get('deliveryStartTime'),
        deliverySlotEnd: slot.get('deliveryEndTime'),
        shouldCutoffAt: updatedOrder.shouldCutoffAt,
        trackingData: {
          actionType: 'OrderDeliverySlot Saved',
          ...trackingData
        }
      })
      dispatch(userToggleEditDateSection(orderId, false))
    } catch (err) {
      dispatch(error(actionTypes.ORDER_UPDATE_DELIVERY_DAY_AND_SLOT, err.message))
      dispatch({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: 'OrderDeliverySlot SaveAttemptFailed',
          error: err.message,
          ...trackingData
        }
      })
    } finally {
      dispatch(pending(actionTypes.ORDER_UPDATE_DELIVERY_DAY_AND_SLOT, false))
    }
  })
