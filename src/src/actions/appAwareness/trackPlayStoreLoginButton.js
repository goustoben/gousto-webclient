import * as trackingKeys from "actions/trackingKeys"
import { actionTypes } from "actions/actionTypes"

export const trackPlayStoreLoginButton = () => (dispatch) => {
    const type = trackingKeys.clickPlayStoreLoginButton

    dispatch({
        type: actionTypes.TRACKING,
        trackingData: {
            actionType: type,
        }
    })
}
