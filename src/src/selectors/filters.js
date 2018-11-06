import Immutable from 'immutable' /* eslint-disable new-cap */

import { textReducer } from 'utils/text'
import config from 'config/recipes'

export const getCurrentCollectionId = state => state.filters.get('currentCollectionId')
export const getCurrentDietTypes = state => state.filters.get('dietTypes')
export const getCurrentTotalTime = state => state.filters.get('totalTime')
export const getDietaryAttributes = state => state.filters.get('dietaryAttributes')

// TODO move these to separate selector file
export const isCollectionsFeatureEnabled = state => (state.features.hasIn(['collections', 'value']) ||
	state.features.hasIn(['forceCollections', 'value']))
export const isJustForYouFeatureEnabled = state => state.features.hasIn(['justforyou', 'value'])
export const getCollectionIdByName = (state, name) => state.menuCollections
		.find(collection => collection.get('shortTitle') === name, null, Immutable.Map())
		.get('id', null)
export const getJustForYouCollection = state => state.menuCollections.filter(collection => collection.slug === 'recommendations')

export const getShortTitle = (menuCollections, currentCollectionId) => {
	if (menuCollections.getIn([currentCollectionId, 'slug'], '') === 'recommendations') {
		return 'Just For You'
	}

return menuCollections.getIn([
		currentCollectionId,
		'shortTitle',
	], 'All Recipes')
}

export const getFilterCTAText = ({ filters, menuCollections }) => ([
	getShortTitle(menuCollections, filters.get('currentCollectionId')),
	filters.get('dietTypes', []).reduce((text, dietType) => textReducer(text, config.dietTypes[dietType]), ''),
	filters.get('dietaryAttributes', []).reduce((text, dietaryAttribute) => textReducer(text, config.dietaryAttributes[dietaryAttribute]), ''),
	config.totalTime[filters.get('totalTime', 0)],
].reduce(textReducer))

export default {
	getCurrentCollectionId,
	getFilterCTAText,
}
