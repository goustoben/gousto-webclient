import { safeJestMock } from '_testing/mocks'
import optimizelySdk from '@optimizely/optimizely-sdk'
import { instance as optimizelySDKModule, hasInstance, hasValidInstance, getOptimizelyInstance, isLoading } from './optimizelySDK'

jest.mock('utils/isomorphicEnvironment', () => ({
  getEnvironment: () => 'local',
}))

describe('getOptimizelyInstance', () => {
  let optimizelySDK
  beforeEach(() => {
    optimizelySDK = safeJestMock(optimizelySdk, 'createInstance')
  })

  describe('when optimizely instance is not defined', () => {
    beforeEach(() => {
      optimizelySDK.mockReturnValue({
        onReady: jest.fn().mockReturnValue({ success: true })
      })
    })
    test('should instantiate the instance and return it back', async () => {
      const optimizelyInstance = await optimizelySDKModule.getOptimizelyInstance()

      expect(optimizelyInstance).toBeDefined()
    })
  })

  describe('when optimizely.onReady fails', () => {
    beforeEach(() => {
      optimizelySDKModule.hasInstance = jest.fn().mockReturnValue(false)
      optimizelySDK.mockReturnValue({
        onReady: jest.fn().mockReturnValue({ success: false })
      })
    })

    test('should return false when calling hasValidInstance', async () => {
      await getOptimizelyInstance()
      expect(hasValidInstance()).toBe(false)
    })
  })

  describe('when optimizely.onReady throws', () => {
    beforeEach(() => {
      optimizelySDKModule.hasInstance = jest.fn().mockReturnValue(false)
      optimizelySDK.mockReturnValue({
        onReady: jest.fn().mockRejectedValue(new Error('Nope'))
      })
    })

    test('should return false when calling hasValidInstance', async () => {
      await getOptimizelyInstance()
      expect(hasValidInstance()).toBe(false)
    })
  })

  test('isLoading function', () => {
    expect(typeof isLoading()).toBe('boolean')
  })

  test('hasInstance function', () => {
    expect(typeof hasInstance()).toBe('boolean')
  })
})
