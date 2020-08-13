import { optimizelyRolloutsExperiment } from '../../actions/trackingKeys'
export const trackExperimentInSnowplow = (optimizelyConfig, featureName, isOptimizelyFeatureEnabled) => (dispatch) => {
  const experimentsForFeatureName = optimizelyConfig.featuresMap[featureName].experimentsMap
  Object.keys(experimentsForFeatureName).forEach(experiment => {
    const experimentData = experimentsForFeatureName[experiment]
    dispatch({
      type: 'TRACKING_OPTIMIZELY_ROLLOUTS',
      trackingData: {
        actionType: optimizelyRolloutsExperiment,
        experiment_id: experimentData.id,
        experiment_name: experimentData.key,
        variation_id: isOptimizelyFeatureEnabled ? experimentData.variationsMap.variant.id : experimentData.variationsMap.default.id,
        variation_name: isOptimizelyFeatureEnabled ? experimentData.variationsMap.variant.key : experimentData.variationsMap.default.key
      }
    })
  })
}
