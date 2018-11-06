export const isCollectionsFeatureEnabled = state => (
	(state.features.hasIn(['collections', 'value']) && state.features.getIn(['collections', 'value'])) ||
	(state.features.hasIn(['forceCollections', 'value']) && state.features.getIn(['forceCollections', 'value']))
)

export const isJustForYouFeatureEnabled = state => state.features.hasIn(['justforyou', 'value']) && state.features.getIn(['justforyou', 'value'])
