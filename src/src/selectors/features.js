import { menuServiceConfig } from 'config/menuService'

export const isNextDayDeliveryPaintedDoorFeatureEnabled = ({ features }) => (
  features
    ? features.getIn(['nextDayDeliveryPaintedDoor', 'value'])
    : false
)

export const getNDDFeatureValue = ({ features }) => {
  return features.getIn(['ndd', 'value'])
}

export const getDisabledSlots = ({ features }) => (
  features
    ? features.getIn(['disabledSlots', 'value'])
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

export const getRafPositionOnWelcomePage = ({ features }) => (
  features
    ? features.getIn(['rafAboveCarouselOnWelcomePage', 'value'])
    : false
)

export const isDeliveryFrequencyFeatureEnabled = ({ features }) => (
  features.getIn(['wizardDeliveryFrequency', 'value'], false)
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

export const getWelcomePageAppPromo = ({ features }) => (
  features && features.getIn(['welcomePageAppPromo', 'value'], false)
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

export const getHideBoxSummary = ({ features }) => (
  features && features.getIn(['hideBoxSummary', 'value'], false)
)

export const getAddOnsBeforeOrderConfirmation = ({ features }) => (
  features && features.getIn(['addOnsBeforeOrderConfirmation', 'value'], false)
)

export const getShowUserCredit = ({ features }) => (
  features && features.getIn(['showUserCredit', 'value'], false)
)

export const getMenuService = () => {
  if (menuServiceConfig.isEnabled) {
    return true
  }
  const b = document.cookie.match('(^|[^;]+)\\s*gousto_useNewMenuService\\s*=\\s*([^;]+)')

  return b && b[2] === 'true'
}

export const getFullScreenBoxSummary = ({ features }) => (features && features.getIn(['fullScreenBoxSummary', 'value'], false))
