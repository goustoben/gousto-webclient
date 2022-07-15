import { useCallback } from 'react'

import { useDispatch } from 'react-redux'

import { actionTypes } from 'actions/actionTypes'
import * as trackingKeys from 'actions/trackingKeys'
import { useCollections } from 'routes/Menu/domains/collections'

export const useTracking = () => {
  const dispatch = useDispatch()
  const { currentCollectionId } = useCollections()

  return useCallback(
    ({ targetCollectionId, recipeId }: { targetCollectionId: string; recipeId: string }) => {
      dispatch({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: trackingKeys.kales_clickDietaryCollectionLink,
          currentCollectionId,
          targetCollectionId,
          recipeId,
        },
      })
    },
    [dispatch, currentCollectionId],
  )
}
