import { actionTypes } from "actions/actionTypes"

export function userTrackSlotSelected(orderId, originalSlotId, newSlotId) {
  return dispatch => {
    dispatch({
      type: actionTypes.TRACKING,
      trackingData: {
        actionType: 'OrderDeliverySlot Selected',
        order_id: orderId,
        original_deliveryslot_id: originalSlotId,
        new_deliveryslot_id: newSlotId,
      }
    })
  }
}
