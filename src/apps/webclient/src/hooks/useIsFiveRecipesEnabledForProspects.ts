import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
import { useAuth } from 'routes/Menu/domains/auth'

export const useIsFiveRecipesEnabledForProspects = (numPortions?: number) => {
  console.count('useIsFiveRecipesEnabledForProspects # calls')
  const fiveRecipesExperimentEnabled = useIsOptimizelyFeatureEnabled(
    'beetroots_five_recipes_web_enabled',
  )
  const { isAuthenticated } = useAuth()

  const isFiveRecipesExperimentEnabled = !isAuthenticated && !!fiveRecipesExperimentEnabled
  const isFiveRecipesEnabled = !!numPortions && isFiveRecipesExperimentEnabled && numPortions === 2

  return {
    isFiveRecipesEnabled,
    isFiveRecipesExperimentEnabled,
  }
}

const cache = new Map<string, boolean>()

export const useSaveFiveRecipesEnabledLoadHack = () => {
  const { isFiveRecipesExperimentEnabled } = useIsFiveRecipesEnabledForProspects()
  const fiveRecipesEnabled = cache.get('fiveRecipesEnabled') ?? false

  if (isFiveRecipesExperimentEnabled !== fiveRecipesEnabled) {
    cache.set('fiveRecipesEnabled', isFiveRecipesExperimentEnabled)
  }
}

export const getFiveRecipesEnabledLS = () => cache.get('fiveRecipesEnabled') ?? false
