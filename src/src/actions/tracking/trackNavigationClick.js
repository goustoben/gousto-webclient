import { actionTypes } from "actions/actionTypes"

export const trackNavigationClick = (trackingData) => (
    (dispatch) => {
        dispatch({
            type: actionTypes.TRACKING,
            trackingData
        })
    }
)
