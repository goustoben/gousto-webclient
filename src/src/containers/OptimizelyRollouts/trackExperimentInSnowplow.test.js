import { trackExperimentInSnowplow } from './trackExperimentInSnowplow'

describe('trackExperimentInSnowplow', () => {
  global.snowplow = jest.fn()
  const optimizelyConfig = {
    featuresMap: {
      testFeature: {
        experimentsMap: {
          experimentTag: {
            id: 1234,
            key: 'experimentTag',
            variationsMap: {
              default: {
                id: 2344,
                key: 'default'
              },
              variant: {
                id: 4556,
                key: 'variant'
              }
            }
          }
        }
      },
      testFeatureWithNoData: {
        experimentsMap: {}
      }
    }
  }
  let featureName = 'testFeature'
  describe('when optimizelyConfig has experiments for featureName', () => {
    describe('when optimizelyExperiment is enabled', () => {
      beforeEach(() => {
        const isOptimizelyFeatureEnabled = true
        trackExperimentInSnowplow(optimizelyConfig, featureName, isOptimizelyFeatureEnabled)
      })
      test('should call snowplow with experiment data', () => {
        expect(global.snowplow).toHaveBeenCalledWith('trackSelfDescribingEvent', {
          experiment_id: 1234,
          experiment_name: 'experimentTag',
          variation_id: 4556,
          variation_name: 'variant'})
      })
    })

    describe('when optimizelyExperiment is enabled', () => {
      beforeEach(() => {
        const isOptimizelyFeatureEnabled = false
        trackExperimentInSnowplow(optimizelyConfig, featureName, isOptimizelyFeatureEnabled)
      })
      test('should call snowplow with experiment data', () => {
        expect(global.snowplow).toHaveBeenCalledWith('trackSelfDescribingEvent', {
          experiment_id: 1234,
          experiment_name: 'experimentTag',
          variation_id: 2344,
          variation_name: 'default'})
      })
    })
  })

  describe('when optimizelyConfig do not has experiments for featureName', () => {
    beforeEach(() => {
      featureName = 'testFeatureWithNoData'
      const isOptimizelyFeatureEnabled = false
      trackExperimentInSnowplow(optimizelyConfig, featureName, isOptimizelyFeatureEnabled)
    })
    test('should not call snowplow', () => {
      expect(global.snowplow).toHaveBeenCalled()
    })
  })
})
