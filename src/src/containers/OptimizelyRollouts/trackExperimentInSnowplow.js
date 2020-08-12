import windowUtils from 'utils/window'

export const trackExperimentInSnowplow = (optimizelyConfig, featureName, isOptimizelyFeatureEnabled) => {
  const experimentsForFeatureName = optimizelyConfig.featuresMap[featureName].experimentsMap
  const clientWindow = windowUtils.getWindow()
  Object.keys(experimentsForFeatureName).forEach(experiment => {
    const experimentData = experimentsForFeatureName[experiment]

    clientWindow.snowplow('trackSelfDescribingEvent', {
      experiment_id: experimentData.id,
      experiment_name: experimentData.key,
      variation_id: isOptimizelyFeatureEnabled ? experimentData.variationsMap.variant.id : experimentData.variationsMap.default.id,
      variation_name: isOptimizelyFeatureEnabled ? experimentData.variationsMap.variant.key : experimentData.variationsMap.default.key
    })
  })
}
