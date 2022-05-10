import { canUseWindow } from 'utils/browserEnvironment'
import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'

export function useSelectedCuisines() {
  const featureEnabled = useIsOptimizelyFeatureEnabled('turnips_personalised_signup_enabled')

  if (!featureEnabled || !canUseWindow()) {
    return null
  }

  const storedCuisines = window.sessionStorage.getItem('selectedCuisines')
  const selectedCuisines = storedCuisines ? JSON.parse(storedCuisines) : []
  const cuisines = selectedCuisines.map((name) => name.toLowerCase())

  if (cuisines.includes('none of these')) {
    return null
  }

  return cuisines
}
