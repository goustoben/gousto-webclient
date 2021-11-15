import { keepOrder } from "actions/onScreenRecovery/keepOrder"
import { keepSubscription } from "actions/onScreenRecovery/keepSubscription"

export const onKeep = () => (
    async (dispatch, getState) => {
        const modalType = getState().onScreenRecovery.get('modalType')
        if (modalType === 'order') {
            keepOrder()(dispatch, getState)
        } else if (modalType === 'subscription') {
            keepSubscription()(dispatch, getState)
        }
    }
)
