import { actionTypes as webClientActionTypes } from "actions/actionTypes"
import * as trackingKeys from "actions/trackingKeys"
import { SE_CATEGORY_HELP } from "routes/GetHelp/actions/getHelp/configuration"

export const trackSelectDeliveryCategory = (category) => ({
    type: webClientActionTypes.TRACKING,
    trackingData: {
        actionType: trackingKeys.ssrDeliveriesSelectCategory,
        category_name: category,
        seCategory: SE_CATEGORY_HELP,
    },
})
