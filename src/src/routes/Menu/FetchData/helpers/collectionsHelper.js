import { collectionFilterIdRecieve } from 'actions/filters'
import { isCollectionsFeatureEnabled, isJustForYouFeatureEnabled, getCollectionIdByName } from 'selectors/filters'

export const preselectCollection = (state, collectionName, dispatch) => {
	const collectionId = getCollectionIdByName(state, collectionName)
	if (collectionId) {
		if (isCollectionsFeatureEnabled(state)) {
			dispatch(collectionFilterIdRecieve(collectionId))
		} else if (isJustForYouFeatureEnabled(state)) {
			dispatch(collectionFilterIdRecieve(collectionId))
		}
	}
}
