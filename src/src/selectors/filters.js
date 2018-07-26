export const getCurrentCollectionId = state => state.filters.get('currentCollectionId')
export const getCurrentDietTypes = state => state.filters.get('dietTypes')
export const getCurrentTotalTime = state => state.filters.get('totalTime')
export const getDietaryAttributes = state => state.filters.get('dietaryAttributes')

export default {
	getCurrentCollectionId,
}
