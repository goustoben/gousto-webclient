import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'

export const useFiveRecipeSubscriptionOption = (): boolean | null => {
  const featureValue = useIsOptimizelyFeatureEnabled('rockets_enable_five_recipes_subs')

  return featureValue
}
