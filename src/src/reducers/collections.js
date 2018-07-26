import Immutable from 'immutable' /* eslint-disable new-cap */
import types from './../actions/actionTypes'

const collectionsReducer = {
	collections: (state = Immutable.OrderedMap({}), action) => {
		switch (action.type) {
			case types.COOKBOOK_RECIEVE_COLLECTIONS:
			case types.COLLECTIONS_RECIEVE_COLLECTIONS: {
				return (action.collections || []).reduce((accumulator, collection) => {
					const newCollection = {
						...collection,
						recipes: [],
					}

					return accumulator.set(collection.id, accumulator.get(collection.id, Immutable.Map()).mergeDeep(Immutable.fromJS(newCollection)))
				}, state)
			}

			case types.COOKBOOK_RECIEVE_COLLECTION_RECIPES:
			case types.COLLECTIONS_RECIEVE_COLLECTION_RECIPES: {
				const { collectionId, recipes = [] } = action
				const recipeIds = recipes.reduce((accumulator, currentRecipe) => (
					accumulator.push(currentRecipe.id)
				), Immutable.List([]))

				return state.setIn([collectionId, 'recipes'], recipeIds)
			}

			default:
				return state
		}
	},
}

export default collectionsReducer
