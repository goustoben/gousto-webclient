import { createSelector } from 'reselect'

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

export const isChoosePlanEnabled = ({ features }) => (
  features && features.getIn(['choosePlanRoute', 'value'], false)
)

export const getShowUserCredit = ({ features }) => (
  features && features.getIn(['showUserCredit', 'value'], false)
)

export const getFeatureShorterCompensationPeriod = ({ features }) => (
  features && features.getIn(['ssrShorterCompensationPeriod', 'value'], false)
)

export const getUserMenuVariant = ({ features }) => (
  features && features.getIn(['userMenuVariant', 'value'], '')
)

export const getFullScreenBoxSummary = ({ features }) => (features && features.getIn(['fullScreenBoxSummary', 'value'], false))

export const getPromoOfferVariant = ({ features }) => (features && features.getIn(['enableTVPromoAds', 'value']))

export const getIsSignupReductionEnabled = ({ features }) => (features && features.getIn(['enableSignupReduction', 'value'], false))

export const getIsWelcomePageOnboardingEnabled = ({ features }) => (
  features && features.getIn(['isWelcomePageOnboardingEnabled', 'value'], false)
)

export const getIsCommunicationPanelEnabled = ({ features }) => (
  features && features.getIn(['isCommunicationPanelEnabled', 'value'], false)
)

export const getBlockedResubscription = ({ features }) => (
  features && features.getIn(['blockedResubscription', 'value'], false)
)

export const getBlockedTransactionalOrders = ({ features }) => (
  features && features.getIn(['blockedTransactionalOrders', 'value'], false)
)

export const getLimitedCapacity = ({ features }) => (
  features && features.getIn(['limitedCapacity', 'value'], false)
)

export const getIsLimitedCapacityChristmas = ({ features }) => (
  features && features.getIn(['isLimitedCapacityChristmas', 'value'], false)
)

export const getIsHelpCentreActive = ({ features }) => (
  features && features.getIn(['isHelpCentreActive', 'value'], false)
)

export const getIs3DSForSignUpEnabled = ({ features }) => (
  features && features.getIn(['enable3DSForSignUp', 'value'], false)
)

export const getIsTastePreferencesEnabled = ({ features }) => (
  features && features.getIn(['tastePreferences', 'value'], false)
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

export const getIsNewSubscriptionApiEnabled = ({ features }) => (
  features && features.getIn(['isNewSubscriptionApiEnabled', 'value'], false)
)

export const getIsMenuRedirectPageEnabled = ({ features }) => (
  features && features.getIn(['isMenuRedirectPageEnabled', 'value'], false)
)

export const getIsSubscriberPricingEnabled = ({ features }) => (
  features && features.getIn(['isSubscriberPricingEnabled', 'value'], false)
)

export const getIsMyGoustoBannerSubscriberPricingEnabled = ({ features }) => (
  features && features.getIn(['isMyGoustoBannerSubscriberPricingEnabled', 'value'], false)
)

export const getIsWizardPricePerServingEnabled = ({ features }) => (
  features && features.getIn(['isWizardPricePerServingEnabled', 'value'], false)
)

export const getIsAdditionalCheckoutErrorsEnabled = ({ features }) => (
  features && features.getIn(['isAdditionalCheckoutErrorsEnabled', 'value'], false)
)

export const getIsPaymentBeforeChoosingV1Enabled = ({ features }) => (
  features && features.getIn(['isPaymentBeforeChoosingV1Enabled', 'value'], false)
)

export const getIsPaymentBeforeChoosingV2Enabled = ({ features }) => (
  features && features.getIn(['isPaymentBeforeChoosingV2Enabled', 'value'], false)
)

export const getIsPaymentBeforeChoosingV3Enabled = ({ features }) => (
  features && features.getIn(['isPaymentBeforeChoosingV3Enabled', 'value'], false)
)

export const getIsPaymentBeforeChoosingEnabled = createSelector(
  [getIsPaymentBeforeChoosingV1Enabled, getIsPaymentBeforeChoosingV2Enabled, getIsPaymentBeforeChoosingV3Enabled],
  (isPaymentBeforeChoosingV1Enabled, isPaymentBeforeChoosingV2Enabled, isPaymentBeforeChoosingV3Enabled) =>
    isPaymentBeforeChoosingV1Enabled || isPaymentBeforeChoosingV2Enabled || isPaymentBeforeChoosingV3Enabled
)

export const getIsDecoupledPaymentEnabled = ({ features }) => (
  features && features.getIn(['isDecoupledPaymentEnabled', 'value'], false)
)

export const getIsPromoCodeValidationEnabled = ({ features }) => (
  features && features.getIn(['isPromoCodeValidationEnabled', 'value'], false)
)

export const getIsHomepageFreeDeliveryEnabled = ({ features }) => (
  features && features.getIn(['isHomepageFreeDeliveryEnabled', 'value'], false)
)
