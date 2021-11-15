import { actionTypes } from "actions/actionTypes"
import * as trackingKeys from "actions/trackingKeys"

export const trackAppModalView = {
    type: actionTypes.TRACKING,
    trackingData: {
        actionType: trackingKeys.viewAppModal
    }
}
