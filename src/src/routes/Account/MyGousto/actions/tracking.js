import { actionTypes } from 'actions/actionTypes'

export const trackNotificationLinkClick = notification => ({
  type: actionTypes.TRACKING,
  trackingData: {
    actionType: 'NotificationBanner Clicked',
    notification,
  },
})

export const trackMyGoustoSubscriberPricingBannerClick = () => ({
  type: actionTypes.TRACKING,
  trackingData: {
    actionType: 'click_subscriber_pricing_banner',
  }
})
