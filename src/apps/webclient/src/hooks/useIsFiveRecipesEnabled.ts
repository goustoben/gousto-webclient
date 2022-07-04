import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
import { useAuth } from 'routes/Menu/domains/auth'
import { useBasket } from 'routes/Menu/domains/basket'

export const useIsFiveRecipesEnabled = () => {
  const fiveRecipesExperimentEnabled = useIsOptimizelyFeatureEnabled(
    'beetroots_five_recipes_web_enabled',
  )
  const { isAuthenticated } = useAuth()
  const { numPortions } = useBasket()

  // FYI: This should be used only on BoxSizeStep
  const isFiveRecipesEnabledBoxSize = !isAuthenticated && fiveRecipesExperimentEnabled
  // FYI: This should be used at any other step except BoxSize
  const isFiveRecipesEnabled = isFiveRecipesEnabledBoxSize && numPortions === 2

  return {
    isFiveRecipesEnabledBoxSize,
    isFiveRecipesEnabled,
  }
}
