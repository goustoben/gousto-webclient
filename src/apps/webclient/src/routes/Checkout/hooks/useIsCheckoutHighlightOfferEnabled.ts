import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
import { useAuth } from 'routes/Menu/domains/auth'

/**
 * FYI: for this experiment we should check whether user is prospect or not.
 * There is a custom hook implemented for that, but it is currently in TG-6651/support-5-recipes branch
 * and not merged into master
 */
export const useIsCheckoutHighlightOfferEnabled = () => {
  const isCheckoutHighlightOfferExperimentEnabled =
    useIsOptimizelyFeatureEnabled('beetroots_checkout_highlight_offer_web_enabled') ?? false
  const { isAuthenticated } = useAuth()

  return isCheckoutHighlightOfferExperimentEnabled && !isAuthenticated
}
