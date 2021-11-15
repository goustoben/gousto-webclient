import { actionTypes } from "actions/actionTypes"

export function subscriptionPauseVisibilityChange(visible) {
    return {
        type: actionTypes.SUBSCRIPTION_PAUSE_VISIBILITY_CHANGE,
        visible,
    }
}
