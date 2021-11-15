import { actionTypes } from "actions/actionTypes"

export function userTrackDateSelected(orderId, originalSlotId, newSlotId) {
  return dispatch => {
    dispatch({
      type: actionTypes.TRACKING,
      trackingData: {
        actionType: 'OrderDeliveryDate Selected',
        order_id: orderId,
        original_deliveryslot_id: originalSlotId,
        new_deliveryslot_id: newSlotId,
      }
    })
  }
}
