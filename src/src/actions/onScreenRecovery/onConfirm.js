import { cancelOrder } from "actions/onScreenRecovery/cancelOrder"
import { pauseSubscription } from "actions/onScreenRecovery/pauseSubscription"

export const onConfirm = () => (
    async (dispatch, getState) => {
        const modalType = getState().onScreenRecovery.get('modalType')
        if (modalType === 'order') {
            cancelOrder()(dispatch, getState)
        } else if (modalType === 'subscription') {
            pauseSubscription()(dispatch, getState)
        }
    }
)
