import Immutable from 'immutable'
import { fetchRecipes } from 'apis/recipes'
import actionTypes from '../actionTypes'

const mockGetAvailableDates = jest.fn()
const mockGetRecipeStock = jest.fn()
const mockLimitReached = jest.fn()
const mockGetCutoffDateTime = jest.fn()

const mockDispatchMenuLoadCollections = jest.fn()
const mockDispatchmenuLoadCollectionsRecipes = jest.fn()

jest.mock('apis/data', () => ({
  getAvailableDates: mockGetAvailableDates,
  getRecipeStock: mockGetRecipeStock
}))

jest.mock('utils/basket', () => ({
  limitReached: mockLimitReached
}))

jest.mock('utils/deliveries', () => ({
  getCutoffDateTime: mockGetCutoffDateTime
}))

jest.mock('actions/menuCollections', () => ({
  menuLoadCollections: () => {
    return mockDispatchMenuLoadCollections
  },
  menuLoadCollectionsRecipes: () => {
    return mockDispatchmenuLoadCollectionsRecipes
  }
}))

jest.mock('apis/recipes', () => ({
  fetchRecipes: jest.fn().mockImplementation(() => {
    const getData = async () => ({ data: [{ id: '1234' }] })

    return getData()
  })
}))

describe('menu actions', () => {
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
  }
  const getState = () => state

  beforeEach(() => {
    mockGetAvailableDates.mockResolvedValue([
      { until: '2019-09-17T00:00:00+01:00' },
      { until: '2019-10-22T00:00:00+01:00' }
    ])

    mockGetRecipeStock.mockResolvedValue({
      '001': {
        recipeId: '001',
        committed: '1',
        number: '53',
        familyNumber: '100'
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('menuLoadMenu', () => {
    test('should call dispatch', async () => {
      await menuActions.menuLoadMenu(cutoffDateTime)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledTimes(3)
    })

    test('should use date from state when cutoffDateTime is null', async () => {
      await menuActions.menuLoadMenu(null)(dispatch, getState)
      expect(mockGetCutoffDateTime).toHaveBeenCalled()
    })

    test('should load collections when collections.value is true', async () => {
      const stateWithTrueCollectionValue = {
        ...state,
        features: Immutable.fromJS({
          collections: {
            value: true,
          }
        }),
      }

      const getStateForTest = () => stateWithTrueCollectionValue

      await menuActions.menuLoadMenu(cutoffDateTime)(dispatch, getStateForTest)

      expect(mockDispatchMenuLoadCollections).toHaveBeenCalled()
      expect(mockDispatchmenuLoadCollectionsRecipes).toHaveBeenCalled()
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

      expect(result).toEqual({
        type: actionTypes.MENU_CUTOFF_UNTIL_RECEIVE,
        cutoffUntil: '2020-06-26',
      })
    })
  })

  describe('menuLoadComplete', () => {
    test('should return a MENU_LOAD_COMPLETE action with correct time to load', () => {
      const result = menuActions.menuLoadComplete(12345)

      expect(result).toEqual({
        type: actionTypes.MENU_LOAD_COMPLETE,
        timeToLoadMs: 12345
      })
    })
  })
})
