import { getIsAutoAccept } from "routes/GetHelp/selectors/selectors"
import { getCompensation, getIsMultiComplaints } from "routes/GetHelp/selectors/compensationSelectors"
import { getIsMultiComplaintLimitReachedLastFourWeeks } from "routes/GetHelp/selectors/orderSelectors"
import { actionTypes as webClientActionTypes } from "actions/actionTypes"
import * as trackingKeys from "actions/trackingKeys"
import { SE_CATEGORY_HELP } from "routes/GetHelp/actions/getHelp/configuration"

export const trackIngredientsGetInTouchClick = () => (dispatch, getState) => {
    const isAutoAccept = getIsAutoAccept(getState())
    const {amount} = getCompensation(getState())
    const isMultiComplaint = getIsMultiComplaints(getState())
    const isMultiComplaintLimitReachedLastFourWeeks = getIsMultiComplaintLimitReachedLastFourWeeks(getState())

    dispatch({
        type: webClientActionTypes.TRACKING,
        trackingData: {
            actionType: trackingKeys.ssrIngredientsClickGetInTouch,
            amount,
            auto_accept: isAutoAccept,
            is_second_complaint: isMultiComplaint,
            seCategory: SE_CATEGORY_HELP,
            reason: isMultiComplaintLimitReachedLastFourWeeks ? 'multi_complaint_limit_last_four_week' : undefined
        }
    })
}
