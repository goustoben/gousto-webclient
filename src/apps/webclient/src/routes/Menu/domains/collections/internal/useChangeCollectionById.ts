import { useDispatch } from 'react-redux'
import { push } from 'react-router-redux'

import { filtersCollectionChange } from 'actions/filters'

import { useDisplayedCollections } from './useDisplayedCollections'
import { useLocation } from './useLocation'

export const useChangeCollectionById = () => {
  const dispatch = useDispatch()
  const collections = useDisplayedCollections()
  const prevLoc = useLocation()

  return (collectionId: string) => {
    const query = { ...prevLoc.query }

    const matchingCollection = collections.find(
      (collection) => collection?.get('id') === collectionId,
    )

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
}
