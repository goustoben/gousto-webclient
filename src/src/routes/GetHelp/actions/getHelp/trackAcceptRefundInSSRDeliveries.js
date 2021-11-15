import { actionTypes as webClientActionTypes } from "actions/actionTypes"
import * as trackingKeys from "actions/trackingKeys"
import { SE_CATEGORY_HELP } from "routes/GetHelp/actions/getHelp/configuration"

export const trackAcceptRefundInSSRDeliveries = () => ({
    type: webClientActionTypes.TRACKING,
    trackingData: {
        actionType: trackingKeys.ssrDeliveriesAcceptRefund,
        seCategory: SE_CATEGORY_HELP,
    },
})
