import { actionTypes } from "actions/actionTypes"
import * as trackingKeys from "actions/trackingKeys"

export function subscriptionPauseTrackRecover() {
    return {
        type: actionTypes.TRACKING,
        trackingData: {
            actionType: trackingKeys.recoverSubscription
        }
    }
}
