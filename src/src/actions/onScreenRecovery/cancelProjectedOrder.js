import logger from "utils/logger"
import { modalVisibilityChange } from "actions/onScreenRecovery/modalVisibilityChange"
import { projectedOrderCancel } from "actions/order/projectedOrderCancel"
import { redirect } from "actions/redirect/redirect"

export const cancelProjectedOrder = (variation = 'default') => (
    async (dispatch, getState) => {
        const deliveryDayId = getState().onScreenRecovery.get('deliveryDayId')
        const forceRefresh = getState().onScreenRecovery.get('forceRefresh')

        try {
            await dispatch(projectedOrderCancel(deliveryDayId, deliveryDayId, variation))
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
