export const isCollectionsFeatureEnabled = state => (state.features.hasIn(['collections', 'value']) ||
	state.features.hasIn(['forceCollections', 'value']))

export const isJustForYouFeatureEnabled = state => state.features.hasIn(['justforyou', 'value'])

export const getCollectionIdByName = (state, name) => state.menuCollections
		.find(collection => collection.get('shortTitle') === name, null, Immutable.Map())
		.get('id', null)
