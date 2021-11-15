import { subscriptionPauseOSRTrack } from "actions/subscriptionPause/subscriptionPauseOSRTrack"
import { actionTypes } from "actions/actionTypes"

export function subscriptionTrackCategoriesViewed() {
    return subscriptionPauseOSRTrack(actionTypes.PS_REASON_CATEGORY_MODAL_VIEWED)
}
