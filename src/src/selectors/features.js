import { delivery_tariff_types } from 'utils/deliveries'

export const isCollectionsFeatureEnabled = ({ features }) => (
  features
    ? (features.getIn(['collections', 'value']) || features.getIn(['forceCollections', 'value']))
    : false
)

export const getCollectionFreezeValue = ({ features }) => (
  features ? features.getIn(['collectionFreeze', 'value']) : ''
)

export const isNextDayDeliveryPaintedDoorFeatureEnabled = ({ features }) => (
  features
    ? features.getIn(['nextDayDeliveryPaintedDoor', 'value'])
    : false
)

export const isNDDFeatureEnabled = ({ features, user }) => {
  const userHasNDD = (user && user.get('deliveryTariffId', '')) == delivery_tariff_types.FREE_NDD
  const isNDDEnabled = (features && features.getIn(['ndd', 'value'], false))

  return (userHasNDD || isNDDEnabled)
}

export const getDisabledSlots = ({ features }) => (
  features
    ? features.getIn(['disabledSlots', 'value'])
    : ''
)

export const getForceSignupWizard = ({ features }) => (
  features
    ? features.getIn(['forceSignupWizard', 'value'])
    : false
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

export const getJfyTutorial = ({ features }) => (
  features ? features.getIn(['jfyTutorial', 'value']) : false
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

export const getAbandonBasket = ({ features }) => (
  features && features.getIn(['abandonBasket', 'value'], false)
)

export const getWelcomePageAppPromo = ({ features }) => (
  features && features.getIn(['welcomePageAppPromo', 'value'], false)
)

export const getPromoBannerText = ({ features }) => (
  features && features.getIn(['promoBannerText', 'value'], '')
)

export const getPromoBannerCode = ({ features }) => (
  features && features.getIn(['promoBannerCode', 'value'], '')
)

export const getShortlist = ({ features }) => (
  features && features.getIn(['shortlist', 'value'], false)
)

export const isChoosePlanEnabled = ({ features }) => (
  features && features.getIn(['choosePlanRoute', 'value'], false)
)

export const getProductList2Columns = ({ features }) => (
  features && features.getIn(['productList2Columns', 'value'], false)
)

export const getCookingInstruction = ({ features }) => (
  features && features.getIn(['showCookingInstruction', 'value'], false)
)
