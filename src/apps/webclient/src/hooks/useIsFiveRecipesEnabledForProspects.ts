import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
import { useAuth } from 'routes/Menu/domains/auth'

export const useIsFiveRecipesEnabledForProspects = (numPortions?: number) => {
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

export const useSaveFiveRecipesEnabledLoadHack = () => {
  const { isFiveRecipesExperimentEnabled } = useIsFiveRecipesEnabledForProspects()
  const fiveRecipesEnabledLS = window.localStorage.getItem('fiveRecipesEnabled') ?? false
  const fiveRecipesEnabled = (fiveRecipesEnabledLS && JSON.parse(fiveRecipesEnabledLS)) ?? false

  if (isFiveRecipesExperimentEnabled !== fiveRecipesEnabled) {
    window.localStorage.setItem(
      'fiveRecipesEnabled',
      JSON.stringify(isFiveRecipesExperimentEnabled),
    )
  }
}

export const getFiveRecipesEnabledLS = () => {
  const fiveRecipesEnabledLS = window.localStorage.getItem('fiveRecipesEnabled') ?? false

  return (fiveRecipesEnabledLS && JSON.parse(fiveRecipesEnabledLS)) ?? false
}
