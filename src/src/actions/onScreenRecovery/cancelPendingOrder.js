import logger from "utils/logger"
import { modalVisibilityChange } from "actions/onScreenRecovery/modalVisibilityChange"
import { orderCancel } from "actions/order/orderCancel"
import { redirect } from "actions/redirect/redirect"

export const cancelPendingOrder = (variation = 'default') => (
    async (dispatch, getState) => {
        const orderId = getState().onScreenRecovery.get('orderId')
        const deliveryDayId = getState().onScreenRecovery.get('deliveryDayId')
        const forceRefresh = getState().onScreenRecovery.get('forceRefresh')

        try {
            await dispatch(orderCancel(orderId, deliveryDayId, variation))
        } catch (err) {
            logger.error(err)
        } finally {
            if (forceRefresh) {
                dispatch(redirect('/my-deliveries'))
            }

            modalVisibilityChange({modalVisibility: false})(dispatch)
        }
    }
)
