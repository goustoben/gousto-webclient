import {
    getIsBoxDailyComplaintLimitReached,
    getIsMultiComplaintLimitReachedLastFourWeeks
} from "routes/GetHelp/selectors/orderSelectors"
import { actionTypes as webClientActionTypes } from "actions/actionTypes"
import * as trackingKeys from "actions/trackingKeys"

export const trackIngredientsGoToMyGousto = () => (dispatch, getState) => {
    const isMultiComplaintLimitReachedLastFourWeeks = getIsMultiComplaintLimitReachedLastFourWeeks(getState())
    const isBoxDailyComplaintLimitReached = getIsBoxDailyComplaintLimitReached(getState())
    let reason

    switch (true) {
        case isMultiComplaintLimitReachedLastFourWeeks:
            reason = 'multi_complaint_limit_last_four_week'
            break
        case isBoxDailyComplaintLimitReached:
            reason = 'box_daily_complaint_limit_reached'
            break
        default:
            break
    }

    dispatch({
        type: webClientActionTypes.TRACKING,
        trackingData: {
            actionType: trackingKeys.ssrIngredientsClickGoToMyGousto,
            reason
        }
    })
}
