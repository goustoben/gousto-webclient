import { error } from "actions/status/error"
import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { getAccessToken } from "selectors/auth"
import { getBasketOrderId } from "selectors/basket"
import { getOrderForUpdateOrderV1 } from "routes/Menu/selectors/order"
import { trackOrder } from "actions/order/trackOrder"
import { orderConfirmationRedirect } from "actions/order/orderConfirmationRedirect"
import logger from "utils/logger"
import { saveOrder } from "apis/orders/saveOrder"
import { sendClientMetric } from "routes/Menu/apis/clientMetrics/sendClientMetric"

export const orderUpdate = () => async (dispatch, getState) => {
  dispatch(error(actionTypes.ORDER_SAVE, null))
  dispatch(pending(actionTypes.ORDER_SAVE, true))

  const state = getState()
  const accessToken = getAccessToken(state)
  const orderId = getBasketOrderId(state)
  const order = getOrderForUpdateOrderV1(state)
  const orderAction = order.order_action

  try {
    const {data: savedOrder} = await saveOrder(accessToken, orderId, order)

    if (savedOrder && savedOrder.id) {
      dispatch(trackOrder(
        orderAction,
        savedOrder,
      ))

      sendClientMetric('menu-edit-complete', 1, 'Count')

      dispatch(orderConfirmationRedirect(savedOrder.id, orderAction))
    }
  } catch (err) {
    logger.error({message: 'saveOrder api call failed, logging error below...'})
    logger.error(err)
    dispatch(error(actionTypes.ORDER_SAVE, err.message))
    dispatch(pending(actionTypes.BASKET_CHECKOUT, false))
  }
  dispatch(pending(actionTypes.ORDER_SAVE, false))
}
