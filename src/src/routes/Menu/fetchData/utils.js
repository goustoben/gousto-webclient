import { isJustForYouFeatureEnabled } from 'selectors/features'
import { recommendationsShortTitle } from 'config/collections'

export const getCollectionName = (state, defaultCollectionName) => {
	const featureCollectionFreeze = state.features.getIn(['collectionFreeze', 'value'])

	if (typeof featureCollectionFreeze === 'string' && featureCollectionFreeze.length > 0) {
		return featureCollectionFreeze
	} else if (isJustForYouFeatureEnabled(state)) {
		return recommendationsShortTitle
	}

	return defaultCollectionName
}
