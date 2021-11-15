import * as trackingKeys from "actions/trackingKeys"
import { actionTypes } from "actions/actionTypes"

export const trackingAppPromoBannerView = ({platform}) => (dispatch) => {
    const type = trackingKeys.viewAppBanner

    dispatch({
        type: actionTypes.TRACKING,
        trackingData: {
            actionType: type,
            platform,
        }
    })
}
