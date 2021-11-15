import { actionTypes as webClientActionTypes } from "actions/actionTypes"

export const trackDeliveryOther = () => ({
    type: webClientActionTypes.TRACKING,
    trackingData: {
        actionType: 'GetHelpTrackDeliveryOther Clicked',
    },
})
