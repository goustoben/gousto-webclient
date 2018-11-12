export const isCollectionsFeatureEnabled = state => (
  state.features ? (state.features.getIn(['collections', 'value']) || state.features.getIn(['forceCollections', 'value'])) : false
)

export const isJustForYouFeatureEnabled = state => (state.features ? state.features.getIn(['justforyou', 'value']) : false)

export const getCollectionFreezeValue = state => (state.features ? state.features.getIn(['collectionFreeze', 'value']) : '')
