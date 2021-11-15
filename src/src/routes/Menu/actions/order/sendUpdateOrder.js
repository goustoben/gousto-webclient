import { error } from "actions/status/error"
import { actionTypes } from "actions/actionTypes"
import { pending } from "actions/status/pending"
import { getAccessToken, getAuthUserId } from "selectors/auth"
import { getBasketOrderId } from "selectors/basket"
import { getOrderAction, getOrderV2 } from "routes/Menu/selectors/order"
import { trackOrder } from "actions/order/trackOrder"
import { orderConfirmationRedirect } from "actions/order/orderConfirmationRedirect"
import logger from "utils/logger"
import { sendClientMetric } from "routes/Menu/apis/clientMetrics/sendClientMetric"
import { updateOrder } from "routes/Menu/apis/orderV2/updateOrder"

export const sendUpdateOrder = () => async (dispatch, getState) => {
    dispatch(error(actionTypes.ORDER_SAVE, null))
    dispatch(pending(actionTypes.ORDER_SAVE, true))

    const state = getState()
    const accessToken = getAccessToken(state)
    const userId = getAuthUserId(state)
    const orderId = getBasketOrderId(state)
    const orderPayload = getOrderV2(state)
    const orderAction = getOrderAction(state)

    try {
        const {data: order} = await updateOrder(accessToken, orderId, orderPayload, userId)

        if (order) {
            dispatch(trackOrder(
                orderAction,
                order,
            ))

            sendClientMetric('menu-edit-complete-order-api-v2', 1, 'Count')

            dispatch(orderConfirmationRedirect(orderId, orderAction))
        }
    } catch (err) {
        logger.error({message: 'saveOrder api call failed, logging error below...'})
        logger.error(err)
        dispatch(error(actionTypes.ORDER_SAVE, err.message))
        dispatch(pending(actionTypes.BASKET_CHECKOUT, false))
    }

    dispatch(pending(actionTypes.ORDER_SAVE, false))
}
