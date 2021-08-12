import React from 'react'
import Immutable from 'immutable'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { renderHook } from '@testing-library/react-hooks'
import { useIsSidesExperimentEnabled, SidesExperimentProvider } from './sidesExperimentContext'

describe('useIsSidesExperimentEnabled', () => {
  const createWrapper = (bucket) => {
    const mockStore = configureMockStore()

    const store = mockStore({
      experiments: Immutable.fromJS({
        experiments: {
          'recipe-agnostic-adds-experiment': {
            name: 'recipe-agnostic-adds-experiment',
            bucket,
            withinExperiment: true,
          }
        }
      }),
      pending: Immutable.fromJS({})
    })

    // eslint-disable-next-line react/prop-types
    return ({ children }) => (
      <Provider store={store}>
        <SidesExperimentProvider>{children}</SidesExperimentProvider>
      </Provider>
    )
  }

  describe('when user is in control for the sides experiment', () => {
    test('should return false', () => {
      const { result } = renderHook(() => useIsSidesExperimentEnabled(),
        {
          wrapper: createWrapper('control')
        })

      expect(result.current).toBe(false)
    })
  })

  describe('when user is in control for the sides experiment', () => {
    test('should return true', () => {
      const { result } = renderHook(() => useIsSidesExperimentEnabled(),
        {
          wrapper: createWrapper('variant')
        })

      expect(result.current).toBe(true)
    })
  })
})
