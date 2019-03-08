export const isCollectionsFeatureEnabled = state => (
  state.features ? (state.features.getIn(['collections', 'value']) || state.features.getIn(['forceCollections', 'value'])) : false
)

export const getCollectionFreezeValue = state => (state.features ? state.features.getIn(['collectionFreeze', 'value']) : '')

export const isNextDayDeliveryPaintedDoorFeatureEnabled = state => (state.features ? state.features.getIn(['nextDayDeliveryPaintedDoor', 'value']) : false)

export const getDisabledSlots = state => (state.features ? state.features.getIn(['disabledSlots', 'value']) : '')

export const getForceSignupWizard = state => (state.features ? state.features.getIn(['forceSignupWizard', 'value']) : false )

export const getGoToMyGousto = state => (state.features ? state.features.getIn(['goToMyGousto', 'value']) : false )

export const getGoToMyDeliveries = state => (state.features ? state.features.getIn(['goToMyDeliveries', 'value']) : false )

export const getJfyTutorial = state => (state.features ? state.features.getIn(['jfyTutorial', 'value']) : false)
 
