import actions from 'actions'

export const preselectCollection = (state, collectionName, getCollectionIdWithName, dispatchCallback) => {
	const isCollectionsFeatureEnabled = (collectionName && (state.features.getIn(['collections', 'value']) || state.features.getIn(['forceCollections', 'value'])))
	const isJustForYouFeatureEnabled = state.features.getIn(['justforyou', 'value'])

	if (isCollectionsFeatureEnabled) {
		const queryParamCollectionId = getCollectionIdWithName(state, collectionName)
		if (queryParamCollectionId) {
			console.log(actions.filterCollectionChange)
			dispatchCallback(actions.filterCollectionChange(queryParamCollectionId))
		}
	} else if (isJustForYouFeatureEnabled) {
		const justForYouCollectionId = getCollectionIdWithName(state, 'recommendations')
		if (justForYouCollectionId) {
			console.log(actions.filterCollectionChange)

			dispatchCallback(actions.filterCollectionChange(justForYouCollectionId))
		}
	}
}


