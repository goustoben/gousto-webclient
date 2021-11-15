import { actionTypes } from "actions/actionTypes"

export function subscriptionPauseLoadStep(activeStepId) {
    return {
        type: actionTypes.SUBSCRIPTION_PAUSE_REASON_LOAD_STEP,
        activeStepId,
    }
}
