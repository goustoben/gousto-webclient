import Immutable from 'immutable'
import * as recipes from 'apis/recipes'
import * as utilsBasket from 'utils/basket'
import * as utilsDeliveries from 'utils/deliveries'
import { canUseWindow } from 'utils/browserEnvironment'
import { isServer } from 'utils/serverEnvironment'
import { unset } from 'utils/cookieHelper2'
import * as orders from 'routes/Menu/apis/orderV2'
import * as MenuServiceLoadDaysActions from 'actions/menuServiceLoadDays'
import * as MenuActionHelperActions from 'actions/menuActionHelper'
import * as boxPrices from 'apis/boxPrices'
import { actionTypes } from '../actionTypes'
import * as trackingKeys from '../trackingKeys'
import statusActions from '../status'
import * as BasketActions from '../basket'
import * as MenuBasketActions from '../../routes/Menu/actions/basketRecipes'
import tempActions from '../temp'
import * as ProductActions from '../products'
import menuActions, {
  findSlot,
  sideEventScreens,
  sideEventTypes,
  menuCutoffUntilReceive,
  forceMenuLoad,
  menuLoadMenu,
  menuLoadDays,
  menuLoadStock,
  menuBrowseCTAVisibilityChange,
  menuLoadComplete,
  menuReceiveBoxPrices,
  menuLoadBoxPrices,
  trackSidesContinueClicked,
  trackViewSidesModal,
  trackCancelSide,
  trackAddSide,
  trackViewSidesAllergens,
  trackCloseSidesAllergens,
  menuLoadOrderDetails,
} from '../menu'
jest.mock('utils/browserEnvironment')
jest.mock('utils/serverEnvironment')
jest.mock('utils/cookieHelper2')
jest.mock('utils/GoustoCookies', () => 'mock-gousto-cookies')
jest.mock('utils/isomorphicEnvironment', () => ({
  getEnvironment: () => 'local'
}))

describe('menu actions', () => {
  const cutoffDateTime = '2019-09-01T10:00:00.000Z'
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
    }),
    request: {
      get: () => 'not-facebook-user-agent'
    }
  }
  const getState = () => state

  let mockFetchAvailableDates
  let mockFetchRecipeStock
  let mockLimitReached
  let mockGetCutoffDateTime
  let mockLoadMenuCollectionsWithMenuService
  let mockMenuServiceLoadDays
  let mockFetchBoxPrices
  let mockGetStockAvailability

  beforeEach(() => {
    mockFetchAvailableDates = jest.fn()
    mockFetchRecipeStock = jest.fn().mockResolvedValue({
      data: {
        '001': {
          recipeId: '001',
          committed: '1',
          number: '53',
          familyNumber: '100'
        }
      }
    })
    mockLimitReached = jest.fn()
    mockGetCutoffDateTime = jest.fn()
    mockLoadMenuCollectionsWithMenuService = jest.fn()
    mockMenuServiceLoadDays = jest.fn()
    mockFetchBoxPrices = jest.fn().mockResolvedValue({ data: {} })
    mockGetStockAvailability = jest.fn()

    jest.spyOn(recipes, 'fetchRecipeStock').mockImplementation(mockFetchRecipeStock)
    jest.spyOn(boxPrices, 'fetchBoxPrices').mockImplementation(mockFetchBoxPrices)
    jest.spyOn(utilsBasket, 'limitReached').mockImplementation(mockLimitReached)
    jest.spyOn(utilsDeliveries, 'getCutoffDateTime').mockImplementation(mockGetCutoffDateTime)
    jest.spyOn(MenuServiceLoadDaysActions, 'menuServiceLoadDays').mockImplementation(mockMenuServiceLoadDays)
    jest.spyOn(MenuActionHelperActions, 'getStockAvailability').mockImplementation(mockGetStockAvailability)
    jest.spyOn(MenuActionHelperActions, 'loadMenuCollectionsWithMenuService').mockImplementation(mockLoadMenuCollectionsWithMenuService)
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
      await menuLoadMenu(cutoffDateTime)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledTimes(3)
    })

    test('should use date from state when cutoffDateTime is null', async () => {
      await menuLoadMenu(null)(dispatch, getState)
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

      await menuLoadMenu(cutoffDateTime)(dispatch, getStateForTest)

      expect(mockLoadMenuCollectionsWithMenuService).toHaveBeenCalled()
    })

    describe('when window is available', () => {
      beforeEach(() => {
        canUseWindow.mockReturnValue(true)
      })

      test('it unsets reload_invalid_delivery_date cookie', async () => {
        await menuLoadMenu(cutoffDateTime)(dispatch, getState)

        expect(unset).toHaveBeenCalledWith('mock-gousto-cookies', 'reload_invalid_delivery_date')
      })
    })

    describe('when on the server', () => {
      beforeEach(() => {
        canUseWindow.mockReturnValue(false)
        isServer.mockReturnValue(true)
      })

      test('dispatches action to redirect to /menu', async () => {
        await menuLoadMenu(null)(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith({
          clearCookies: true,
          type: 'SERVER_REDIRECT',
          url: '/menu',
        })
      })
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
          await menuLoadDays()(dispatch, getState)
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
        mockGetStockAvailability.mockReturnValue({
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
      const menuLoadStockAction = menuLoadStock(true)

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
      const menuLoadStockAction = menuLoadStock(false)
      beforeEach(() => {
        mockGetStockAvailability.mockReturnValue({
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
      const result = menuCutoffUntilReceive('2020-06-26')

      expect(result).toEqual({
        type: actionTypes.MENU_CUTOFF_UNTIL_RECEIVE,
        cutoffUntil: '2020-06-26',
      })
    })
  })

  describe('forceMenuLoad', () => {
    test('should return a MENU_FORCE_LOAD action', () => {
      const result = forceMenuLoad(true)

      expect(result).toEqual({
        type: actionTypes.MENU_FORCE_LOAD,
        forceLoad: true,
      })
    })
  })

  describe('menuBrowseCTAVisibilityChange', () => {
    test('should return a MENU_BROWSE_CTA_VISIBILITY_CHANGE action', () => {
      const result = menuBrowseCTAVisibilityChange(true)

      expect(result).toEqual({
        type: actionTypes.MENU_BROWSE_CTA_VISIBILITY_CHANGE,
        show: true,
      })
    })
  })

  describe('menuLoadComplete', () => {
    test('should return a MENU_LOAD_COMPLETE action with correct time to load and menu service state', () => {
      const result = menuLoadComplete(12345, true)

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
      const result = menuReceiveBoxPrices(prices, tariffId)
      expect(result).toEqual({
        type: actionTypes.MENU_BOX_PRICES_RECEIVE,
        prices,
        tariffId,
      })
    })
  })

  describe('menuLoadBoxPrices', () => {
    describe('when dispatched', () => {
      test('then updates store with received prices', async () => {
        const getStateForPrice = () => ({
          ...state,
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

        await menuLoadBoxPrices()(dispatch, getStateForPrice)

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
      const trackingAction = trackSidesContinueClicked('side-ids', 'sides-total-surcharge', 'total_number-of-sides')

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
      const trackingAction = trackViewSidesModal()

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
      const trackingAction = trackCancelSide()

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
      const trackingAction = trackAddSide('side-id', 'order-id')

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
      const trackingAction = trackViewSidesAllergens()

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
      const trackingAction = trackCloseSidesAllergens()

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

  describe('menuLoadOrderDetails', () => {
    let fetchOrderSpy
    let statusActionsPendingSpy
    let basketResetSpy
    let basketDateChangeSpy
    let basketNumPortionChangeSpy
    let basketRecipeAddSpy
    let basketProductAddSpy
    let basketIdChangeSpy
    let basketOrderLoadedSpy
    let basketChosenAddressChangeSpy
    let basketPostcodeChangeSpy
    let basketSlotChangeSpy
    let productsLoadProductsByIdSpy
    let productsLoadStockSpy
    let productsLoadCategoriesSpy
    let menuCutoffUntilReceiveSpy
    let menuChangeRecipeStockSpy
    let tempSpy

    beforeEach(() => {
      fetchOrderSpy = jest.spyOn(orders, 'fetchOrder').mockImplementation()
      statusActionsPendingSpy = jest.spyOn(statusActions, 'pending').mockImplementation()
      basketResetSpy = jest.spyOn(BasketActions, 'basketReset').mockImplementation()
      basketDateChangeSpy = jest.spyOn(BasketActions, 'basketDateChange').mockImplementation()
      basketNumPortionChangeSpy = jest.spyOn(BasketActions, 'basketNumPortionChange').mockImplementation()
      basketRecipeAddSpy = jest.spyOn(MenuBasketActions, 'basketRecipeAdd').mockImplementation()
      basketProductAddSpy = jest.spyOn(BasketActions, 'basketProductAdd').mockImplementation()
      basketIdChangeSpy = jest.spyOn(BasketActions, 'basketIdChange').mockImplementation()
      basketOrderLoadedSpy = jest.spyOn(BasketActions, 'basketOrderLoaded').mockImplementation()
      basketChosenAddressChangeSpy = jest.spyOn(BasketActions, 'basketChosenAddressChange').mockImplementation()
      basketPostcodeChangeSpy = jest.spyOn(BasketActions, 'basketPostcodeChange').mockImplementation()
      basketSlotChangeSpy = jest.spyOn(BasketActions, 'basketSlotChange').mockImplementation()
      productsLoadProductsByIdSpy = jest.spyOn(ProductActions, 'productsLoadProductsById').mockImplementation()
      productsLoadStockSpy = jest.spyOn(ProductActions, 'productsLoadStock').mockImplementation()
      productsLoadCategoriesSpy = jest.spyOn(ProductActions, 'productsLoadCategories').mockImplementation()
      menuCutoffUntilReceiveSpy = jest.spyOn(menuActions, 'menuCutoffUntilReceive').mockImplementation()
      menuChangeRecipeStockSpy = jest.spyOn(menuActions, 'menuChangeRecipeStock').mockImplementation()
      tempSpy = jest.spyOn(tempActions, 'temp').mockImplementation()
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    describe('when fetching the order successfully', () => {
      it('should setup the basket and store state correctly', async () => {
        const numPortions = 2
        fetchOrderSpy.mockResolvedValue({
          data: {
            id: 'order_id',
            box: {
              numPortions,
            },
            shouldCutoffAt: 'should_cut_off_at',
            deliveryDate: 'delivery_date',
            recipeItems: [
              { recipeId: 'recipes_1', quantity: 2 },
              { recipeId: 'recipes_2', quantity: 2 },
            ],
            productItems: [
              { itemableId: 'product_1', quantity: 2 },
              { itemableId: 'product_2', quantity: 2 },
            ],
            prices: {
              grossTotal: 20,
              total: 24,
            },
            shippingAddress: {
              postcode: 'N1 4DY'
            },
            deliverySlot: {
              id: 'delivery_slot_id',
            }
          }
        })
        const boxSummaryDeliveryDaysId = 'dg015db8'
        state.boxSummaryDeliveryDays = Immutable.fromJS({
          '2019-10-22': {
            slots: [
              {
                id: boxSummaryDeliveryDaysId,
                coreSlotId: 'delivery_slot_id'
              }
            ]
          }
        })

        await menuLoadOrderDetails('order_id')(dispatch, getState)

        expect(fetchOrderSpy).toHaveBeenNthCalledWith(1, dispatch, getState, 'order_id', 'shipping_address')
        expect(statusActionsPendingSpy).toHaveBeenNthCalledWith(1, 'LOADING_ORDER', true)
        expect(basketResetSpy).toBeCalledTimes(1)
        expect(basketDateChangeSpy).toHaveBeenNthCalledWith(1, 'delivery_date')
        expect(basketNumPortionChangeSpy).toHaveBeenNthCalledWith(1, numPortions, 'order_id')
        expect(basketRecipeAddSpy).toBeCalledTimes(2)
        expect(basketRecipeAddSpy).toHaveBeenNthCalledWith(1, 'recipes_1', undefined, undefined, undefined, 'order_id')
        expect(basketRecipeAddSpy).toHaveBeenNthCalledWith(2, 'recipes_2', undefined, undefined, undefined, 'order_id')
        expect(menuChangeRecipeStockSpy).toBeCalledTimes(2)
        expect(menuChangeRecipeStockSpy).toHaveBeenNthCalledWith(1, { recipes_1: { 2: 4 } })
        expect(menuChangeRecipeStockSpy).toHaveBeenNthCalledWith(2, { recipes_2: { 2: 4 } })
        expect(basketProductAddSpy).toBeCalledTimes(4)
        expect(basketProductAddSpy).toHaveBeenNthCalledWith(1, 'product_1')
        expect(basketProductAddSpy).toHaveBeenNthCalledWith(2, 'product_1')
        expect(basketProductAddSpy).toHaveBeenNthCalledWith(3, 'product_2')
        expect(basketProductAddSpy).toHaveBeenNthCalledWith(4, 'product_2')
        expect(basketIdChangeSpy).toHaveBeenNthCalledWith(1, 'order_id')
        expect(basketOrderLoadedSpy).toHaveBeenNthCalledWith(1, 'order_id')
        expect(basketSlotChangeSpy).toHaveBeenNthCalledWith(1, boxSummaryDeliveryDaysId)
        expect(productsLoadProductsByIdSpy).toHaveBeenNthCalledWith(1, ['product_1', 'product_2'])
        expect(productsLoadStockSpy).toBeCalledTimes(1)
        expect(productsLoadCategoriesSpy).toBeCalledTimes(1)
        expect(menuCutoffUntilReceiveSpy).toHaveBeenNthCalledWith(1, 'should_cut_off_at')
        expect(basketPostcodeChangeSpy).toHaveBeenNthCalledWith(1, 'N1 4DY')
        expect(basketChosenAddressChangeSpy).toHaveBeenNthCalledWith(1, { postcode: 'N1 4DY' })
        expect(tempSpy).toBeCalledTimes(2)
        expect(tempSpy).toHaveBeenNthCalledWith(1, 'originalGrossTotal', 20)
        expect(tempSpy).toHaveBeenNthCalledWith(2, 'originalNetTotal', 24)
        expect(statusActionsPendingSpy).toHaveBeenNthCalledWith(2, 'LOADING_ORDER', false)
      })
    })

    describe('when fetching the order fails', () => {
      it('should reset the status for LOADING_ORDER and throw the error', async () => {
        fetchOrderSpy.mockRejectedValue(Error('error'))

        try {
          await menuLoadOrderDetails('order_id')(dispatch, getState)
        } catch (error) {
          expect(error).toBeInstanceOf(Error)
          expect(statusActionsPendingSpy).toHaveBeenNthCalledWith(1, 'LOADING_ORDER', true)
          expect(statusActionsPendingSpy).toHaveBeenNthCalledWith(2, 'LOADING_ORDER', false)
        }
      })
    })
  })
})
