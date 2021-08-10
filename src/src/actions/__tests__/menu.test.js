import Immutable from 'immutable'
import { actionTypes } from '../actionTypes'
import * as trackingKeys from '../trackingKeys'
const mockFetchAvailableDates = jest.fn()
const mockFetchRecipeStock = jest.fn()
const mockLimitReached = jest.fn()
const mockGetCutoffDateTime = jest.fn()

const mockLoadMenuCollectionsWithMenuService = jest.fn()
const mockMenuServiceLoadDays = jest.fn()
const mockFetchBoxPrices = jest.fn().mockResolvedValue({ data: {} })

jest.mock('apis/recipes', () => ({
  fetchRecipeStock: mockFetchRecipeStock,
}))

jest.mock('utils/basket', () => ({
  limitReached: mockLimitReached,
}))

jest.mock('utils/deliveries', () => ({
  getCutoffDateTime: mockGetCutoffDateTime
}))

jest.mock('actions/menuServiceLoadDays', () => ({
  menuServiceLoadDays: mockMenuServiceLoadDays,
}))

jest.mock('actions/menuActionHelper', () => ({
  getStockAvailability: jest.fn(),
  loadMenuCollectionsWithMenuService: mockLoadMenuCollectionsWithMenuService,
}))

jest.mock('apis/boxPrices', () => ({
  fetchBoxPrices: mockFetchBoxPrices,
}))

describe('menu actions', () => {
  const cutoffDateTime = '2019-09-01T10:00:00.000Z'
  const { findSlot, sideEventScreens, sideEventTypes, ...menuActions} = require('../menu')//eslint-disable-line
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
  const getState = () => state

  beforeEach(() => {
    mockFetchRecipeStock.mockResolvedValue({
      data: {
        '001': {
          recipeId: '001',
          committed: '1',
          number: '53',
          familyNumber: '100'
        }
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
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
      mockFetchAvailableDates.mockResolvedValue({
        data: [
          { until: '2019-09-17T00:00:00+01:00' },
          { until: '2019-10-22T00:00:00+01:00' }
        ]
      })
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

  describe('menuReceiveBoxPrices', () => {
    const prices = {
      items: []
    }
    const tariffId = '233'
    test('should return action MENU_BOX_PRICES_RECEIVE with price and tariffId', () => {
      const result = menuActions.menuReceiveBoxPrices(prices, tariffId)
      expect(result).toEqual({
        type: actionTypes.MENU_BOX_PRICES_RECEIVE,
        prices,
        tariffId,
      })
    })
  })

  describe('recipeVariantDropdownExpanded', () => {
    const recipeData = {
      recipeId: '123'
    }

    test('should return action MENU_RECIPE_VARIANTS_DROPDOWN_EXPANDED with no recipe data', () => {
      const result = menuActions.recipeVariantDropdownExpanded(null)
      expect(result).toEqual({
        type: actionTypes.MENU_RECIPE_VARIANTS_DROPDOWN_EXPANDED,
        payload: {
          recipeData: null,
        },
        trackingData: {
          actionType: 'disclose_recipe_variants',
          show: false,
        },
      })
    })

    test('should return action MENU_RECIPE_VARIANTS_DROPDOWN_EXPANDED with recipe data', () => {
      const result = menuActions.recipeVariantDropdownExpanded(recipeData)
      expect(result).toEqual({
        type: actionTypes.MENU_RECIPE_VARIANTS_DROPDOWN_EXPANDED,
        payload: {
          recipeData,
        },
        trackingData: {
          actionType: 'disclose_recipe_variants',
          show: true,
        },
      })
    })
  })

  describe('menuLoadBoxPrices', () => {
    describe('when dispatched', () => {
      test('then updates store with received prices', async () => {
        const getStateForPrice = () => ({
          ...state,
          features: Immutable.fromJS({
            isWizardPricePerServingEnabled: {
              value: true,
            }
          }),
          basket: Immutable.fromJS({
            promoCode: 'promo',
            tariffId: 'id'
          }),
          routing: {
            locationBeforeTransitions: {
              pathname: 'signup/box-size',
            }
          }
        })

        await menuActions.menuLoadBoxPrices()(dispatch, getStateForPrice)

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: actionTypes.MENU_BOX_PRICES_RECEIVE,
          prices: {},
          tariffId: 'id'
        })
      })
    })
  })

  describe('trackSidesContinueClicked', () => {
    it('should return action TRACK_CONTINUE_WITH_SIDES_CLICKED', () => {
      const trackingAction = menuActions.trackSidesContinueClicked('side-ids', 'sides-total-surcharge', 'total_number-of-sides')

      expect(trackingAction).toEqual(
        {
          type: actionTypes.TRACK_CONTINUE_WITH_SIDES_CLICKED,
          trackingData:
          {
            event_name: trackingKeys.sideModalSidesContinueClicked,
            event_screen: sideEventScreens.orderSidesScreen,
            event_type: sideEventTypes.primaryAction,
            sides_counts: 'total_number-of-sides',
            sides_ids: 'side-ids',
            sides_total_surcharge: 'sides-total-surcharge'
          },
        }
      )
    })
  })

  describe('trackViewSidesModal', () => {
    it('should return action MENU_TRACK_VIEW_SIDES_MODAL', () => {
      const trackingAction = menuActions.trackViewSidesModal()

      expect(trackingAction).toEqual(
        {
          type: actionTypes.TRACK_VIEW_ORDER_SIDES_SCREEN,
          trackingData: {
            event_name: trackingKeys.sideModalViewOrderSidesScreen,
            event_type: sideEventTypes.screenView,
            event_screen: sideEventScreens.orderSidesScreen,
          },
        }
      )
    })
  })

  describe('trackCancelSide', () => {
    it('should return action TRACK_ORDER_SIDES_CANCEL', () => {
      const trackingAction = menuActions.trackCancelSide()

      expect(trackingAction).toEqual(
        {
          type: actionTypes.TRACK_ORDER_SIDES_CANCEL,
          trackingData: {
            event_name: trackingKeys.sideModalOrderSidesCancel,
            event_type: sideEventTypes.closeScreen
          }
        }
      )
    })
  })

  describe('trackAddSide', () => {
    it('should return action TRACK_ADD_SIDE', () => {
      const trackingAction = menuActions.trackAddSide('side-id', 'order-id')

      expect(trackingAction).toEqual(
        {
          type: actionTypes.TRACK_ADD_SIDE,
          trackingData: {
            event_name: trackingKeys.sideModalAddSide,
            side_id: 'side-id',
            order_id: 'order-id',
          }
        }
      )
    })
  })

  describe('trackViewSidesAllergens', () => {
    it('should return action TRACK_ORDER_SIDES_SEE_ALLERGENS', () => {
      const trackingAction = menuActions.trackViewSidesAllergens()

      expect(trackingAction).toEqual(
        {
          type: actionTypes.TRACK_VIEW_ORDER_SIDES_ALLERGENS_SCREEN,
          trackingData: {
            event_name: trackingKeys.sideModalViewOrderSidesAllergensScreen,
            event_screen: sideEventScreens.orderSidesScreen,
            event_type: sideEventTypes.tertiaryAction
          }
        }
      )
    })
  })

  describe('trackCloseSidesAllergens', () => {
    it('should return action TRACK_CLOSE_ORDER_SIDES_ALLERGENS_SCREEN', () => {
      const trackingAction = menuActions.trackCloseSidesAllergens()

      expect(trackingAction).toEqual(
        {
          type: actionTypes.TRACK_CLOSE_ORDER_SIDES_ALLERGENS_SCREEN,
          trackingData: {
            event_name: trackingKeys.sideModalClose,
            event_screen: sideEventScreens.orderSidesAllergensScreen,
            event_type: sideEventTypes.closeScreen
          }
        }
      )
    })
  })
})
