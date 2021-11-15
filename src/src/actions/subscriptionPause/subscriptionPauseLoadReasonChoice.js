import { actionTypes } from "actions/actionTypes"

export function subscriptionPauseLoadReasonChoice(chosenReasonIds) {
    return {
        type: actionTypes.SUBSCRIPTION_PAUSE_REASON_CHOICE,
        chosenReasonIds,
    }
}
