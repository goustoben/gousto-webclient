import Immutable from 'immutable'
import actionTypes from '../actionTypes'
import { fetchRecipes } from 'apis/recipes'
// import { limitReached } from 'utils/basket'

const mockGetAvailableDates = jest.fn()
const mockGetRecipeStock = jest.fn()
const mockLimitReached = jest.fn()

jest.mock('apis/data', () => ({
  getAvailableDates: mockGetAvailableDates,
  getRecipeStock: mockGetRecipeStock
}))

jest.mock('utils/basket', () => ({
  limitReached: mockLimitReached
}))

jest.mock('apis/recipes', () => ({
  fetchRecipes: jest.fn().mockImplementation(() => {
    const getData = async () => ({ data: [{ id: '1234' }] })

    return getData()
  })
}))

describe('menu actions', () => {
  // this require here is so that the mock above is picked up correctly

  const cutoffDateTime = '2019-09-01T10:00:00.000Z'
  const menuActions = require('../menu')
  const dispatch = jest.fn()
  const state = {
    auth: Immutable.fromJS({
      accessToken: 'test'
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
    }),
    features: Immutable.fromJS({}),
  }
  const getState = () => state

  beforeEach(() => {
    dispatch.mockReset()
    fetchRecipes.mockClear()
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

  describe('menuLoadMenu', () => {
    test('should call dispatch', async () => {
      await menuActions.menuLoadMenu(cutoffDateTime)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledTimes(4)
    })

    test('should call menuRecieve actions in correct order', async () => {
      await menuActions.menuLoadMenu(cutoffDateTime)(dispatch, getState)

      expect(dispatch.mock.calls[0][0]).toEqual(menuActions.menuRecieveMenuPending(true))
      expect(dispatch.mock.calls[1][0]).toEqual(menuActions.menuReceiveMenu([{ id: '1234' }]))
      expect(dispatch.mock.calls[2][0]).toEqual(menuActions.menuRecieveMenuPending(false))
    })

    test ('should call basketLimitReached', async () => {
      await menuActions.menuLoadMenu(cutoffDateTime)(dispatch, getState)
      expect(mockLimitReached).toHaveBeenCalled()
    })

    test('should call fetchRecipes', async () => {
      const expectedFetchRecipesArgs = [
        'test', '', { "filters[available_on]": cutoffDateTime, "includes[]": ["ingredients", "allergens"] }
      ]

      await menuActions.menuLoadMenu(cutoffDateTime)(dispatch, getState)

      expect(fetchRecipes).toHaveBeenCalledTimes(1)
      expect(fetchRecipes).toHaveBeenCalledWith(...expectedFetchRecipesArgs)
    })
  })

  describe('menuLoadDays', () => {
    const menuLoadDaysAction = menuActions.menuLoadDays()

    test('should call getAvailable with the access token', async () => {
      await menuLoadDaysAction(dispatch, getState)

      expect(mockGetAvailableDates).toHaveBeenCalledWith('test', false)
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

  describe('menuCutoffUntilRecieve', () => {
    test('should return a MENU_CUTOFF_UNTIL_RECIEVE action with the first argument mapped through to the cutoffUntil property', () => {
      const result = menuActions.menuCutoffUntilReceive('2020-06-26')
      expect(result).toEqual(expect.objectContaining({
        type: actionTypes.MENU_CUTOFF_UNTIL_RECEIVE,
        cutoffUntil: '2020-06-26',
      }))
    })
  })
})
