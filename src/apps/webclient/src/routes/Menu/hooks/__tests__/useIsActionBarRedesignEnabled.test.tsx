import React, { ReactNode } from 'react'
import Immutable from 'immutable'
import { renderHook } from '@testing-library/react-hooks'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
import { useIsActionBarRedesignEnabled } from '../useIsActionBarRedesignEnabled'

jest.mock('containers/OptimizelyRollouts', () => ({
  useIsOptimizelyFeatureEnabled: jest.fn(),
}))

const cases = [
  // isAuthenticated, featureValue, expected
  [false, false, false],
  [false, true, true],
  [true, false, false],
  [true, true, false],
]

describe('useIsActionBarRedesignEnabled', () => {
  describe.each(cases)(
    'when isAuthenticated is %s and feature value is %s',
    (isAuthenticated, featureValue, expected) => {
      test(`then it should return ${expected}`, () => {
        ;(useIsOptimizelyFeatureEnabled as jest.Mock).mockReturnValue(featureValue)

        const mockStore = configureMockStore()
        const mockedStore = mockStore({
          auth: Immutable.fromJS({
            isAuthenticated,
          }),
        })

        const wrapper = ({ children }: { children: ReactNode }) => (
          <Provider store={mockedStore}>{children}</Provider>
        )
        const { result } = renderHook(() => useIsActionBarRedesignEnabled(), {
          wrapper,
        })
        expect(result.current).toBe(expected)
      })
    }
  )
})
