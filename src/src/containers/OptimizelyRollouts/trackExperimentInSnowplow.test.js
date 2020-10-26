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
        trackExperimentInSnowplow(featureName, isOptimizelyFeatureEnabled)(dispatch)
      })
      test('should call snowplow with experiment data', () => {
        expect(dispatch).toHaveBeenCalledWith({
          type: 'TRACKING_OPTIMIZELY_ROLLOUTS',
          trackingData: {
            actionType: 'optimizely_rollouts_experiment',
            experiment_id: 'TestFeature',
            experiment_name: 'Test Feature',
            variation_name: 'Variation',
          }
        })
      })
    })

    describe('when optimizelyExperiment is enabled', () => {
      beforeEach(() => {
        const isOptimizelyFeatureEnabled = false
        trackExperimentInSnowplow(featureName, isOptimizelyFeatureEnabled)(dispatch)
      })
      test('should call snowplow with experiment data', () => {
        expect(dispatch).toHaveBeenCalledWith({
          type: 'TRACKING_OPTIMIZELY_ROLLOUTS',
          trackingData: {
            actionType: 'optimizely_rollouts_experiment',
            experiment_id: 'TestFeature',
            experiment_name: 'Test Feature',
            variation_name: 'Control',
          }
        })
      })
    })
  })

  describe('when no experimentsConfig for featureName', () => {
    beforeEach(() => {
      featureName = 'testFeatureWithNoData'
      const isOptimizelyFeatureEnabled = false
      trackExperimentInSnowplow(featureName, isOptimizelyFeatureEnabled)(dispatch)
    })
    test('should not call dispatch', () => {
      expect(dispatch).not.toHaveBeenCalled()
    })
  })
})
