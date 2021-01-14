import { actionTypes } from 'actions/actionTypes'

export const trackSkipOrderAddOnsClick = orderId => ({
  type: actionTypes.TRACKING,
  trackingData: {
    actionType: 'TrackSkipOrderAddOns Clicked',
    orderId,
  }
})

export const trackErrorSkipOrderAddOns = orderId => ({
  type: actionTypes.TRACKING,
  trackingData: {
    actionType: 'TrackSkipOrderAddsOns Error',
    orderId,
  }
})

export const trackContinueOrderAddOnsClick = (orderId, numberOfProducts) => ({
  type: actionTypes.TRACKING,
  trackingData: {
    actionType: 'TrackContinueOrderAddOns Clicked',
    orderId,
    numberOfProducts,
  }
})

