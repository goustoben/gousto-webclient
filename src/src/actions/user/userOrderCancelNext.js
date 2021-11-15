import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { error } from "actions/status/error"
import { userLoadOrders } from "actions/user/userLoadOrders"
import moment from "moment"
import { getAuthUserId } from "selectors/auth"
import GoustoException from "utils/GoustoException"
import logger from "utils/logger"
import { deleteOrder } from "routes/Account/MyDeliveries/apis/orderV2/deleteOrder"

export function userOrderCancelNext() {
  return async (dispatch, getState) => {
    dispatch(pending(actionTypes.USER_ORDER_CANCEL_NEXT, true))
    dispatch(error(actionTypes.USER_ORDER_CANCEL_NEXT, false))
    const errorPrefix = 'Order skip projected error:'
    const cancellablePhases = ['awaiting_choices', 'open', 'pre_menu']

    try {
      await dispatch(userLoadOrders())

      const state = getState()

      const cancellableOrder = state.user.get('orders')
        .filter(order => cancellablePhases.includes(order.get('phase')))

      if (cancellableOrder.size) {
        const orderToCancelId = cancellableOrder
          .sort((orderA, orderB) => {
            const orderDateA = orderA.get('deliveryDay')
            const orderDateB = orderB.get('deliveryDay')

            return moment(orderDateA) - moment(orderDateB)
          })
          .first()
          .get('id')

        try {
          const accessToken = state.auth.get('accessToken')
          const userId = getAuthUserId(state)

          await deleteOrder(accessToken, orderToCancelId, userId)

          dispatch({
            type: actionTypes.USER_UNLOAD_ORDERS,
            orderIds: [orderToCancelId]
          })
        } catch (err) {
          throw new GoustoException(`${errorPrefix} attempt to cancel delivery ${orderToCancelId} failed`)
        }
      } else {
        throw new GoustoException(`${errorPrefix} no orders found to cancel`, {
          error: 'no-orders-found',
          level: 'warning'
        })
      }
    } catch (err) {
      const message = err.message || `${errorPrefix} ${err}`
      const error = err.error || message
      const logLevel = err.level || 'error'

      logger[logLevel](message)
      dispatch(error(actionTypes.USER_ORDER_CANCEL_NEXT, error))
    } finally {
      dispatch(pending(actionTypes.USER_ORDER_CANCEL_NEXT, false))
    }
  }
}
