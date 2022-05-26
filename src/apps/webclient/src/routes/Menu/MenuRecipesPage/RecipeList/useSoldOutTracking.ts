import { useCallback } from 'react'

import { useDispatch } from 'react-redux'

import { actionTypes } from 'actions/actionTypes'
import * as trackingKeys from 'actions/trackingKeys'

export const useSoldOutTracking = () => {
  const dispatch = useDispatch()

  const trackSoldOutRecipes = useCallback(
    (soldOutRecipes: string[] | null) => {
      if (soldOutRecipes === null) {
        return
      }

      dispatch({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: trackingKeys.soldOutRecipes,
          soldOutRecipes,
        },
      })
    },
    [dispatch],
  )

  return {
    trackSoldOutRecipes,
  }
}
