import actions from 'actions'

export const preselectCollection = (state, collectionName, getCollectionIdWithName, dispatchCallback) => {
	const isCollectionsFeatureAllowed = (collectionName && (state.features.getIn(['collections', 'value']) || state.features.getIn(['forceCollections', 'value'])))
	const isJustForYouFeatureAllowed = state.features.get('justforyou').get('value')

	if (isCollectionsFeatureAllowed) {
		const queryParamCollectionId = getCollectionIdWithName(state, collectionName)
		if (queryParamCollectionId) {
			dispatchCallback(actions.filterCollectionChange(queryParamCollectionId))
		}
	} else if (isJustForYouFeatureAllowed) {
		const justForYouCollectionId = getCollectionIdWithName(state, 'recommendations')
		if (justForYouCollectionId) {
			dispatchCallback(actions.filterCollectionChange(justForYouCollectionId))
		}
	}
}


