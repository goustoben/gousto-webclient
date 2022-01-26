import { useSetupOptimizelyOverride } from './useOptimizely.hook'
export { getOptimizelyInstance } from './optimizelySDK'
export { OptimizelyFeature } from './OptimizelyFeature'
export { isOptimizelyFeatureEnabledFactory } from './optimizelyUtils'
export { useIsOptimizelyFeatureEnabled } from './useOptimizely.hook'

export const SetupOptimizelyOverride = () => {
  useSetupOptimizelyOverride()

  return null
}
