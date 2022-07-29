import { useSelector } from 'react-redux'

import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
import { getIsApplePayEnabled } from 'routes/Checkout/checkoutSelectors'

/**
 * Returns true if Apple Pay is supported by browser and feature is enabled.
 */
export const useIsApplePayEnabled = () => {
  const isFeatureEnabled = useIsOptimizelyFeatureEnabled('beetroots_apple_pay_web_enabled')
  const isApplePayEnabled = useSelector(getIsApplePayEnabled)

  return isFeatureEnabled && isApplePayEnabled
}
