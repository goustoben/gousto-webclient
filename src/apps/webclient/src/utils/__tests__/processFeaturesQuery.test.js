import { processFeaturesQuery } from 'utils/processFeaturesQuery'

describe('processfeaturesQuery', () => {
  let mockStore
  beforeEach(() => {
    mockStore = {
      dispatch: jest.fn(),
    }
  })
  describe('when features are enabled', () => {
    test('should disptach featuresSet', () => {
      const query = {
        'features[]': ['someFeatureName']
      }
      processFeaturesQuery(query, mockStore)
      expect(mockStore.dispatch).toHaveBeenCalledWith({
        type: 'FEATURES_SET',
        features: [
          { feature: 'someFeatureName', value: true }
        ]
      })
    })
  })

  describe('when features are disabled', () => {
    test('should disptach featuresSet', () => {
      mockStore = {
        dispatch: jest.fn(),
      }
      const query = {
        'disabledFeatures[]': ['someFeatureName']
      }
      processFeaturesQuery(query, mockStore)
      expect(mockStore.dispatch).toHaveBeenCalledWith({
        type: 'FEATURES_SET',
        features: [
          { feature: 'someFeatureName', value: false }
        ]
      })
    })
  })
})
