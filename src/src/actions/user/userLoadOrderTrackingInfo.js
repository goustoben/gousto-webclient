import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { error } from "actions/status/error"
import logger from "utils/logger"
import { fetchDeliveryConsignment } from "apis/deliveries/fetchDeliveryConsignment"

export const userLoadOrderTrackingInfo = (orderId) => (
  async (dispatch, getState) => {
    dispatch(pending(actionTypes.USER_LOAD_ORDER_TRACKING, true))
    dispatch(error(actionTypes.USER_LOAD_ORDER_TRACKING, false))
    try {
      const accessToken = getState().auth.get('accessToken')
      const orderTracking = await fetchDeliveryConsignment(accessToken, orderId)
      const {trackingUrl} = orderTracking.data[0]
      dispatch({
        type: actionTypes.USER_LOAD_ORDER_TRACKING,
        trackingUrl,
      })
    } catch (err) {
      dispatch(error(actionTypes.USER_LOAD_ORDER_TRACKING, true))
      dispatch({
        type: actionTypes.USER_LOAD_ORDER_TRACKING,
        trackingUrl: '',
      })
      logger.error({message: `Failed to fetch tracking url for order ${orderId}`, errors: [err]})
    } finally {
      dispatch(pending(actionTypes.USER_LOAD_ORDER_TRACKING, false))
    }
  }
)
