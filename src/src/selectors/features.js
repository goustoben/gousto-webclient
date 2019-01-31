export const isCollectionsFeatureEnabled = state => (
  state.features ? (state.features.getIn(['collections', 'value']) || state.features.getIn(['forceCollections', 'value'])) : false
)

export const getCollectionFreezeValue = state => (state.features ? state.features.getIn(['collectionFreeze', 'value']) : '')

export const isCheckoutPaymentFeatureEnabled = state => (state.features ? state.features.getIn(['checkoutPayment', 'value']): false)

export const getUnavailableSlots = state => (state.features ? state.features.getIn(['unavailableSlots', 'value']) : '')
