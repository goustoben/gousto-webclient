import { useSelector } from 'react-redux'
import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
import { getIsAuthenticated } from 'selectors/auth'

export const useIsActionBarRedesignEnabled = (): boolean | null => {
  const isAuthenticated = useSelector(getIsAuthenticated)
  const featureValue = useIsOptimizelyFeatureEnabled(
    'beetroots_action_bar_redesign_prospects_web_enabled'
  )

  if (isAuthenticated) {
    return false
  }

  return featureValue
}
