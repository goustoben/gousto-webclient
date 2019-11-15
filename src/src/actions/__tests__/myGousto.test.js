import actionTypes from 'actions/actionTypes'
import { trackNotificationLinkClick } from 'actions/myGousto'

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
})
