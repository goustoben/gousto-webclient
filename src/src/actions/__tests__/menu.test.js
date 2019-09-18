import Immutable from 'immutable'
import actionTypes from '../actionTypes'

const mockGetAvailableDates = jest.fn()
const mockGetRecipeStock = jest.fn()

jest.mock('apis/data', () => ({
  getAvailableDates: mockGetAvailableDates,
  getRecipeStock: mockGetRecipeStock
}))

describe('menu actions', () => {
  // this require here is so that the mock above is picked up correctly
  const menuActions = require('../menu')
  const dispatch = jest.fn()
  const state = {
    auth: Immutable.fromJS({
      accessToken: 'abc'
    }),
    basket: Immutable.fromJS({
      numPortions: 2,
      date: '2019-10-22T00:00:00+01:00',
      recipes: {
        '1234': 2,
        '5678': 1
      }
    }),
    boxSummaryDeliveryDays: Immutable.fromJS({
      '2019-10-22T00:00:00+01:00': {
        coreDayId: '001'
      }
    })
  }
  const getState = () => state

  beforeEach(() => {
    dispatch.mockReset()

    mockGetAvailableDates.mockReset()
    mockGetAvailableDates.mockResolvedValue([
      { until: '2019-09-17T00:00:00+01:00' },
      { until: '2019-10-22T00:00:00+01:00' }
    ])

    mockGetRecipeStock.mockReset()
    mockGetRecipeStock.mockResolvedValue({
      '001': {
        recipeId: '001',
        committed: '1',
        number: '53',
        familyNumber: '100'
      }
    })
  })

  describe('menuLoadDays', () => {
    const menuLoadDaysAction = menuActions.menuLoadDays()

    test('should call getAvailable with the access token', async () => {
      await menuLoadDaysAction(dispatch, getState)

      expect(mockGetAvailableDates).toHaveBeenCalledWith('abc', false)
    })

    test('should dispatch an action with the until value of the last date', async () => {
      await menuLoadDaysAction(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.MENU_CUTOFF_UNTIL_RECEIVE,
        cutoffUntil: '2019-10-22T00:00:00+01:00'
      })
    })
  })

  describe('menuLoadStock', () => {
    describe('clearStock is true', () => {
      const menuLoadStockAction = menuActions.menuLoadStock(true)

      test('should dispatch a replace action with adjusted stock', async () => {
        await menuLoadStockAction(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith({
          type: actionTypes.MENU_RECIPE_STOCK_REPLACE,
          stock: {
            '001': {
              2: 53,
              4: 100,
              committed: true
            }
          }
        })
      })

      test('should dispatch a stock change event for each recipe in basket', async () => {
        await menuLoadStockAction(dispatch, getState)

        // jest has no way of seeing how many times a function was called only with specific arguments
        const callsForFirstRecipe = dispatch.mock.calls.filter(c => {
          return c[0].type && c[0].type === actionTypes.MENU_RECIPE_STOCK_CHANGE
            && c[0].stock && c[0].stock['1234'] && c[0].stock['1234'][2] === -1
        })

        expect(callsForFirstRecipe).toHaveLength(2)
        expect(dispatch).toHaveBeenCalledWith({
          type: actionTypes.MENU_RECIPE_STOCK_CHANGE,
          stock: { '5678': { 2: -1 } },
        })
      })
    })

    describe('clearStock is false', () => {
      const menuLoadStockAction = menuActions.menuLoadStock(false)

      test('should dispatch a change action with adjusted stock', async () => {
        await menuLoadStockAction(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith({
          type: actionTypes.MENU_RECIPE_STOCK_CHANGE,
          stock: {
            '001': {
              2: 53,
              4: 100,
              committed: true
            }
          }
        })
      })
    })
  })
})
