import { useCallback } from 'react'

import { useDispatch } from 'react-redux'

import { actionTypes } from 'actions/actionTypes'

type TrackRecipeAlternativeOptionsMenuOpen = (args: {
  recipeId: string
  collectionId: string
}) => void
type TrackRecipeAlternativeOptionsMenuSwapRecipes = (args: {
  nextRecipeId: string
  previousRecipeId: string
  collectionId: string
}) => void

type TrackEventArguments = (
  | Parameters<TrackRecipeAlternativeOptionsMenuOpen>[0]
  | Parameters<TrackRecipeAlternativeOptionsMenuSwapRecipes>[0]
) & {
  event: string
}

export const useTracking = () => {
  const dispatch = useDispatch()

  const trackEvent = useCallback(
    (trackingData: TrackEventArguments) => {
      dispatch({
        type: actionTypes.TRACKING,
        trackingData,
      })
    },
    [dispatch],
  )

  const trackRecipeAlternativeOptionsMenuOpen: TrackRecipeAlternativeOptionsMenuOpen = useCallback(
    ({ recipeId, collectionId }) =>
      trackEvent({
        event: 'recipe-alternative-options-menu-open',
        recipeId,
        collectionId,
      }),
    [trackEvent],
  )

  const trackRecipeAlternativeOptionsMenuSwapRecipes: TrackRecipeAlternativeOptionsMenuSwapRecipes =
    useCallback(
      ({ previousRecipeId, nextRecipeId, collectionId }) =>
        trackEvent({
          event: 'recipe-alternative-options-menu-swap-recipes',
          collectionId,
          previousRecipeId,
          nextRecipeId,
        }),
      [trackEvent],
    )

  return {
    trackRecipeAlternativeOptionsMenuOpen,
    trackRecipeAlternativeOptionsMenuSwapRecipes,
  }
}
