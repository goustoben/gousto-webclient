import { getSkipRecoveryContent } from "actions/onScreenRecovery/getSkipRecoveryContent"
import { getPauseRecoveryContent } from "actions/onScreenRecovery/getPauseRecoveryContent"

export const getRecoveryContent = () => (
    async (dispatch, getState) => {
        const modalType = getState().onScreenRecovery.get('modalType')

        if (modalType === 'order') {
            getSkipRecoveryContent()(dispatch, getState)
        } else if (modalType === 'subscription') {
            getPauseRecoveryContent()(dispatch, getState)
        }
    }
)
