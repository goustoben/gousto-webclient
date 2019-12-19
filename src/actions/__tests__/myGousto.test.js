import actionTypes from 'actions/actionTypes'
import {
  trackNotificationLinkClick,
  trackNextBoxTrackingClick,
} from 'actions/myGousto'

describe('myGousto actions', () => {
  describe('trackNotificationLinkClick', () => {
    test('creates the tracking action', () => {
      const notification = 'test-notification'

      expect(trackNotificationLinkClick(notification)).toEqual({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: 'NotificationBanner Clicked',
          notification,
        },
      })
    })
  })

  describe('trackNextBoxTrackingClick', () => {
    test('creates the tracking action', () => {
      const orderId = '12345'

      expect(trackNextBoxTrackingClick(orderId)).toEqual({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: 'TrackMyBox Clicked',
          orderId,
        }
      })
    })
  })
})
