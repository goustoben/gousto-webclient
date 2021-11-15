import { actionTypes } from "actions/actionTypes"

export const setAffiliateSource = asource => (
    dispatch => {
        dispatch({
            type: actionTypes.AFFILIATE_SOURCE_SET,
            asource,
        })
    }
)
