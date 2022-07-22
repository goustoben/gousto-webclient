// import { useMemo } from 'react'
import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
import { useAuth } from 'routes/Menu/domains/auth'

const cache = new Map<string, boolean>([
  ['isFiveRecipesEnabled', false],
  ['isFiveRecipesExperimentEnabled', false],
])

export const useIsFiveRecipesEnabledForProspects = (numPortions?: number) => {
  const fiveRecipesExperimentEnabled = useIsOptimizelyFeatureEnabled(
    'beetroots_five_recipes_web_enabled',
  )
  const { isAuthenticated } = useAuth()

  if (!cache.get('isFiveRecipesExperimentEnabled')) {
    cache.set('isFiveRecipesExperimentEnabled', !isAuthenticated && !!fiveRecipesExperimentEnabled)
  }

  if (!cache.get('isFiveRecipesEnabled')) {
    const isExperimentEnabled = cache.get('isFiveRecipesExperimentEnabled') ?? false
    const isFiveRecipesEnabled = !!numPortions && isExperimentEnabled && numPortions === 2
    cache.set('isFiveRecipesEnabled', isFiveRecipesEnabled)
  }

  return {
    isFiveRecipesEnabled: cache.get('isFiveRecipesEnabled'),
    isFiveRecipesExperimentEnabled: cache.get('isFiveRecipesExperimentEnabled'),
  }

  // return useMemo(() => {
  //   const isFiveRecipesExperimentEnabled = !isAuthenticated && fiveRecipesExperimentEnabled
  //   // FYI: This should be used at any other step except BoxSize
  //   const isFiveRecipesEnabled = numPortions
  //     ? isFiveRecipesExperimentEnabled && numPortions === 2
  //     : false

  //   return { isFiveRecipesEnabled, isFiveRecipesExperimentEnabled }
  // }, [fiveRecipesExperimentEnabled, isAuthenticated, numPortions])
}
