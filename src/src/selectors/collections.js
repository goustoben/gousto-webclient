import Immutable from 'immutable' /* eslint-disable new-cap */

export const getCollectionIdByName = (state, name) => state.menuCollections
		.find(collection => collection.get('shortTitle') === name, null, Immutable.Map())
		.get('id', null)
