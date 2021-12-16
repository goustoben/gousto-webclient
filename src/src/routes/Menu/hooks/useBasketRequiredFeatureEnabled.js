import { useSelector } from 'react-redux'
import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
import { getIsAuthenticated } from 'selectors/auth'

export const useBasketRequiredFeatureEnabled = () => {
  const featureName = useSelector(getIsAuthenticated)
    ? 'beetroots_menu_basket_required_for_existing_users_web_enabled'
    : 'beetroots_menu_basket_required_step_for_prospects_web_enabled'

  const isBasketRequiredFeatureEnabled = useIsOptimizelyFeatureEnabled(featureName)

  return isBasketRequiredFeatureEnabled
}
