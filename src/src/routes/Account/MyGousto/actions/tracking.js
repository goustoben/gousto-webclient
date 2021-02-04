import { actionTypes } from 'actions/actionTypes'

export const trackNotificationLinkClick = notification => ({
  type: actionTypes.TRACKING,
  trackingData: {
    actionType: 'NotificationBanner Clicked',
    notification,
  },
})

export const trackOrderNotEligibleForSelfServiceResolutionClick = numberOfDaysSincePreviousOrder =>
  ({
    type: actionTypes.TRACKING,
    trackingData: {
      actionType: 'OrderNotEligibleForSelfServiceResolution Clicked',
      numberOfDaysSincePreviousOrder,
    }
  })

export const trackOrderEligibleForSelfServiceResolutionClick = orderId => ({
  type: actionTypes.TRACKING,
  trackingData: {
    actionType: 'click_get_help_eligible',
    orderId,
  }
})

export const trackMyGoustoSubscriberPricingBannerClick = () => ({
  type: actionTypes.TRACKING,
  trackingData: {
    actionType: 'click_subscriber_pricing_banner',
  }
})
