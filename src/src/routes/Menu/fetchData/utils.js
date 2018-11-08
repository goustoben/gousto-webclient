import { getCollectionFreezeValue, isJustForYouFeatureEnabled } from 'selectors/features'
import { recommendationsShortTitle } from 'config/collections'
import { getCollectionIdWithName } from 'utils/collections'
import { collectionFilterIdRecieve } from 'actions/filters'

export const getPreselectedCollectionName = (state, defaultCollectionName) => {
	const featureCollectionFreeze = getCollectionFreezeValue(state)

	if (typeof featureCollectionFreeze === 'string' && featureCollectionFreeze.length > 0) {
		return featureCollectionFreeze
	} else if (isJustForYouFeatureEnabled(state)) {
		return recommendationsShortTitle
	}

	return defaultCollectionName
}

export const selectCollection = (state, collectionName, dispatch) => {
	const collectionId = getCollectionIdWithName(state, collectionName)

	if (collectionId) {
		dispatch(collectionFilterIdRecieve(collectionId))
	}
}
