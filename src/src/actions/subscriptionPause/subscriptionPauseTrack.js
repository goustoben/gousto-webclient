import config from "config/subscription"
import { actionTypes } from "actions/actionTypes"

const pauseModalTrackingPrefix = config.tracking.pauseModalPrefix

export function subscriptionPauseTrack(key, data = {}) {
    return {
        type: actionTypes.TRACKING,
        trackingData: {
            actionType: `${pauseModalTrackingPrefix}${key}`,
            ...data,
        },
    }
}
