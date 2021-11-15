import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { error } from "actions/status/error"
import logger from "utils/logger"
import { fetchOrder } from "apis/orders/fetchOrder"

export function userLoadOrder(orderId, forceRefresh = false) {
  return async (dispatch, getState) => {
    dispatch(pending(actionTypes.USER_LOAD_ORDERS, true))
    dispatch(error(actionTypes.USER_LOAD_ORDERS, null))
    try {
      if (forceRefresh || getState().user.get('orders').find(order => order.get('id') === orderId) === undefined) {
        const accessToken = getState().auth.get('accessToken')
        const {data: order} = await fetchOrder(accessToken, orderId, {'includes[]': 'shipping_address'})

        dispatch({
          type: actionTypes.USER_LOAD_ORDERS,
          orders: [order],
        })
      }
    } catch (err) {
      dispatch(error(actionTypes.USER_LOAD_ORDERS, err.message))
      logger.error(err)
      throw err
    } finally {
      dispatch(pending(actionTypes.USER_LOAD_ORDERS, false))
    }
  }
}
