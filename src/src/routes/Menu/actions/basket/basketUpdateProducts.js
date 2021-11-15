import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { getAccessToken } from "selectors/auth"
import { getBasketOrderId } from "selectors/basket"
import { getUpdateOrderProductItemsOrderV1 } from "routes/Menu/selectors/order"
import { updateOrderItems } from "apis/orders/updateOrderItems"
import * as trackingKeys from "actions/trackingKeys"
import Immutable from "immutable"
import { orderConfirmationUpdateOrderTracking } from "actions/order/orderConfirmationUpdateOrderTracking"
import { temp } from "actions/temp/temp"
import { error } from "actions/status/error"
import logger from "utils/logger"

export const basketUpdateProducts = (isOrderConfirmation = false) => (
    async (dispatch, getState) => {
        dispatch(pending(actionTypes.BASKET_CHECKOUT, true))
        const state = getState()
        const token = getAccessToken(state)
        const orderId = getBasketOrderId(state)
        const productInformation = getUpdateOrderProductItemsOrderV1(state)

        try {
            const {data: order} = await updateOrderItems(token, orderId, productInformation)
            dispatch({
                type: actionTypes.BASKET_CHECKOUT,
                trackingData: {
                    actionType: trackingKeys.checkOutBasketAttempt,
                    order,
                },
            })

            const orderDetails = Immutable.fromJS(order)

            await dispatch({
                type: actionTypes.BASKET_ORDER_DETAILS_LOADED,
                orderId: order.id,
                orderDetails,
            })

            if (isOrderConfirmation) {
                dispatch(orderConfirmationUpdateOrderTracking())
            }

            const orderTotal = orderDetails.getIn(['prices', 'total'])
            const grossTotal = orderDetails.getIn(['prices', 'grossTotal'])

            dispatch(temp('originalGrossTotal', grossTotal))
            dispatch(temp('originalNetTotal', orderTotal))
            dispatch(pending(actionTypes.BASKET_CHECKOUT, false))
        } catch (err) {
            dispatch(pending(actionTypes.BASKET_CHECKOUT, false))
            dispatch(error(actionTypes.BASKET_CHECKOUT, err.message))
            logger.error(err)
            throw err
        }
    }
)
