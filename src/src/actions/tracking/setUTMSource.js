import { actionTypes } from "actions/actionTypes"
import { getUTM } from "utils/utm"

export const setUTMSource = () => (dispatch, getState) => {
    const {tracking} = getState()

    if (!tracking.get('utmSource')) {
        dispatch({
            type: actionTypes.SET_UTM_SOURCE,
            payload: {
                ...getUTM()
            }
        })
    }
}
