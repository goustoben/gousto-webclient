import { actionTypes } from "actions/actionTypes"
import * as trackingKeys from "actions/trackingKeys"

export const trackClickAppModalInstall = {
    type: actionTypes.TRACKING,
    trackingData: {
        actionType: trackingKeys.clickAppModalInstall
    }
}
