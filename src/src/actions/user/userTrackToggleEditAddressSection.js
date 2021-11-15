import { actionTypes } from "actions/actionTypes"

export function userTrackToggleEditAddressSection(orderId) {
  return (dispatch, getState) => {
    const originalAddressId = getState().user.getIn(['newOrders', orderId, 'shippingAddressId'])

    dispatch({
      type: actionTypes.TRACKING,
      trackingData: {
        actionType: 'OrderDeliveryAddress Edit',
        order_id: orderId,
        original_deliveryaddress_id: originalAddressId,
      }
    })
  }
}
