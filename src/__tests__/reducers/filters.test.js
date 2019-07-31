import Immutable from 'immutable'

import actionTypes from 'actions/actionTypes'

import reducer from 'reducers/filters'

describe('filters reducer', () => {
  let state
  const initialState = Immutable.Map({
    currentCollectionId: '',
    totalTime: '0',
    dietTypes: Immutable.Set([]),
    dietaryAttributes: Immutable.Set([]),
    newRecipes: false,
    recipeGroup: null,
  })

  test('it should return initial state', () => {
    state = undefined
    const result = reducer.filters(state, null)
    expect(Immutable.is(initialState, result)).toBe(true)
  })

  describe('actions', () => {
    test('should handle unknown actions', () => {
      state = undefined
      const action = { type: 'NONE' }
      const result = reducer.filters(state, action)
      expect(Immutable.is(initialState, result)).toBe(true)
    })

    test('should handle a FILTERS_COLLECTION_CHANGE action', () => {
      state = initialState
      const action = {
        type: actionTypes.FILTERS_COLLECTION_CHANGE,
        collectionId: 'NEW_COLLECTION',
      }
      const expectedState = Immutable.Map({
        currentCollectionId: 'NEW_COLLECTION',
        totalTime: '0',
        dietTypes: Immutable.Set([]),
        dietaryAttributes: Immutable.Set([]),
        newRecipes: false,
        recipeGroup: null,
      })
      const result = reducer.filters(state, action)

      expect(Immutable.is(expectedState, result)).toBe(true)
    })

    test('should handle a FILTERS_DIET_TYPES_CHANGE action', () => {
      state = initialState
      const action = {
        type: actionTypes.FILTERS_DIET_TYPES_CHANGE,
        dietTypes: Immutable.Set(['meat']),
      }
      const expectedState = Immutable.Map({
        currentCollectionId: '',
        totalTime: '0',
        dietTypes: Immutable.Set(['meat']),
        dietaryAttributes: Immutable.Set([]),
        newRecipes: false,
        recipeGroup: null,
      })
      const result = reducer.filters(state, action)

      expect(Immutable.is(expectedState, result)).toBe(true)
    })

    test('should handle a FILTERS_DIETARY_ATTRIBUTES_CHANGE action', () => {
      state = initialState
      const action = {
        type: actionTypes.FILTERS_DIETARY_ATTRIBUTES_CHANGE,
        dietaryAttributes: Immutable.Set(['gluten-free']),
      }
      const expectedState = Immutable.Map({
        currentCollectionId: '',
        totalTime: '0',
        dietTypes: Immutable.Set([]),
        dietaryAttributes: Immutable.Set(['gluten-free']),
        newRecipes: false,
        recipeGroup: null,
      })
      const result = reducer.filters(state, action)

      expect(Immutable.is(expectedState, result)).toBe(true)
    })

    test('should handle a FILTERS_TOTAL_TIME_CHANGE action', () => {
      state = initialState
      const action = {
        type: actionTypes.FILTERS_TOTAL_TIME_CHANGE,
        totalTime: '10',
      }
      const expectedState = Immutable.Map({
        currentCollectionId: '',
        totalTime: '10',
        dietTypes: Immutable.Set([]),
        dietaryAttributes: Immutable.Set([]),
        newRecipes: false,
        recipeGroup: null,
      })
      const result = reducer.filters(state, action)
      expect(Immutable.is(expectedState, result)).toBe(true)
    })

    test('should handle FILTERS_PRODUCT_CATEGORY action - set selectedCategory state value', () => {
      state = initialState
      const action = {
        type: actionTypes.FILTERS_PRODUCT_CATEGORY,
        value: 'all-products',
      }
      const expectedState = Immutable.Map({
        currentCollectionId: '',
        totalTime: '0',
        dietTypes: Immutable.Set([]),
        dietaryAttributes: Immutable.Set([]),
        selectedCategory: 'all-products',
        newRecipes: false,
        recipeGroup: null,
      })
      const result = reducer.filters(state, action)
      expect(Immutable.is(expectedState, result)).toBe(true)
    })
  })
})
