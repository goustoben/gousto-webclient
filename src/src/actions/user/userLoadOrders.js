import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { error } from "actions/status/error"
import logger from "utils/logger"
import { fetchUserOrders } from "apis/users/fetchUserOrders"

export function userLoadOrders(forceRefresh = false, orderType = 'pending', number = 10) {
  return async (dispatch, getState) => {
    dispatch(pending(actionTypes.USER_LOAD_ORDERS, true))
    try {
      if (forceRefresh || !getState().user.get('orders').size) {
        const accessToken = getState().auth.get('accessToken')
        const {data: orders} = await fetchUserOrders(accessToken, {
          limit: number,
          sort_order: 'desc',
          state: orderType,
          includes: ['shipping_address']
        })

        dispatch({
          type: actionTypes.USER_LOAD_ORDERS,
          orders
        })
      }
    } catch (err) {
      dispatch(error(actionTypes.USER_LOAD_ORDERS, err.message))
      logger.error({message: err.message})
    }
    dispatch(pending(actionTypes.USER_LOAD_ORDERS, false))
  }
}
