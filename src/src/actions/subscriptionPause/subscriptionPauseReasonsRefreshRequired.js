import { actionTypes } from "actions/actionTypes"

export function subscriptionPauseReasonsRefreshRequired(required) {
    const refreshRequired = required || false

    return {
        type: actionTypes.SUBSCRIPTION_PAUSE_REASONS_REFRESH_REQUIRED,
        refreshRequired,
    }
}
