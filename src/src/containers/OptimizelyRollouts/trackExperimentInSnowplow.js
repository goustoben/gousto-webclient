import { optimizelyRolloutsExperiment } from '../../actions/trackingKeys'
const experimentsConfig = {
  testFeature: {
    id: 'TestFeature',
    name: 'Test Feature',
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
