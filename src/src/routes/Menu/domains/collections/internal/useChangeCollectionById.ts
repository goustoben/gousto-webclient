import { useDispatch } from 'react-redux'
import { push } from 'react-router-redux'
import type { Dispatch } from 'react'
import { filtersCollectionChange } from 'actions/filters'
import { useDisplayedCollections } from './useDisplayedCollections'
import { useLocation } from './useLocation'

type ChangeCollectionById = {
  type: string
  collectionName: string
  collectionId: string
  trackingData: {
    actionType: string
    collectionId: string
  }
}

export const useChangeCollectionById = (): Function => {
  const dispatch = useDispatch()
  const collections = useDisplayedCollections()
  const prevLoc = useLocation()

  return (collectionId: string): Dispatch<ChangeCollectionById> | undefined => {
    const query = { ...prevLoc.query }

    const matchingCollection = collections.find(
      (collection) => collection !== undefined && collection.get('id') === collectionId
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
