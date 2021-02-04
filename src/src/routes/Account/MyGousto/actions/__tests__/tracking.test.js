import { actionTypes } from 'actions/actionTypes'
import {
  trackNotificationLinkClick,
  trackOrderNotEligibleForSelfServiceResolutionClick,
  trackOrderEligibleForSelfServiceResolutionClick,
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

  describe('trackOrderNotEligibleForSelfServiceResolutionClick', () => {
    test('creates the tracking action', () => {
      const numberOfDaysSincePreviousOrder = 2

      expect(trackOrderNotEligibleForSelfServiceResolutionClick(numberOfDaysSincePreviousOrder))
        .toEqual({
          type: actionTypes.TRACKING,
          trackingData: {
            actionType: 'OrderNotEligibleForSelfServiceResolution Clicked',
            numberOfDaysSincePreviousOrder,
          }
        })
    })
  })

  describe('trackOrderEligibleForSelfServiceResolutionClick', () => {
    test('creates the tracking action', () => {
      const orderId = '12345'

      expect(trackOrderEligibleForSelfServiceResolutionClick(orderId)).toEqual({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: 'click_get_help_eligible',
          orderId,
        }
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
