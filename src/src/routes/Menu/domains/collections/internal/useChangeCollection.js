import { push } from 'react-router-redux'
import { filtersCollectionChange } from 'actions/filters'

export const useChangeCollection = (dispatch, prevLoc, collections) =>
  collectionId => {
    const query = { ...prevLoc.query }

    const matchingCollection = collections.find(collection => collection.get('id') === collectionId)

    if (!matchingCollection) {
      return
    }

    const collectionSlug = matchingCollection.get('slug') || ''

    if (collectionSlug) {
      query.collection = collectionSlug
    } else if (query.collection) {
      delete query.collection
    }

    if (collectionSlug) {
      dispatch(filtersCollectionChange(collectionSlug, collectionId))

      if (collectionSlug !== prevLoc.query.collection) {
        const newLoc = { ...prevLoc, query }
        dispatch(push(newLoc))
      }
    }
  }
