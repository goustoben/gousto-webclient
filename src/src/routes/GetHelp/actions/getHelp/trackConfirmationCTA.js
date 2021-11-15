import { getIsAutoAccept } from "routes/GetHelp/selectors/selectors"
import { getIsMultiComplaints } from "routes/GetHelp/selectors/compensationSelectors"
import { actionTypes as webClientActionTypes } from "actions/actionTypes"
import * as trackingKeys from "actions/trackingKeys"
import { SE_CATEGORY_HELP } from "routes/GetHelp/actions/getHelp/configuration"

export const trackConfirmationCTA = () => (dispatch, getState) => {
    const isAutoAccept = getIsAutoAccept(getState())
    const isMultiComplaint = getIsMultiComplaints(getState())

    dispatch({
        type: webClientActionTypes.TRACKING,
        trackingData: {
            actionType: trackingKeys.ssrClickDoneRefundAccepted,
            auto_accept: isAutoAccept,
            is_second_complaint: isMultiComplaint,
            seCategory: SE_CATEGORY_HELP,
        }
    })
}
