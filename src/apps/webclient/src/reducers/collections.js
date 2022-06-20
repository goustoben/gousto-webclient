import Immutable from 'immutable'
import { actionTypes } from '../actions/actionTypes'

export const collectionsReducers = {
  collections: (state = Immutable.OrderedMap({}), action) => {
    switch (action.type) {
    case actionTypes.COLLECTIONS_RECEIVE_COLLECTIONS: {
      return (action.collections || []).reduce((accumulator, collection) => {
        const newCollection = {
          ...collection,
          recipes: [],
        }

        return accumulator.set(collection.id, accumulator.get(collection.id, Immutable.Map()).mergeDeep(Immutable.fromJS(newCollection)))
      }, state)
    }

    default:
      return state
    }
  },
}
