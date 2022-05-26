import { useSelector } from 'react-redux'

import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
import { getIsAuthenticated } from 'selectors/auth'

export const useIsBundlesEnabled = (): boolean | null => {
  const isAuthenticated = useSelector(getIsAuthenticated)
  const featureValue = useIsOptimizelyFeatureEnabled(
    'etm_market_orderconfirmation_bundlesfakedoor_web_may22',
  )

  return isAuthenticated ? featureValue : false
}
