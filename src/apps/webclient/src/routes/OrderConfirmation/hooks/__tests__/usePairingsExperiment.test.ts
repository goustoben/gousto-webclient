import { renderHook } from '@testing-library/react-hooks'
import { Map } from 'immutable'
import { useSelector } from 'react-redux'

import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'

import { mockGetProductRecipePairingsState } from '../../components/config'
import { useIsPairingsEnabled } from '../usePairingsExperiment'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}))

jest.mock('containers/OptimizelyRollouts', () => ({
  useIsOptimizelyFeatureEnabled: jest.fn(),
}))

describe('useIsPairingsEnabled', () => {
  afterEach(() => jest.clearAllMocks())

  describe('When product recipe pairings is empty', () => {
    beforeEach(() => {
      ;(useIsOptimizelyFeatureEnabled as jest.Mock).mockReturnValue(null)
      ;(useSelector as jest.Mock).mockReturnValue(Map({}))
    })

    test('should call useIsOptimizelyFeatureEnabled with null', () => {
      renderHook(() => useIsPairingsEnabled())

      expect(useIsOptimizelyFeatureEnabled).toBeCalledWith(null)
    })

    test('useIsPairingsEnabled returns false', () => {
      const { result } = renderHook(() => useIsPairingsEnabled())

      expect(result.current).toBe(false)
    })
  })

  describe('When product recipe pairings is not empty', () => {
    beforeEach(() => {
      useIsOptimizelyFeatureEnabled as jest.Mock
      ;(useSelector as jest.Mock).mockReturnValue(mockGetProductRecipePairingsState())
    })

    test('should call useIsOptimizelyFeatureEnabled with pairings experiment name', () => {
      renderHook(() => useIsPairingsEnabled())
      expect(useIsOptimizelyFeatureEnabled).toHaveBeenLastCalledWith(
        'etm_market_orderconfirmation_addingpairings_web_apr22',
      )
    })

    describe.each([
      [false, false],
      [true, true],
    ])('when feature value is %s', (featureValue, expected) => {
      test(`then useIsPairingsEnabled should return ${expected}`, () => {
        ;(useIsOptimizelyFeatureEnabled as jest.Mock).mockReturnValue(featureValue)
        const { result } = renderHook(() => useIsPairingsEnabled())
        expect(result.current).toBe(expected)
      })
    })
  })
})
