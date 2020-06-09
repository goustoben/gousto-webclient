import Immutable from 'immutable'
import { actionTypes } from '../actionTypes'
const mockFetchAvailableDates = jest.fn()
const mockFetchRecipeStock = jest.fn()
const mockLimitReached = jest.fn()
const mockGetCutoffDateTime = jest.fn()

const mockDispatchLoadRecipesForAllCollections = jest.fn()
const mockLoadMenuCollectionsWithMenuService = jest.fn()
const mockMenuServiceLoadDays = jest.fn()

jest.mock('apis/recipes', () => ({
  fetchRecipeStock: mockFetchRecipeStock,
}))

jest.mock('utils/basket', () => ({
  limitReached: mockLimitReached
}))

jest.mock('utils/deliveries', () => ({
  getCutoffDateTime: mockGetCutoffDateTime
}))

jest.mock('actions/menuCollections', () => ({
  loadRecipesForAllCollections: () => mockDispatchLoadRecipesForAllCollections
}))

jest.mock('actions/menuServiceLoadDays', () => ({
  menuServiceLoadDays: mockMenuServiceLoadDays,
}))

jest.mock('actions/menuActionHelper', () => ({
  getStockAvailability: jest.fn(),
  loadMenuCollectionsWithMenuService: mockLoadMenuCollectionsWithMenuService,
}))

describe('menu actions', () => {
  const cutoffDateTime = '2019-09-01T10:00:00.000Z'
  const { findSlot, ...menuActions }= require('../menu')//eslint-disable-line
  const { getStockAvailability } = require('../menuActionHelper')//eslint-disable-line
  const dispatch = jest.fn()
  const state = {
    auth: Immutable.fromJS({
      accessToken: 'test'
    }),
    basket: Immutable.fromJS({
      numPortions: 2,
      date: '2019-10-22T00:00:00+01:00',
      recipes: {
        1234: 2,
        5678: 1
      }
    }),
    boxSummaryDeliveryDays: Immutable.fromJS({
      '2019-10-22T00:00:00+01:00': {
        coreDayId: '001'
      }
    }),
    features: Immutable.fromJS({
      menuService: {
        value: false
      }
    })
  }
  let getState = () => state

  beforeEach(() => {
    mockFetchRecipeStock.mockResolvedValue({ data: {
      '001': {
        recipeId: '001',
        committed: '1',
        number: '53',
        familyNumber: '100'
      }
    }})
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('menuReceiveMenu', () => {
    test('should return RECIPES_RECEIVE action', () => {
      const result = menuActions.menuReceiveMenu(['234', '235'])
      expect(result).toEqual({
        type: actionTypes.RECIPES_RECEIVE,
        recipes: ['234', '235'],
      })
    })
  })

  describe('findSlot', () => {
    let boxSummaryDeliveryDays
    let coreSlotId
    describe('when slot found', () => {
      beforeEach(() => {
        boxSummaryDeliveryDays = Immutable.fromJS({
          '2019-10-22': {
            slots: [
              {
                id: 'dg015db8',
                coreSlotId: '001'
              }
            ]
          }
        })
        coreSlotId = '001'
      })
      test('should return slotId', () => {
        const result = findSlot(boxSummaryDeliveryDays, coreSlotId)
        expect(result).toEqual('dg015db8')
      })
    })

    describe('when slot not found', () => {
      beforeEach(() => {
        boxSummaryDeliveryDays = Immutable.fromJS({
          '2019-10-22': {
            slots: [
              {
                id: 'dg015db8',
                coreSlotId: '001'
              }
            ]
          }
        })
        coreSlotId = '002'
      })
      test('should return undefined', () => {
        const result = findSlot(boxSummaryDeliveryDays, coreSlotId)
        expect(result).toEqual(undefined)
      })
    })
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

      expect(mockLoadMenuCollectionsWithMenuService).toHaveBeenCalled()
    })
  })

  describe('menuLoadDays', () => {
    beforeEach(() => {
      mockFetchAvailableDates.mockResolvedValue({ data: [
        { until: '2019-09-17T00:00:00+01:00' },
        { until: '2019-10-22T00:00:00+01:00' }
      ]})
    })

    describe('given menuService turned on', () => {
      describe('when call `menuLoadDays`', () => {
        beforeEach(async () => {
          await menuActions.menuLoadDays()(dispatch, getState)
        })

        test('then should have called `loadDays`', () => {
          expect(mockMenuServiceLoadDays).toHaveBeenCalled()
        })

        test('then should not have called `fetchAvailableDates`', () => {
          expect(mockFetchAvailableDates).not.toHaveBeenCalled()
        })

        test('then should not have dispatched value', () => {
          expect(dispatch).not.toHaveBeenCalled()
        })
      })
    })
  })

  describe('menuLoadStock', () => {
    describe('clearStock is true', () => {
      beforeEach(() => {
        getStockAvailability.mockReturnValue({
          '001': {
            2: 53,
            4: 100,
            committed: true
          }
        })
      })
      afterEach(() => {
        jest.clearAllMocks()
      })
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
        const callsForFirstRecipe = dispatch.mock.calls.filter(c => c[0].type && c[0].type === actionTypes.MENU_RECIPE_STOCK_CHANGE
            && c[0].stock && c[0].stock['1234'] && c[0].stock['1234'][2] === -1)

        expect(callsForFirstRecipe).toHaveLength(2)
        expect(dispatch).toHaveBeenCalledWith({
          type: actionTypes.MENU_RECIPE_STOCK_CHANGE,
          stock: { 5678: { 2: -1 } },
        })
      })
    })

    describe('clearStock is false', () => {
      const menuLoadStockAction = menuActions.menuLoadStock(false)
      beforeEach(() => {
        getStockAvailability.mockReturnValue({
          '001': {
            2: 53,
            4: 100,
            committed: true
          }
        })
      })
      afterEach(() => {
        jest.clearAllMocks()
      })

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

  describe('menuCutoffUntilReceive', () => {
    test('should return a MENU_CUTOFF_UNTIL_RECEIVE action with the first argument mapped through to the cutoffUntil property', () => {
      const result = menuActions.menuCutoffUntilReceive('2020-06-26')

      expect(result).toEqual({
        type: actionTypes.MENU_CUTOFF_UNTIL_RECEIVE,
        cutoffUntil: '2020-06-26',
      })
    })
  })

  describe('forceMenuLoad', () => {
    test('should return a MENU_FORCE_LOAD action', () => {
      const result = menuActions.forceMenuLoad(true)

      expect(result).toEqual({
        type: actionTypes.MENU_FORCE_LOAD,
        forceLoad: true,
      })
    })
  })

  describe('menuBrowseCTAVisibilityChange', () => {
    test('should return a MENU_BROWSE_CTA_VISIBILITY_CHANGE action', () => {
      const result = menuActions.menuBrowseCTAVisibilityChange(true)

      expect(result).toEqual({
        type: actionTypes.MENU_BROWSE_CTA_VISIBILITY_CHANGE,
        show: true,
      })
    })
  })

  describe('menuAddEmptyStock', () => {
    beforeEach(() => {
      getState = () => ({
        menuRecipes: ['123', '234']
      })
    })
    test('should return a MENU_RECIPE_STOCK_CHANGE action', () => {
      menuActions.menuAddEmptyStock(true)(dispatch, getState)

      expect(dispatch.mock.calls[0]).toEqual([{
        type: actionTypes.MENU_RECIPE_STOCK_CHANGE,
        stock: {
          123: {
            2: null,
            4: null
          },
          234: {
            2: null,
            4: null
          }
        },
      }])
    })
  })

  describe('menuLoadComplete', () => {
    test('should return a MENU_LOAD_COMPLETE action with correct time to load and menu service state', () => {
      const result = menuActions.menuLoadComplete(12345, true)

      expect(result).toEqual({
        type: actionTypes.MENU_LOAD_COMPLETE,
        timeToLoadMs: 12345,
        useMenuService: true
      })
    })
  })

  describe('selectRecipeVariant', () => {
    test('should return a MENU_RECIPE_VARIANT_SELECTED action with correct payload and trackingData', () => {
      const originalRecipeId = '101'
      const variantId = '102'
      const collectionId = '999'
      const variantOutOfStock = false
      const view = 'detail'

      const result = menuActions.selectRecipeVariant(originalRecipeId, variantId, collectionId, variantOutOfStock, view)

      expect(result).toEqual({
        type: actionTypes.MENU_RECIPE_VARIANT_SELECTED,
        payload: {
          collectionId,
          originalRecipeId,
          variantId
        },
        trackingData: {
          actionType: 'select_recipe_variant',
          recipe_id: originalRecipeId,
          recipe_variant_id: variantId,
          collection_id: collectionId,
          variant_out_of_stock: variantOutOfStock,
          view
        }
      })
    })
  })
})
