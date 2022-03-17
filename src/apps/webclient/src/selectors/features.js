import { createSelector } from 'reselect'

export const getFeatures = ({ features }) => features

export const isNextDayDeliveryPaintedDoorFeatureEnabled = ({ features }) => (
  features
    ? features.getIn(['nextDayDeliveryPaintedDoor', 'value'])
    : false
)

export const getNDDFeatureValue = ({ features }) => features.getIn(['ndd', 'value'])

export const getLogoutUserDisabledSlots = ({ features }) => (
  features
    ? features.getIn(['logoutUserDisabledSlots', 'value'])
    : ''
)

export const getGoToMyGousto = ({ features }) => (
  features
    ? features.getIn(['goToMyGousto', 'value'])
    : false
)

export const getGoToMyDeliveries = ({ features }) => (
  features
    ? features.getIn(['goToMyDeliveries', 'value'])
    : false
)

export const getAppBanner = ({ features }) => (
  features.getIn(['appBanner', 'value'], false)
)

export const isShowNoDiscountCTAFeatureEnabled = ({ features }) => (
  features && features.getIn(['showNoDiscountCTA', 'value'], false)
)

export const isSubscriptionPauseOsrFeatureEnabled = ({ features }) => (
  features && features.getIn(['subscriptionPauseOsr', 'value'], false)
)

export const isOsrOfferFeatureEnabled = ({ features }) => (
  features && features.getIn(['enableOsrOffer', 'value'], false)
)

export const getAbandonBasket = ({ features }) => (
  features && features.getIn(['abandonBasket', 'value'], false)
)

export const getPromoBannerEnabled = ({ features }) => (
  features && features.getIn(['promoBanner', 'value'], true)
)

export const getPromoBannerText = ({ features }) => (
  features && features.getIn(['promoBannerText', 'value'], '')
)

export const getPromoBannerCode = ({ features }) => (
  features && features.getIn(['promoBannerCode', 'value'], '')
)

export const getUserMenuVariant = ({ features }) => (
  features && features.getIn(['userMenuVariant', 'value'], '')
)

export const getFullScreenBoxSummary = ({ features }) => (features && features.getIn(['fullScreenBoxSummary', 'value'], false))

export const getPromoOfferVariant = ({ features }) => (features && features.getIn(['enableTVPromoAds', 'value']))

export const getIsSignupReductionEnabled = ({ features }) => (features && features.getIn(['enableSignupReduction', 'value'], false))

export const getIsCommunicationPanelEnabled = ({ features }) => (
  features && features.getIn(['isCommunicationPanelEnabled', 'value'], false)
)

export const getIsLoginModalAppAwarenessEnabled = ({ features }) => (
  features && features.getIn(['isLoginModalAppAwarenessEnabled', 'value'], false)
)

export const getIsMobileTopBannerAppAwarenessEnabled = ({ features }) => (
  features && features.getIn(['isMobileTopBannerAppAwarenessEnabled', 'value'], false)
)

export const getIsMobileMenuModalAppAwarenessEnabled = ({ features }) => (
  features && features.getIn(['isMobileMenuModalAppAwarenessEnabled', 'value'], false)
)

export const getIsCustomNoticeEnabled = ({ features }) => (
  features && features.getIn(['isCustomNoticeEnabled', 'value'], false)
)

export const getIsMyGoustoBannerAppAwarenessEnabled = ({ features }) => (
  features && features.getIn(['isMyGoustoBannerAppAwarenessEnabled', 'value'], false)
)

export const getisNewSSRDeliveriesEnabled = ({ features }) => (
  features && features.getIn(['isNewSSRDeliveriesEnabled', 'value'], false)
)

export const getIsMultiSkipEnabled = ({ features }) => (
  features && features.getIn(['isMultiSkipEnabled', 'value'], false)
)

export const getIsSubscriberPricingEnabled = ({ features }) => (
  features && features.getIn(['isSubscriberPricingEnabled', 'value'], false)
)

export const getIsMyGoustoBannerSubscriberPricingEnabled = ({ features }) => (
  features && features.getIn(['isMyGoustoBannerSubscriberPricingEnabled', 'value'], false)
)

export const getIsGoustoOnDemandEnabled = ({ features }) => (
  features && features.getIn(['isGoustoOnDemandEnabled', 'value'], false)
)

export const getIsAutoAcceptEnabled = ({ features }) => (
  features && features.getIn(['isAutoAcceptEnabled', 'value'], false)
)

export const getSsrTwoComplaintsSameDay = ({ features }) => (
  features && features.getIn(['ssrTwoComplaintsSameDay', 'value'], false)
)

export const getIsCorporateEnquiriesLinkVisible = ({ features }) => (
  features && features.getIn(['isCorporateEnquiriesLinkVisible', 'value'], true)
)

export const getIsSsrRepetitiveIssues = ({ features }) => (
  features && features.getIn(['isSsrRepetitiveIssues', 'value'], false)
)

export const getIsGiftCardsLinkVisible = ({ features }) => (
  features && features.getIn(['isGiftCardsLinkVisible', 'value'], true)
)

export const getIsBackClosesModalEnabled = createSelector(
  getFeatures,
  features => features.getIn(['isBackClosesModalEnabled', 'value'], false)
)
