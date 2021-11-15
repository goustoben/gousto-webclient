import { error } from "actions/status/error"
import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { modalVisibilityChange } from "actions/onScreenRecovery/modalVisibilityChange"
import { cancelProjectedOrder } from "actions/onScreenRecovery/cancelProjectedOrder"
import logger from "utils/logger"
import { cancelPendingOrder } from "actions/onScreenRecovery/cancelPendingOrder"
import { fetchOrderSkipContent } from "apis/onScreenRecovery/fetchOrderSkipContent"

export const getSkipRecoveryContent = () => (
    async (dispatch, getState) => {
        const orderDate = getState().onScreenRecovery.get('orderDate')
        const orderId = getState().onScreenRecovery.get('orderId')
        const deliveryDayId = getState().onScreenRecovery.get('deliveryDayId')
        const status = getState().onScreenRecovery.get('orderType')
        const modalType = 'order'
        const accessToken = getState().auth.get('accessToken')
        dispatch(pending(actionTypes.ORDER_SKIP_RECOVERY_TRIGGERED, true))
        dispatch(error(actionTypes.ORDER_SKIP_RECOVERY_TRIGGERED, null))
        try {
            const {data} = await fetchOrderSkipContent(accessToken, orderId, orderDate)
            if (data.intervene) {
                dispatch(modalVisibilityChange({
                    orderId,
                    deliveryDayId,
                    status,
                    modalType,
                    data,
                }))
            } else if (status === 'pending') {
                await cancelPendingOrder(orderId, deliveryDayId)(dispatch, getState)
            } else {
                await cancelProjectedOrder(deliveryDayId)(dispatch, getState)
            }
        } catch (err) {
            dispatch(modalVisibilityChange({
                orderId,
                deliveryDayId,
                status,
                modalType,
            }))

            logger.error(err)
            dispatch(error(actionTypes.ORDER_SKIP_RECOVERY_TRIGGERED, err))
        } finally {
            dispatch(pending(actionTypes.ORDER_SKIP_RECOVERY_TRIGGERED, false))
        }
    }
)
