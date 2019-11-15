import actionTypes from 'actions/actionTypes'

export const trackNotificationLinkClick = notification => ({
  type: actionTypes.TRACKING,
  trackingData: {
    actionType: 'NotificationBanner Clicked',
    notification,
  },
})
