import Immutable from 'immutable'

import { actionTypes } from 'actions/actionTypes'

import { filtersReducers } from 'reducers/filters'

describe('filters reducer', () => {
  let state
  const initialState = Immutable.Map({
  })

  test('it should return initial state', () => {
    state = undefined
    const result = filtersReducers.filters(state, null)
    expect(Immutable.is(initialState, result)).toBe(true)
  })

  describe('actions', () => {
    test('should handle unknown actions', () => {
      state = undefined
      const action = { type: 'NONE' }
      const result = filtersReducers.filters(state, action)
      expect(Immutable.is(initialState, result)).toBe(true)
    })

    test('should handle FILTERS_PRODUCT_CATEGORY action - set selectedCategory state value', () => {
      state = initialState
      const action = {
        type: actionTypes.FILTERS_PRODUCT_CATEGORY,
        value: 'all-products',
      }
      const expectedState = Immutable.Map({
        selectedCategory: 'all-products',
      })
      const result = filtersReducers.filters(state, action)
      expect(Immutable.is(expectedState, result)).toBe(true)
    })
  })
})
