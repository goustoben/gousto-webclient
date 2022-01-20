import { trackExperimentInSnowplow } from './trackExperimentInSnowplow'

describe('trackExperimentInSnowplow', () => {
  const dispatch = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('when as experiments for featureName', () => {
    const featureName = 'testFeature'

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

    describe('when repeat calls are made', () => {
      beforeEach(() => {
        const isOptimizelyFeatureEnabled = true
        const authUserId = 'another-auth-id'
        const sessionId = ''
        for (let i = 0; i < 3; ++i) {
          trackExperimentInSnowplow(featureName, isOptimizelyFeatureEnabled, authUserId, sessionId)(dispatch)
        }
      })

      test('should call snowplow only once', () => {
        expect(dispatch).toHaveBeenCalledTimes(1)
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
    const featureName = 'testFeatureWithNoData'

    beforeEach(() => {
      const isOptimizelyFeatureEnabled = false
      trackExperimentInSnowplow(featureName, isOptimizelyFeatureEnabled, '', '')(dispatch)
    })

    test('should not call dispatch', () => {
      expect(dispatch).not.toHaveBeenCalled()
    })
  })
})
