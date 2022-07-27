import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
import { BoxType, getBoxTypeNameByPortionSize } from 'routes/BoxPrices/boxPricesConfig'
import { useAuth } from 'routes/Menu/domains/auth'

export const useIsProspect = () => {
  const { isAuthenticated } = useAuth()

  return !isAuthenticated
}

/**
 * Both return values required, but for different components.
 * e.g. isFiveRecipesExperimentEnabled is used to check only feature flag.
 * On the other hand isFiveRecipesEnabled is used to check not only experiment, but
 * also to ensure that regular had been selected.
 */
export const useIsFiveRecipesEnabled = (numPortions?: number) => {
  const isFiveRecipesExperimentEnabled =
    useIsOptimizelyFeatureEnabled('beetroots_five_recipes_web_enabled') ?? false
  const boxType = getBoxTypeNameByPortionSize(numPortions)
  const isFiveRecipesEnabled =
    !!numPortions && isFiveRecipesExperimentEnabled && boxType === BoxType.Regular

  return {
    isFiveRecipesEnabled,
    isFiveRecipesExperimentEnabled,
  }
}

/**
 * This is important! All following code is meant to be used only on menu page.
 * When adding optimizely logic into useSupportedBoxTypes we faced some critical issues:
 * Users were not able to add 5th recipes.
 * Menu page has already had 7K calls of useSupportedBoxTypes just on initial load and about 1k calls on adding recipe.
 * After adding optimizely useSupportedBoxTypes calls increase to 15K on initial load and about 1.5K on add recipe click.
 * Because of this transition to menu from wizard took 5s+ and add recipe 2s+ delays.
 */
const cache = new Map<string, boolean>()

/**
 * This work around getting isFiveRecipesExperimentEnabled on one of the top levels of menu page.
 * And save this value to Map declared outside of hooks. (you can find Map above)
 */
export const useSaveFiveRecipesEnabledLoadHack = () => {
  const isProspect = useIsProspect()
  const { isFiveRecipesExperimentEnabled } = useIsFiveRecipesEnabled()
  const fiveRecipesEnabled = cache.get('fiveRecipesEnabled') ?? false

  if (isFiveRecipesExperimentEnabled !== fiveRecipesEnabled) {
    cache.set('fiveRecipesEnabled', isProspect && isFiveRecipesExperimentEnabled)
  }
}

/**
 * Instead of calling useIsFiveRecipesEnabled hook directly in useSupportedBoxTypes and increasing render time.
 * This cache getter should be used.
 */
export const getFiveRecipesEnabledFromCache = () => cache.get('fiveRecipesEnabled') ?? false
