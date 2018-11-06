export const isCollectionsFeatureEnabled = state => (
	state.features.getIn(['collections', 'value']) || state.features.getIn(['forceCollections', 'value'])
)

export const isJustForYouFeatureEnabled = state => state.features.getIn(['justforyou', 'value'])
