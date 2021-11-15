import { actionTypes } from "actions/actionTypes"

export function subscriptionPauseLoadStaticScreen(screenType) {
    return {
        type: actionTypes.SUBSCRIPTION_PAUSE_REASON_LOAD_STATIC_SCREEN,
        screenType,
    }
}
