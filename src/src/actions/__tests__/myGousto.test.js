import { actionTypes } from 'actions/actionTypes'
import {
  trackNotificationLinkClick,
  trackNextBoxTrackingClick,
  trackOrderNotEligibleForSelfServiceResolutionClick,
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
})
