import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'

import { useIsBundlesEnabled } from '../useBundlesExperiment.hook'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}))

jest.mock('containers/OptimizelyRollouts', () => ({
  useIsOptimizelyFeatureEnabled: jest.fn(),
}))
const mockUseIsOptimizelyFeatureEnabled = useIsOptimizelyFeatureEnabled as jest.MockedFunction<
  typeof useIsOptimizelyFeatureEnabled
>

describe('useBundlesExperiments hook', () => {
  afterEach(() => jest.clearAllMocks())

  test('Should return true if bundle experiments enabled', () => {
    mockUseIsOptimizelyFeatureEnabled.mockReturnValue(true)
    expect(useIsBundlesEnabled()).toBe(true)
  })

  test('Should return false if bundle experiments disabled', () => {
    mockUseIsOptimizelyFeatureEnabled.mockReturnValue(false)
    expect(useIsBundlesEnabled()).toBe(false)
  })
})
