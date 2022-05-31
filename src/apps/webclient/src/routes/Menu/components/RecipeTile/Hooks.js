import { useDispatch, useSelector } from 'react-redux'

import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
import { trackClickMoreRecipeDetails } from 'routes/Menu/actions/trackClickMoreRecipeDetails'
import { useAuth } from 'routes/Menu/domains/auth'

import { getRecipeSurcharge } from '../../selectors/recipe'

export const useGetSurchargeForRecipeId = (recipeId) =>
  useSelector((state) => getRecipeSurcharge(state, { recipeId })) || 0

export function useGetRecipeTileLinkData() {
  const dispatch = useDispatch()
  const { isAuthenticated } = useAuth()
  const isRecipeCardLinkEnabled = useIsOptimizelyFeatureEnabled(
    'beetroots_recipe_card_link_web_enabled',
  )

  return {
    isRecipeTileLinkVisible: !isAuthenticated && isRecipeCardLinkEnabled,
    dispatchTrackClickMoreRecipeDetails: () => dispatch(trackClickMoreRecipeDetails()),
  }
}
