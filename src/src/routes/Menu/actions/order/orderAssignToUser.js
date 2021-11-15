import { error } from "actions/status/error"
import { actionTypes } from "actions/actionTypes"
import { pending } from "actions/status/pending"
import { getAccessToken, getAuthUserId } from "selectors/auth"
import { getOrderDetails } from "routes/Menu/selectors/order"
import logger from "utils/logger"
import { handleErrorForOrder } from "routes/Menu/actions/order/handleErrorForOrder"
import { trackOrder } from "actions/order/trackOrder"
import { orderConfirmationRedirect } from "actions/order/orderConfirmationRedirect"
import { saveUserOrder } from "routes/Menu/apis/core/saveUserOrder"
import { updateUserOrder } from "routes/Menu/apis/core/updateUserOrder"

export const orderAssignToUser = (orderAction, existingOrderId) => async (dispatch, getState) => {
    dispatch(error(actionTypes.ORDER_SAVE, null))
    dispatch(pending(actionTypes.ORDER_SAVE, true))

    const accessToken = getAccessToken(getState())
    const userId = getAuthUserId(getState())
    const orderDetails = getOrderDetails(getState())

    // We omit the additional keys we don't need
    delete orderDetails.delivery_tariff_id
    delete orderDetails.order_id
    delete orderDetails.promo_code

    let savedOrder

    try {
        const {data} = await saveUserOrder(accessToken, orderDetails)
        savedOrder = data
    } catch (err) {
        logger.error({
            message: 'saveUserOrder in orderAssignToUser failed, logging error below...',
            actor: userId,
            extra: {
                orderDetails
            }
        })

        logger.error(err)

        if (!existingOrderId || err.message !== 'user already has an order for chosen delivery day') {
            dispatch(handleErrorForOrder('save-order-fail'))

            return
        }

        const updateUserOrderPayload = {
            ...orderDetails,
            order_id: existingOrderId,
        }

        try {
            const {data} = await updateUserOrder(accessToken, updateUserOrderPayload)
            savedOrder = data
        } catch (error) {
            logger.error({
                message: 'updateUserOrder in orderAssignToUser failed, logging error below...',
                actor: userId,
                extra: {
                    updateUserOrderPayload
                }
            })
            logger.error(error)

            dispatch(handleErrorForOrder('update-order-fail'))

            return
        }
    }

    if (!savedOrder || !savedOrder.id) {
        logger.error({message: 'orderAssignToUser failed, logging error below...', actor: userId})
        logger.error('assign-order-fail')

        dispatch(handleErrorForOrder('assign-order-fail'))

        return
    }

    dispatch(trackOrder(orderAction, savedOrder))
    dispatch(orderConfirmationRedirect(savedOrder.id, orderAction))
    dispatch(pending(actionTypes.ORDER_SAVE, false))
}
