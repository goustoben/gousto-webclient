import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { error } from "actions/status/error"
import GoustoException from "utils/GoustoException"
import { getUserId } from "selectors/user"
import logger from "utils/logger"
import { userLoadProjectedDeliveries } from "actions/user/userLoadProjectedDeliveries"
import { skipDates } from "routes/Account/apis/subscription/skipDates"

export function userOrderSkipNextProjected() {
  return async (dispatch, getState) => {
    dispatch(pending(actionTypes.USER_ORDER_SKIP_NEXT_PROJECTED, true))
    dispatch(error(actionTypes.USER_ORDER_SKIP_NEXT_PROJECTED, false))
    const errorPrefix = 'Order skip projected error:'

    try {
      const state = getState()
      let projectedOrders = state.user.get('projectedDeliveries')

      if (!projectedOrders.size) {
        // eslint-disable-next-line no-use-before-define
        await dispatch(userLoadProjectedDeliveries())
        projectedOrders = state.user.get('projectedDeliveries')
      }

      if (!projectedOrders.size) {
        throw new GoustoException(`${errorPrefix} no orders found to skip`, {
          error: 'no-orders-found',
          level: 'warning'
        })
      }

      const orderToSkipId = projectedOrders.first().get('id')
      const accessToken = state.auth.get('accessToken')

      try {
        const orderToSkipDate = projectedOrders.first().get('deliveryDate').split(' ')[0]
        const userId = getUserId(state)

        await skipDates(accessToken, userId, [orderToSkipDate])

        dispatch({
          type: actionTypes.USER_UNLOAD_PROJECTED_DELIVERIES,
          deliveryDayIds: [orderToSkipId]
        })
      } catch (err) {
        throw new GoustoException(`${errorPrefix} attempt to skip delivery ${orderToSkipId} failed`)
      }
    } catch (err) {
      const message = err.message || `${errorPrefix} ${err}`
      const error = err.error || message
      const logLevel = err.level || 'error'

      logger[logLevel](message)
      dispatch(error(actionTypes.USER_ORDER_SKIP_NEXT_PROJECTED, error))
    } finally {
      dispatch(pending(actionTypes.USER_ORDER_SKIP_NEXT_PROJECTED, false))
    }
  }
}
