import { actionTypes } from 'actions/actionTypes'
import Immutable from 'immutable'
import { recipesReducers } from 'reducers/recipes'

describe('recipes reducer', () => {
  test('should handle initial state', () => {
    const initialState = Immutable.Map({})
    expect(
      Immutable.is(recipesReducers.recipes(undefined, {}), initialState),
    ).toEqual(true)
  })

  test('should handle unknown actions', () => {
    const state = Immutable.fromJS({
      1: { id: 1, title: 'recipe 1' },
      2: { id: 2, title: 'recipe 2' },
    })
    const result = recipesReducers.recipes(state, { type: 'unknown' })

    expect(Immutable.is(result, state)).toEqual(true)
  })

  describe('RECIPES_RECEIVE', () => {
    test('should load recipes into state', () => {
      const result = recipesReducers.recipes(Immutable.Map({}), {
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
      const result = recipesReducers.recipesStock(Immutable.List([]), {
        type: actionTypes.RECIPES_PERIOD_STOCK_RECEIVE,
        stock,
      })
      const expectedState = Immutable.List(stock)

      expect(Immutable.is(result, expectedState)).toEqual(true)
    })
  })
})
