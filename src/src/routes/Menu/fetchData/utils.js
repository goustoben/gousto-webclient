import { getCollectionFreezeValue, isJustForYouFeatureEnabled } from 'selectors/features'
import { recommendationsShortTitle } from 'config/collections'
import { getCollectionIdWithName } from 'utils/collections'
import { collectionFilterIdRecieve } from 'actions/filters'

export const getPreselectedCollectionName = (state, collectionNameFromQueryParam) => {
	const featureCollectionFreeze = getCollectionFreezeValue(state)

	if (typeof featureCollectionFreeze === 'string' && featureCollectionFreeze.length > 0) {
		return featureCollectionFreeze
	} else if (isJustForYouFeatureEnabled(state) && !collectionNameFromQueryParam) {
		return recommendationsShortTitle
	}

	return collectionNameFromQueryParam
}

export const selectCollection = (state, collectionName, dispatch) => {
	const collectionId = getCollectionIdWithName(state, collectionName)

	if (collectionId) {
		dispatch(collectionFilterIdRecieve(collectionId))
	}
}
