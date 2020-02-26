import { actionTypes as webClientActionTypes } from 'actions/actionTypes'

export const trackDeliveryOther = () => ({
  type: webClientActionTypes.TRACKING,
  trackingData: {
    actionType: 'GetHelpTrackDeliveryOther Clicked',
  },
})

export const trackDeliveryStatus = () => ({
  type: webClientActionTypes.TRACKING,
  trackingData: {
    actionType: 'GetHelpTrackDeliveryStatus Clicked',
  },
})

export const trackNextBoxTrackingClick = orderId => ({
  type: webClientActionTypes.TRACKING,
  trackingData: {
    actionType: 'GetHelpTrackMyBox Clicked',
    orderId,
  }
})
