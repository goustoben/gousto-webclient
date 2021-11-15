import { actionTypes } from "actions/actionTypes"

export function subscriptionPauseReasonsReceive(reasons, metaData) {
    return {
        type: actionTypes.SUBSCRIPTION_PAUSE_REASONS_RECEIVE,
        reasons,
        metaData,
    }
}
