import * as React from 'react'

import { renderHook } from '@testing-library/react-hooks'
import Immutable from 'immutable'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

import { useSurchargePerPortion } from './useSurchargePerPortion'

describe('useSurchargePerPortion', () => {
  const recipeId = '12312'

  describe('when there is no overallSurcharge', () => {
    const mockStore = configureMockStore()
    const store = mockStore({
      recipes: Immutable.fromJS({ [recipeId]: { meals: [] } }),
    })

    const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>

    test('should return null', () => {
      const { result } = renderHook(() => useSurchargePerPortion({ recipeId, numPortions: 2 }), {
        wrapper,
      })
      expect(result.current).toBe(null)
    })
  })

  describe('when there is overallSurcharge', () => {
    const mockStore = configureMockStore()
    const store = mockStore({
      recipes: Immutable.fromJS({
        [recipeId]: {
          meals: [
            {
              numPortions: 2,
              surcharge: { listPrice: 1.5 },
            },
            {
              numPortions: 4,
              surcharge: { listPrice: 3.0 },
            },
          ],
        },
      }),
    })

    const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>

    test('should return the surcharge for given numPortions', () => {
      const { result } = renderHook(() => useSurchargePerPortion({ recipeId, numPortions: 2 }), {
        wrapper,
      })
      expect(result.current).toBe(0.75)
    })
  })
})
