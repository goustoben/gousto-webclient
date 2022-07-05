import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
import { useAuth } from 'routes/Menu/domains/auth'

export const useIsFiveRecipesEnabled = (numPortions?: number) => {
  const fiveRecipesExperimentEnabled =
    useIsOptimizelyFeatureEnabled('beetroots_five_recipes_web_enabled') || false
  const { isAuthenticated } = useAuth()

  // FYI: This should be used only on BoxSizeStep
  const isFiveRecipesExperimentEnabled = !isAuthenticated && fiveRecipesExperimentEnabled
  // FYI: This should be used at any other step except BoxSize
  const isFiveRecipesEnabled = numPortions
    ? isFiveRecipesExperimentEnabled && numPortions === 2
    : false

  return {
    isFiveRecipesExperimentEnabled,
    isFiveRecipesEnabled,
  }
}
