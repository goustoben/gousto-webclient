import { error } from "actions/status/error"
import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { updateOrderAddress } from "apis/orders/updateOrderAddress"

export const orderAddressChange = (orderId, addressId) => (
  async (dispatch, getState) => {
    const originalAddressId = getState().user.getIn(['newOrders', orderId, 'shippingAddressId'])
    const trackingData = {
      order_id: orderId,
      original_deliveryaddress_id: originalAddressId,
      new_deliveryaddress_id: addressId,
    }
    dispatch(error(actionTypes.ORDER_ADDRESS_CHANGE, {
      orderId: '',
      errorMessage: ''
    }))
    dispatch(pending(actionTypes.ORDER_ADDRESS_CHANGE, orderId))
    const accessToken = getState().auth.get('accessToken')
    const data = {
      orderId,
      addressId,
    }
    try {
      dispatch({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: 'OrderDeliveryAddress SaveAttempt',
          ...trackingData
        }
      })
      await updateOrderAddress(accessToken, orderId, addressId)
      dispatch({
        type: actionTypes.ORDER_ADDRESS_CHANGE,
        data,
        trackingData: {
          actionType: 'OrderDeliveryAddress Saved',
          ...trackingData
        }
      })
    } catch (err) {
      dispatch(error(actionTypes.ORDER_ADDRESS_CHANGE, {
        orderId,
        errorMessage: err.message
      }))
      dispatch({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: 'OrderDeliveryAddress SaveAttemptFailed',
          error: err.message,
          ...trackingData
        }
      })
    } finally {
      dispatch(pending(actionTypes.ORDER_ADDRESS_CHANGE, ''))
    }
  }
)
