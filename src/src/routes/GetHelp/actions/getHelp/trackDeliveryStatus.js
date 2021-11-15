import { actionTypes as webClientActionTypes } from "actions/actionTypes"

export const trackDeliveryStatus = () => ({
    type: webClientActionTypes.TRACKING,
    trackingData: {
        actionType: 'GetHelpTrackDeliveryStatus Clicked',
    },
})
