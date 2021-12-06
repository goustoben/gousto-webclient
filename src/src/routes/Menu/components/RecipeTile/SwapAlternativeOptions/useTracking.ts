import { actionTypes } from 'actions/actionTypes'
import { useDispatch } from 'react-redux'

type TrackRecipeAlternativeOptionsMenuOpen = (args: {recipeId: string, collectionId: string}) => void
type TrackRecipeAlternativeOptionsMenuSwapRecipes =
  (args: {nextRecipeId: string, previousRecipeId: string, collectionId: string}) => void

type TrackEventArguments =
  (
    | Parameters<TrackRecipeAlternativeOptionsMenuOpen>[0]
    | Parameters<TrackRecipeAlternativeOptionsMenuSwapRecipes>[0]
  ) & {
    event: string
  }

export const useTracking = () => {
  const dispatch = useDispatch()

  const trackEvent = (trackingData: TrackEventArguments) => {
    dispatch({
      type: actionTypes.TRACKING,
      trackingData,
    })
  }

  const trackRecipeAlternativeOptionsMenuOpen:TrackRecipeAlternativeOptionsMenuOpen = ({recipeId, collectionId}) => trackEvent({
    event: 'recipe-alternative-options-menu-open',
    recipeId,
    collectionId,
  })

  const trackRecipeAlternativeOptionsMenuSwapRecipes:TrackRecipeAlternativeOptionsMenuSwapRecipes =
    ({previousRecipeId, nextRecipeId, collectionId}) => trackEvent({
      event: 'recipe-alternative-options-menu-swap-recipes',
      collectionId,
      previousRecipeId,
      nextRecipeId,
    })

  return {
    trackRecipeAlternativeOptionsMenuOpen,
    trackRecipeAlternativeOptionsMenuSwapRecipes,
  }
}
