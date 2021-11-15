import { actionTypes as webClientActionTypes } from "actions/actionTypes"

export const trackNextBoxTrackingClick = orderId => ({
    type: webClientActionTypes.TRACKING,
    trackingData: {
        actionType: 'GetHelpTrackMyBox Clicked',
        orderId,
    }
})
