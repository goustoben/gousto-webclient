import actionTypes from 'actions/actionTypes'

export const trackNotificationLinkClick = notification => dispatch => {
  dispatch({
    type: actionTypes.TRACKING,
    trackingData: {
      actionType: 'NotificationBanner Clicked',
      notification,
    },
  })
}
