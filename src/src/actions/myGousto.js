import { actionTypes } from 'actions/actionTypes'

export const trackNextBoxTrackingClick = orderId => ({
  type: actionTypes.TRACKING,
  trackingData: {
    actionType: 'TrackMyBox Clicked',
    orderId,
  }
})
