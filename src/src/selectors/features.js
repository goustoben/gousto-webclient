export const isCollectionsFeatureEnabled = state => (state.features.hasIn(['collections', 'value']) ||
	state.features.hasIn(['forceCollections', 'value']))

export const isJustForYouFeatureEnabled = state => state.features.hasIn(['justforyou', 'value'])
