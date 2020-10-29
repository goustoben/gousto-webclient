import { trackExperimentInSnowplow } from './trackExperimentInSnowplow'

describe('trackExperimentInSnowplow', () => {
  let dispatch
  let featureName = 'testFeature'
  beforeEach(() => {
    dispatch = jest.fn()
  })
  describe('when as experiments for featureName', () => {
    describe('when optimizelyExperiment is enabled', () => {
      beforeEach(() => {
        const isOptimizelyFeatureEnabled = true
        const authUserId = 'auth-id'
        const sessionId = ''
        trackExperimentInSnowplow(featureName, isOptimizelyFeatureEnabled, authUserId, sessionId)(dispatch)
      })
      test('should call snowplow with experiment data', () => {
        expect(dispatch).toHaveBeenCalledWith({
          type: 'TRACKING_OPTIMIZELY_ROLLOUTS',
          trackingData: {
            actionType: 'optimizely_rollouts_experiment',
            experiment_id: 'TestFeature',
            experiment_name: 'Test Feature',
            variation_name: 'Variation',
            user_logged_in: true,
            session_id: ''
          }
        })
      })
    })

    describe('when optimizelyExperiment is disabled', () => {
      beforeEach(() => {
        const isOptimizelyFeatureEnabled = false
        const authUserId = ''
        const sessionId = 'session-id'
        trackExperimentInSnowplow(featureName, isOptimizelyFeatureEnabled, authUserId, sessionId)(dispatch)
      })
      test('should call snowplow with experiment data', () => {
        expect(dispatch).toHaveBeenCalledWith({
          type: 'TRACKING_OPTIMIZELY_ROLLOUTS',
          trackingData: {
            actionType: 'optimizely_rollouts_experiment',
            experiment_id: 'TestFeature',
            experiment_name: 'Test Feature',
            variation_name: 'Control',
            user_logged_in: false,
            session_id: 'session-id'
          }
        })
      })
    })
  })

  describe('when no experimentsConfig for featureName', () => {
    beforeEach(() => {
      featureName = 'testFeatureWithNoData'
      const isOptimizelyFeatureEnabled = false
      trackExperimentInSnowplow(featureName, isOptimizelyFeatureEnabled, '', '')(dispatch)
    })
    test('should not call dispatch', () => {
      expect(dispatch).not.toHaveBeenCalled()
    })
  })
})
