import sinon from 'sinon'

import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable' /* eslint-disable new-cap */
import recipesReducer from 'reducers/recipes'

describe('recipes reducer', () => {
  test('should handle initial state', () => {
    const initialState = Immutable.Map({})
    expect(
      Immutable.is(recipesReducer.recipes(undefined, {}), initialState),
    ).toEqual(true)
  })

  test('should handle unknown actions', () => {
    const state = Immutable.fromJS({
      1: { id: 1, title: 'recipe 1' },
      2: { id: 2, title: 'recipe 2' },
    })
    const result = recipesReducer.recipes(state, { type: 'unknown' })

    expect(Immutable.is(result, state)).toEqual(true)
  })

  describe('RECIPES_RECEIVE', () => {
    test('should load recipes into state', () => {
      const result = recipesReducer.recipes(Immutable.Map({}), {
        type: actionTypes.RECIPES_RECEIVE,
        recipes: [
          { id: '1', title: 'recipe 1' },
          { id: '2', title: 'recipe 2' },
        ],
      })
      const expectedState = Immutable.Map()
        .set('1', Immutable.Map({ id: '1', title: 'recipe 1' }))
        .set('2', Immutable.Map({ id: '2', title: 'recipe 2' }))

      expect(Immutable.is(result, expectedState)).toEqual(true)
    })
  })

  describe('COLLECTIONS_RECIEVE_COLLECTION_RECIPES', () => {
    test('should load recipes into state', () => {
      const result = recipesReducer.recipes(Immutable.Map({}), {
        type: actionTypes.COLLECTIONS_RECIEVE_COLLECTION_RECIPES,
        recipes: [
          { id: '1', title: 'recipe 1' },
          { id: '2', title: 'recipe 2' },
        ],
      })
      const expectedState = Immutable.Map()
        .set('1', Immutable.Map({ id: '1', title: 'recipe 1' }))
        .set('2', Immutable.Map({ id: '2', title: 'recipe 2' }))

      expect(Immutable.is(result, expectedState)).toEqual(true)
    })
  })

  describe('RECIPES_PERIOD_STOCK_RECEIVE', () => {
    test('should load recipes stock into state', () => {
      const stock = [
        {
          id: '1',
          title: 'recipe 1',
          portions2: 6,
          portions4: 3,
          committed: true,
        },
        {
          id: '2',
          title: 'recipe 2',
          portions2: 0,
          portions4: 0,
          committed: false,
        },
      ]
      const result = recipesReducer.recipesStock(Immutable.List([]), {
        type: actionTypes.RECIPES_PERIOD_STOCK_RECEIVE,
        stock,
      })
      const expectedState = Immutable.List(stock)

      expect(Immutable.is(result, expectedState)).toEqual(true)
    })
  })
})
