import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'

export const useDoubleDeckerNav = (): boolean | null => {
  const featureValue = useIsOptimizelyFeatureEnabled('kales_double_decker_navbar')

  return featureValue
}
