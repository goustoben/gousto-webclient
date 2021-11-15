import { actionTypes } from "actions/actionTypes"
import * as trackingKeys from "actions/trackingKeys"

export const trackViewMultiSkip = () => (dispatch) => {
    dispatch({
        type: actionTypes.TRACKING,
        trackingData: {
            actionType: trackingKeys.viewMultiSkipBoxesScreen
        }
    })
}
