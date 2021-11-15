import { subscriptionPauseOSRTrack } from "actions/subscriptionPause/subscriptionPauseOSRTrack"
import { actionTypes } from "actions/actionTypes"

export function subscriptionTrackPauseAttempt(metaData) {
    return subscriptionPauseOSRTrack(actionTypes.PS_SUBSCRIPTION_PAUSE_ATTEMPT, {metaData})
}
