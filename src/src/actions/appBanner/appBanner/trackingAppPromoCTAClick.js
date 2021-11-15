import * as trackingKeys from "actions/trackingKeys"
import { actionTypes } from "actions/actionTypes"

export const trackingAppPromoCTAClick = ({platform}) => (dispatch) => {
    const type = trackingKeys.clickAppBannerInstall

    dispatch({
        type: actionTypes.TRACKING,
        trackingData: {
            actionType: type,
            platform,
        }
    })
}
