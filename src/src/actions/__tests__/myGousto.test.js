import actionTypes from 'actions/actionTypes'
import { trackNotificationLinkClick } from 'actions/myGousto'

describe('myGousto actions', () => {
  describe('trackNotificationLinkClick', () => {
    const dispatch = jest.fn()

    it('should call the tracking action with SubscriptionOption Selected', () => {
      const notification = 'test-notification'
      trackNotificationLinkClick(notification)(dispatch)

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: 'NotificationBanner Clicked',
          notification,
        },
      })
    })
  })
})
