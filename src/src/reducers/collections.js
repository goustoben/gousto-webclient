import Immutable from 'immutable'
import { actionTypes } from '../actions/actionTypes'

const collectionsReducer = {
  collections: (state = Immutable.OrderedMap({}), action) => {
    switch (action.type) {
    case actionTypes.COOKBOOK_RECEIVE_COLLECTIONS:
    case actionTypes.COLLECTIONS_RECEIVE_COLLECTIONS: {
      return (action.collections || []).reduce((accumulator, collection) => {
        const newCollection = {
          ...collection,
          recipes: [],
        }

        return accumulator.set(collection.id, accumulator.get(collection.id, Immutable.Map()).mergeDeep(Immutable.fromJS(newCollection)))
      }, state)
    }

    case actionTypes.COOKBOOK_RECEIVE_COLLECTION_RECIPES: {
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
