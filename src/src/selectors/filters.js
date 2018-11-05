import { textReducer } from 'utils/text'
import { getCollectionIdWithName } from 'utils/collections'
import config from 'config/recipes'

export const getCurrentCollectionId = state => {
	console.log('getting current collection id')
	if (state.features.get('justforyou').get('value')) {
		console.log('has just for you feature flag')

		return getCollectionIdWithName(state, 'recommendations')
	}

	return state.filters.get('currentCollectionId')
}
export const getCurrentDietTypes = state => state.filters.get('dietTypes')
export const getCurrentTotalTime = state => state.filters.get('totalTime')
export const getDietaryAttributes = state => state.filters.get('dietaryAttributes')



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
