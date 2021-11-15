import { actionTypes } from "actions/actionTypes"

export function userTrackToggleEditDateSection(orderId) {
  return (dispatch, getState) => {
    const originalSlotId = getState().user.getIn(['newOrders', orderId, 'deliverySlotId'])

    dispatch({
      type: actionTypes.TRACKING,
      trackingData: {
        actionType: 'OrderDeliverySlot Edit',
        order_id: orderId,
        original_deliveryslot_id: originalSlotId,
      }
    })
  }
}
