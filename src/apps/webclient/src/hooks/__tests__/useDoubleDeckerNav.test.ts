import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'

import { useDoubleDeckerNav } from '../useDoubleDeckerNav'

jest.mock('containers/OptimizelyRollouts', () => ({
  useIsOptimizelyFeatureEnabled: jest.fn(),
}))

const mockUseIsOptimizelyFeatureEnabled = useIsOptimizelyFeatureEnabled as jest.MockedFunction<
  typeof useIsOptimizelyFeatureEnabled
>

describe('useDoubleDeckerNav hook', () => {
  afterEach(() => jest.clearAllMocks())

  describe('when experiment is on', () => {
    test('should return true', () => {
      mockUseIsOptimizelyFeatureEnabled.mockReturnValue(true)
      expect(useDoubleDeckerNav()).toBe(true)
    })
  })

  describe('when experiment is off', () => {
    test('should return true', () => {
      mockUseIsOptimizelyFeatureEnabled.mockReturnValue(false)
      expect(useDoubleDeckerNav()).toBe(false)
    })
  })
})
