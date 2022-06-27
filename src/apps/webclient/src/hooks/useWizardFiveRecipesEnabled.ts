import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
import { useAuth } from 'routes/Menu/domains/auth'
import { useBasket, useSupportedBoxTypes } from 'routes/Menu/domains/basket'

// Default number is 4, it cannot be less.
const DEFAULT_MAX_RECIPES_NUM = 4

export const useWizardFiveRecipesEnabled = () => {
  const fiveRecipesExperimentEnabled = useIsOptimizelyFeatureEnabled(
    'beetroots_five_recipes_web_enabled',
  )
  // FYI: not sure about this one
  // does BE responding positive to prospects already???
  const { isAuthenticated } = useAuth()
  const { maxRecipesForPortion } = useSupportedBoxTypes()
  const { numPortions } = useBasket()

  const maxRecipesNum = maxRecipesForPortion(numPortions)
  const fiveRecipesEnabled = !isAuthenticated && fiveRecipesExperimentEnabled

  return {
    maxRecipesNum: fiveRecipesEnabled ? maxRecipesNum : DEFAULT_MAX_RECIPES_NUM,
    fiveRecipesEnabled,
  }
}
