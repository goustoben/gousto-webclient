import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
import { useSelector } from 'react-redux'
import { useIsBundlesEnabled } from '../useBundlesExperiment.hook'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}))

jest.mock('containers/OptimizelyRollouts', () => ({
  useIsOptimizelyFeatureEnabled: jest.fn(),
}))
const mockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>
const mockUseIsOptimizelyFeatureEnabled = useIsOptimizelyFeatureEnabled as jest.MockedFunction<
  typeof useIsOptimizelyFeatureEnabled
>

describe('useBundlesExperiments hook', () => {
  afterEach(() => jest.clearAllMocks())

  describe('When authentication is true', () => {
    beforeEach(() => mockUseSelector.mockReturnValue(true))

    test('Should return true if bundle experiments enabled', () => {
      mockUseIsOptimizelyFeatureEnabled.mockReturnValue(true)
      expect(useIsBundlesEnabled()).toBe(true)
    })
    test('Should return false if bundle experiments disabled', () => {
      mockUseIsOptimizelyFeatureEnabled.mockReturnValue(false)
      expect(useIsBundlesEnabled()).toBe(false)
    })
  })

  describe('When authentication is false', () => {
    beforeEach(() => mockUseSelector.mockReturnValue(false))

    test('Should return false if bundle experiments enabled', () => {
      mockUseIsOptimizelyFeatureEnabled.mockReturnValue(true)
      expect(useIsBundlesEnabled()).toBe(false)
    })
    test('Should return false if bundle experiments disabled', () => {
      mockUseIsOptimizelyFeatureEnabled.mockReturnValue(false)
      expect(useIsBundlesEnabled()).toBe(false)
    })
  })
})
