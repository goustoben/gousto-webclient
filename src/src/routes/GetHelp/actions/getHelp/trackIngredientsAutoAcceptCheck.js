import { actionTypes as webClientActionTypes } from "actions/actionTypes"
import * as trackingKeys from "actions/trackingKeys"
import { SE_CATEGORY_HELP } from "routes/GetHelp/actions/getHelp/configuration"

export const trackIngredientsAutoAcceptCheck = (isAutoAccept, isMultiComplaint) => ({
    type: webClientActionTypes.TRACKING,
    trackingData: {
        actionType: trackingKeys.ssrIngredientsAutoAcceptCheck,
        auto_accept: isAutoAccept,
        is_second_complaint: isMultiComplaint,
        seCategory: SE_CATEGORY_HELP,
    }
})
