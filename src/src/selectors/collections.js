import Immutable from 'immutable'

export const getCollectionIdByName = (state, name) => {
	if (!state.menuCollections || !name) {
		return null
	}

	return state.menuCollections
		.find(collection => collection.get('shortTitle') === name, null, Immutable.Map())
		.get('id', null)
}
