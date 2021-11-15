import { actionTypes } from "actions/actionTypes"

export const startOnScreenRecoverySubscriptionFlow = () => (
    (dispatch) => {
        dispatch({
            type: actionTypes.ORDER_SKIP_RECOVERY_TRIGGERED,
            triggered: true,
            modalType: 'subscription',
        })
    }
)
