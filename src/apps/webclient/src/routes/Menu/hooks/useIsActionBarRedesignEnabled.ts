import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
import { useAuth } from 'routes/Menu/domains/auth'

export const useIsActionBarRedesignEnabled = (): boolean | null => {
  const { isAuthenticated } = useAuth()
  const featureValue = useIsOptimizelyFeatureEnabled(
    'beetroots_action_bar_redesign_prospects_web_enabled',
  )

  if (isAuthenticated) {
    return false
  }

  return featureValue
}
