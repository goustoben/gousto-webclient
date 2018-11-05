import { collectionFilterIdRecieve } from 'actions/filters'

export const preselectCollection = (state, collectionName, getCollectionIdWithName, dispatchCallback) => {
	const isCollectionsFeatureEnabled = (collectionName && (state.features.getIn(['collections', 'value']) || state.features.getIn(['forceCollections', 'value'])))
	const isJustForYouFeatureEnabled = state.features.getIn(['justforyou', 'value'])

	if (isCollectionsFeatureEnabled) {
		const queryParamCollectionId = getCollectionIdWithName(state, collectionName)
		if (queryParamCollectionId) {
			dispatchCallback(collectionFilterIdRecieve(queryParamCollectionId))
		}
	} else if (isJustForYouFeatureEnabled) {
		const justForYouCollectionId = getCollectionIdWithName(state, 'recommendations')
		if (justForYouCollectionId) {
			dispatchCallback(collectionFilterIdRecieve(justForYouCollectionId))
		}
	}
}


