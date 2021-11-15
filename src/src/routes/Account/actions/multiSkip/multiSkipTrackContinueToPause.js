import { actionTypes } from "actions/actionTypes"
import * as trackingKeys from "actions/trackingKeys"

export const multiSkipTrackContinueToPause = () => (dispatch) => {
    dispatch({
        type: actionTypes.TRACKING,
        trackingData: {
            actionType: trackingKeys.continueToPause
        }
    })
}
