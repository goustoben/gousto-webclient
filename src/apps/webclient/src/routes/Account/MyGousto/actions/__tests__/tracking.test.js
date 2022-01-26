import { actionTypes } from 'actions/actionTypes'
import {
  trackNotificationLinkClick,
  trackMyGoustoSubscriberPricingBannerClick,
} from '../tracking'

describe('myGousto tracking actions', () => {
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

  describe('trackMyGoustoSubscriberPricingBannerClick', () => {
    test('creates the tracking action', () => {
      expect(trackMyGoustoSubscriberPricingBannerClick()).toEqual({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: 'click_subscriber_pricing_banner',
        }
      })
    })
  })
})
