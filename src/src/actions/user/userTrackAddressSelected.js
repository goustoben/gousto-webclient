import { actionTypes } from "actions/actionTypes"

export function userTrackAddressSelected(orderId, originalAddressId, newAddressId) {
  return dispatch => {
    dispatch({
      type: actionTypes.TRACKING,
      trackingData: {
        actionType: 'OrderDeliveryAddress Selected',
        order_id: orderId,
        original_deliveryaddress_id: originalAddressId,
        new_deliveryaddress_id: newAddressId,
      }
    })
  }
}
