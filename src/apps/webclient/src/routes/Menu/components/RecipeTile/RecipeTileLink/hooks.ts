import { useDispatch } from 'react-redux'

import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
import { trackClickMoreRecipeDetails } from 'routes/Menu/actions/trackClickMoreRecipeDetails'
import { useAuth } from 'routes/Menu/domains/auth'

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
