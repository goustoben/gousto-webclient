import { actionTypes } from "actions/actionTypes"

export function subscriptionPauseLoadReasons(reasons) {
    return {
        type: actionTypes.SUBSCRIPTION_PAUSE_REASON_LOAD_REASONS,
        reasons,
    }
}
