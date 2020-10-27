import { optimizelyRolloutsExperiment } from '../../actions/trackingKeys'
const experimentsConfig = {
  // we can add here another feature flag in the future
  categories_browsing_experiment: {
    id: 'CategoryBrowsingExperiment',
    name: 'Category Browsing Experiment',
    variationName: 'Variation',
    defaultName: 'Control',
  },
  testFeature: {
    id: 'TestFeature',
    name: 'Test Feature',
    variationName: 'Variation',
    defaultName: 'Control',
  }
}
export const trackExperimentInSnowplow = (featureName, isOptimizelyFeatureEnabled) => (dispatch) => {
  const experimentData = experimentsConfig[featureName]
  if (experimentData) {
    dispatch({
      type: 'TRACKING_OPTIMIZELY_ROLLOUTS',
      trackingData: {
        actionType: optimizelyRolloutsExperiment,
        experiment_id: experimentData.id,
        experiment_name: experimentData.name,
        variation_name: isOptimizelyFeatureEnabled ? experimentData.variationName : experimentData.defaultName,
      }
    })
  }
}
