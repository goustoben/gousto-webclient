import { optimizelyRolloutsExperiment } from '../../actions/trackingKeys'
const experimentsConfig = {
  // we can add here another feature flag in the future
  categories_browsing_experiment: {
    id: 'CategoryBrowsingExperiment',
    name: 'Category Browsing Experiment',
    variationName: 'Variation',
    defaultName: 'Control',
  },
  christmas_merchandising_experiment_2020: {
    id: 'christmas_merchandising_experiment_2020',
    name: 'christmas_merchandising_experiment_2020',
    variationName: 'Variation',
    defaultName: 'Control',
  },
  testFeature: {
    id: 'TestFeature',
    name: 'Test Feature',
    variationName: 'Variation',
    defaultName: 'Control',
  },
  web_rate_recipe_navbar_order_experiment: {
    id: 'web_rate_recipe_navbar_order_experiment',
    name: 'web_rate_recipe_navbar_order_experiment',
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
