import { useMemo } from 'react'

import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
import { useAuth } from 'routes/Menu/domains/auth'

export const useIsFiveRecipesEnabledForProspects = (numPortions?: number) => {
  const fiveRecipesExperimentEnabled = useIsOptimizelyFeatureEnabled(
    'beetroots_five_recipes_web_enabled',
  )
  const { isAuthenticated } = useAuth()

  return useMemo(() => {
    const isFiveRecipesExperimentEnabled = !isAuthenticated && !!fiveRecipesExperimentEnabled
    const isFiveRecipesEnabled =
      !!numPortions && isFiveRecipesExperimentEnabled && numPortions === 2

    return {
      isFiveRecipesEnabled,
      isFiveRecipesExperimentEnabled,
    }
  }, [isAuthenticated, numPortions, fiveRecipesExperimentEnabled])
}
