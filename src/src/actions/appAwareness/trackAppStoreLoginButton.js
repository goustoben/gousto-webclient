import * as trackingKeys from "actions/trackingKeys"
import { actionTypes } from "actions/actionTypes"

export const trackAppStoreLoginButton = () => (dispatch) => {
    const type = trackingKeys.clickAppStoreLoginButton

    dispatch({
        type: actionTypes.TRACKING,
        trackingData: {
            actionType: type,
        }
    })
}
