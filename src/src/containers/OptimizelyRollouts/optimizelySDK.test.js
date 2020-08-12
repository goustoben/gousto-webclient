import { safeJestMock } from '_testing/mocks'
import optimizelySdk from '@optimizely/optimizely-sdk'
import { getOptimizelyInstance } from './optimizelySDK'

describe('getOptimizelyInstance', () => {
  let optimizelySDK
  beforeEach(() => {
    optimizelySDK = safeJestMock(optimizelySdk, 'createInstance')
  })
  describe('when optimizely instance is not defined', () => {
    beforeEach(() => {
      optimizelySDK.mockReturnValue({
        onReady: jest.fn()
      })
    })
    test('should instantiate the instance and return it back', async () => {
      const optimizelyInstance = await getOptimizelyInstance()

      expect(optimizelyInstance).toBeDefined()
    })
  })
})
