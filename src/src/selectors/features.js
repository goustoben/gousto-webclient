export const isCollectionsFeatureEnabled = state => (
  state.features ? (state.features.getIn(['collections', 'value']) || state.features.getIn(['forceCollections', 'value'])) : false
)

export const getCollectionFreezeValue = state => (state.features ? state.features.getIn(['collectionFreeze', 'value']) : '')

export const isNextDayDeliveryPaintedDoorFeatureEnabled = state => (state.features ? state.features.getIn(['nextDayDeliveryPaintedDoor', 'value']) : false)

export const getDisabledSlots = state => (state.features ? state.features.getIn(['disabledSlots', 'value']) : '')

export const getForceSignupWizard = state => (state.features ? state.features.getIn(['forceSignupWizard', 'value']) : false)

export const getGoToMyGousto = state => (state.features ? state.features.getIn(['goToMyGousto', 'value']) : false)

export const getGoToMyDeliveries = state => (state.features ? state.features.getIn(['goToMyDeliveries', 'value']) : false)

export const getJfyTutorial = state => (state.features ? state.features.getIn(['jfyTutorial', 'value']) : false)

export const getRafPositionOnWelcomePage = state => (state.features ? state.features.getIn(['rafAboveCarouselOnWelcomePage', 'value']) : false)

export const isDeliveryFrequencyFeatureEnabled = ({ features }) => features.getIn(['wizardDeliveryFrequency', 'value'], false)

export const getAppBanner = ({ features }) => features.getIn(['appBanner', 'value'], false)

export const isShowNoDiscountCTAFeatureEnabled = ({ features }) => features && features.getIn(['showNoDiscountCTA', 'value'], false)

export const isSubscriptionPauseOsrFeatureEnabled = ({ features }) => features && features.getIn(['subscriptionPauseOsr', 'value'], false)

export const getAbandonBasket = ({ features }) => features && features.getIn(['abandonBasket', 'value'], false)

export const getWelcomePageAppPromo = ({ features }) => features && features.getIn(['welcomePageAppPromo', 'value'], false)

export const isCollapsedRafFeatureEnabled = ({ features }) => features && features.getIn(['collapsedRaf', 'value'], false)
