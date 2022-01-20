import { optimizelyRolloutsExperiment } from '../../actions/trackingKeys'

const experimentsConfig = {
  testFeature: {
    id: 'TestFeature',
    name: 'Test Feature',
    variationName: 'Variation',
    defaultName: 'Control',
  },
  radishes_menu_api_recipe_agnostic_sides_mvp_web_enabled: {
    id: 'radishes_menu_api_recipe_agnostic_sides_mvp_web_enabled',
    name: 'Radishes menu api recipe agnostic sides MVP web enabled',
    variationName: 'Variation',
    defaultName: 'Control',
  },
  kales_remove_cfy_collection: {
    id: 'kales_remove_cfy_collection',
    name: 'Kales remove CFY collection',
    variationName: 'Variation',
    defaultName: 'Control',
  },
  beetroots_menu_basket_required_for_existing_users_web_enabled: {
    id: 'beetroots_menu_basket_required_for_existing_users_web_enabled',
    name: 'Beetroots menu basket required for existing users web enabled',
    variationName: 'Variation',
    defaultName: 'Control',
  },
  beetroots_menu_basket_required_step_for_prospects_web_enabled: {
    id: 'beetroots_menu_basket_required_step_for_prospects_web_enabled',
    name: 'Beetroots menu basket required step for prospects web enabled',
    variationName: 'Variation',
    defaultName: 'Control',
  },
  beetroots_test_allocation_hook_web: {
    id: 'beetroots_test_allocation_hook_web',
    name: 'Beetroots - Optimizely Rollouts allocation, hook mechanism',
    variationName: 'Variation',
    defaultName: 'Control',
  },
  beetroots_test_allocation_container_web: {
    id: 'beetroots_test_allocation_container_web',
    name: 'Beetroots - Optimizely Rollouts allocation, container mechanism',
    variationName: 'Variation',
    defaultName: 'Control',
  },
  beetroots_test_allocation_factory_web: {
    id: 'beetroots_test_allocation_factory_web',
    name: 'Beetroots - Optimizely Rollouts allocation, factory mechanism',
    variationName: 'Variation',
    defaultName: 'Control',
  },
}

// When several different places in the app work off the same feature flag,
// it's superfluous to send the tracking requests beyond the first.
const sentCache = new Map()

const createKey = (featureName, authUserId, sessionId) =>
  [featureName, authUserId, sessionId].join(':')

export const trackExperimentInSnowplow = (featureName, isOptimizelyFeatureEnabled, authUserId, sessionId, userIdForOptimizely) => (dispatch) => {
  const experimentData = experimentsConfig[featureName]
  if (experimentData) {
    const key = createKey(featureName, authUserId, sessionId)
    if (sentCache.has(key) && sentCache.get(key) === isOptimizelyFeatureEnabled) {
      return
    }

    sentCache.set(key, isOptimizelyFeatureEnabled)

    const trackingData = {
      actionType: optimizelyRolloutsExperiment,
      experiment_id: experimentData.id,
      experiment_name: experimentData.name,
      variation_name: isOptimizelyFeatureEnabled
        ? experimentData.variationName
        : experimentData.defaultName,
      user_logged_in: Boolean(authUserId),
      session_id: sessionId,
      user_id_for_optimizely: userIdForOptimizely,
    }

    dispatch({
      type: 'TRACKING_OPTIMIZELY_ROLLOUTS',
      trackingData,
    })
  }
}
