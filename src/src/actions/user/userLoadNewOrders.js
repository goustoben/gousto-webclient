import { getIsGoustoOnDemandEnabled } from "selectors/features"
import { transformPendingOrders, transformProjectedDeliveries } from "utils/myDeliveries"
import { actionTypes } from "actions/actionTypes"
import { userLoadOrders } from "actions/user/userLoadOrders"
import { userLoadProjectedDeliveries } from "actions/user/userLoadProjectedDeliveries"

export function userLoadNewOrders() {
  return async (dispatch, getState) => {
    const forceRefresh = getIsGoustoOnDemandEnabled(getState())
    // eslint-disable-next-line no-use-before-define
    await Promise.all([dispatch(userLoadOrders(forceRefresh)), dispatch(userLoadProjectedDeliveries())])

    const state = getState()
    const pendingOrders = transformPendingOrders(state.user.get('orders'))
    const projectedDeliveries = transformProjectedDeliveries(state.user.get('projectedDeliveries'))
    const ordersCombined = pendingOrders.merge(projectedDeliveries)

    dispatch({type: actionTypes.MYDELIVERIES_ORDERS, orders: ordersCombined})
  }
}
