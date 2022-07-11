import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'

import { useFiveRecipeSubscriptionOption } from '../useFiveRecipeSubscriptionOption'

jest.mock('containers/OptimizelyRollouts', () => ({
  useIsOptimizelyFeatureEnabled: jest.fn(),
}))

const mockUseIsOptimizelyFeatureEnabled = useIsOptimizelyFeatureEnabled as jest.MockedFunction<
  typeof useIsOptimizelyFeatureEnabled
>

describe('useFiveRecipeSubscriptionOption hook', () => {
  afterEach(() => jest.clearAllMocks())

  describe('when experiment is on', () => {
    test('should return true', () => {
      mockUseIsOptimizelyFeatureEnabled.mockReturnValue(true)
      expect(useFiveRecipeSubscriptionOption()).toBe(true)
    })
  })

  describe('when experiment is off', () => {
    test('should return false', () => {
      mockUseIsOptimizelyFeatureEnabled.mockReturnValue(false)
      expect(useFiveRecipeSubscriptionOption()).toBe(false)
    })
  })
})
