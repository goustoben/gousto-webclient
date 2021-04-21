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

export const getHomePageRedesign = ({ features }) => (
  features && features.getIn(['isHomePageRedesignEnabled', 'value'], false)
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

export const getBoxPricesPageRedesign = ({ features }) => (
  features && features.getIn(['isBoxPricesPageRedesignEnabled', 'value'], false)
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

export const getPricingClarityRedesign = ({ features }) => (
  features && features.getIn(['isPricingClarityEnabled', 'value'], false)
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

export const getIsCheckoutOverhaulEnabled = ({ features }) => (
  features && features.getIn(['isCheckoutOverhaulEnabled', 'value'], false)
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

export const getIsMenuProgressBarHidden = ({ features }) => (
  features && features.getIn(['isMenuProgressBarHidden', 'value'], false)
)

export const getIsCheckoutOverhaulV1Enabled = ({ features }) => (
  features && features.getIn(['isCheckoutOverhaulV1Enabled', 'value'], false)
)

export const getIsCheckoutOverhaulV3Enabled = ({ features }) => (
  features && features.getIn(['isCheckoutOverhaulV3Enabled', 'value'], false)
)

export const getIsCheckoutOverhaulV4Enabled = ({ features }) => (
  features && features.getIn(['isCheckoutOverhaulV4Enabled', 'value'], false)
)

export const getIsCarouselShiftEnabled = ({ features }) => (
  features && features.getIn(['isCarouselShiftEnabled', 'value'], false)
)

export const getIsPassStrengthEnabled = ({ features }) => (
  features && features.getIn(['isPassStrengthEnabled', 'value'], false)
)

export const getIsAdditionalCheckoutErrorsEnabled = ({ features }) => (
  features && features.getIn(['isAdditionalCheckoutErrorsEnabled', 'value'], false)
)

export const getIsHomePageFlexibilityMessageEnabled = ({ features }) => (
  features && features.getIn(['isHomePageFlexibilityMessageEnabled', 'value'], false)
)
