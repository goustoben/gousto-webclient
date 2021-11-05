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
  }
}

export const trackExperimentInSnowplow = (featureName, isOptimizelyFeatureEnabled, authUserId, sessionId) => (dispatch) => {
  const experimentData = experimentsConfig[featureName]
  if (experimentData) {
    dispatch({
      type: 'TRACKING_OPTIMIZELY_ROLLOUTS',
      trackingData: {
        actionType: optimizelyRolloutsExperiment,
        experiment_id: experimentData.id,
        experiment_name: experimentData.name,
        variation_name: isOptimizelyFeatureEnabled ? experimentData.variationName : experimentData.defaultName,
        user_logged_in: Boolean(authUserId),
        session_id: sessionId
      }
    })
  }
}
