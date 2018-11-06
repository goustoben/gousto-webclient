import { collectionFilterIdRecieve } from 'actions/filters'
import { isCollectionsFeatureEnabled, isJustForYouFeatureEnabled, getCollectionIdByName } from 'selectors/filters'

export const selectCollection = (state, collectionName, dispatch) => {
	const collectionId = getCollectionIdByName(state, collectionName)
	if (collectionId) {
		dispatch(collectionFilterIdRecieve(collectionId))
	}
}

export const shouldPreselectCollection = state => isCollectionsFeatureEnabled(state) || isJustForYouFeatureEnabled(state)
