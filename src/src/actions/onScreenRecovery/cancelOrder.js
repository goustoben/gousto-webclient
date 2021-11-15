import { cancelProjectedOrder } from "actions/onScreenRecovery/cancelProjectedOrder"
import { cancelPendingOrder } from "actions/onScreenRecovery/cancelPendingOrder"

export const cancelOrder = () => (
    async (dispatch, getState) => {
        const orderType = getState().onScreenRecovery.get('orderType')
        if (orderType === 'pending') {
            cancelPendingOrder()(dispatch, getState)
        } else {
            cancelProjectedOrder()(dispatch, getState)
        }
    }
)
