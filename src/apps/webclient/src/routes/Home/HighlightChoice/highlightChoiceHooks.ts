import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'

export const useIsHighlightChoiceFeatureEnabled = () =>
  useIsOptimizelyFeatureEnabled('beetroots_highlight_choice_web_enabled')
