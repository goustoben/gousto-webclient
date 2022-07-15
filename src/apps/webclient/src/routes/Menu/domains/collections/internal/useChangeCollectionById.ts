import { useCallback } from 'react'

import { useDispatch } from 'react-redux'
import { push } from 'react-router-redux'

import { actionTypes } from 'actions/actionTypes'
import { recipeCollectionSelected } from 'actions/trackingKeys'

import { useCurrentCollectionId } from './useCurrentCollection'
import { useDisplayedCollections } from './useDisplayedCollections'
import { useLocation } from './useLocation'

function useTracking() {
  const dispatch = useDispatch()
  const currentCollectionId = useCurrentCollectionId()

  return useCallback(
    (newCollectionId: string) => {
      dispatch({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: recipeCollectionSelected,
          collectionId: newCollectionId,
          fromCollectionId: currentCollectionId,
        },
      })
    },
    [dispatch, currentCollectionId],
  )
}

export const useChangeCollectionById = () => {
  const dispatch = useDispatch()
  const collections = useDisplayedCollections()
  const prevLoc = useLocation()
  const track = useTracking()

  return useCallback(
    (collectionId: string) => {
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

      if (collectionSlug && collectionSlug !== prevLoc.query.collection) {
        track(collectionId)

        const newLoc = { ...prevLoc, query }
        dispatch(push(newLoc))
      }
    },
    [dispatch, collections, prevLoc, track],
  )
}
