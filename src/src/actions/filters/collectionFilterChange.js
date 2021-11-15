import { getDisplayedCollections } from "routes/Menu/selectors/collections"
import { filtersCollectionChange } from "actions/filters/filtersCollectionChange"
import { push } from "react-router-redux"

export function collectionFilterChange(collectionId) {
  return (dispatch, getState) => {
    const prevLoc = getState().routing.locationBeforeTransitions
    const query = {...prevLoc.query}

    const navCollections = getDisplayedCollections(getState())
    const matchingNavCollection = navCollections.some(collection => collection.get('id') === collectionId)

    if (!matchingNavCollection) {
      return
    }

    const collectionName = getState().menuCollections.getIn([collectionId, 'slug'], '')
    if (collectionName) {
      query.collection = collectionName
    } else if (query.collection) {
      delete query.collection
    }

    if (collectionName) {
      dispatch(filtersCollectionChange(collectionName, collectionId))

      if (collectionName !== prevLoc.query.collection) {
        const newLoc = {...prevLoc, query}
        dispatch(push(newLoc))
      }
    }
  }
}
