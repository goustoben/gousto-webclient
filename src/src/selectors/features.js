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

export const getCookingInstruction = ({ features }) => (
  features && features.getIn(['showCookingInstruction', 'value'], false)
)

export const getAddOnsBeforeOrderConfirmation = ({ features }) => (
  features && features.getIn(['addOnsBeforeOrderConfirmation', 'value'], false)
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

export const isAccountTabNameTest = ({ features }) => (
  features && features.getIn(['accountTabNameTest', 'value'], false)
)

export const getHideMenuBanner = ({ features }) => (features && features.getIn(['hideMenuBanner', 'value'], false))

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
