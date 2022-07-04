import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'

export const useIsBundlesEnabled = (): boolean => {
  const featureValue = useIsOptimizelyFeatureEnabled(
    'etm_market_orderconfirmation_bundlesfakedoor_web_may22',
  )

  return Boolean(featureValue)
}
