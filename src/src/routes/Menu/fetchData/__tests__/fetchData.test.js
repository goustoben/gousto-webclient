import Immutable from 'immutable'
import moment from 'moment'
import now from 'performance-now'

import actions from 'actions'
import { actionTypes } from 'actions/actionTypes'
import { preselectOrderIdForDeliveryDate } from 'actions/user'
import { initialState as initialAuthState } from 'reducers/auth'
import { initialState as initialBasketState } from 'reducers/basket'
import { initialState as initialRequestState } from 'reducers/request'
import { initialState as initialFeaturesState } from 'reducers/features'
import { menuInitialState } from 'reducers/menu'
import { defaultState as defaultUserState } from 'reducers/user'
import logger from 'utils/logger'
import { getLandingDay } from 'utils/deliveries'
import { menuLoadComplete } from 'actions/menu'
import { fetchMenus, fetchMenusWithUserId } from 'apis/menus'
import { fetchBrandInfo } from 'apis/brand'
import * as boxSummaryActions from 'actions/boxSummary'
import { getUserMenuVariant } from 'selectors/features'

import fetchData from '../fetchData'

import { setSlotFromIds, getPreselectedCollectionName, selectCollection } from '../utils'

jest.mock('actions/user', () => ({
  preselectOrderIdForDeliveryDate: jest.fn()
}))

jest.mock('../utils')
jest.mock('utils/deliveries')
jest.mock('utils/logger')
jest.mock('performance-now')
jest.mock('apis/menus')
jest.mock('apis/brand')
jest.mock('selectors/features')
jest.mock('actions/menu')

describe('menu fetchData', () => {
  let state = {
    auth: initialAuthState(),
    features: initialFeaturesState(),
    basket: initialBasketState(),
    request: initialRequestState(),
    menuRecipes: Immutable.List(),
    menuRecipeStock: Immutable.Map({}),
    menuRecipesUpdatedAt: null,
    menuCollections: Immutable.OrderedMap(),
    menuCollectionRecipes: Immutable.Map({}),
    user: defaultUserState,
    pending: Immutable.Map({}),
    menu: menuInitialState,
    menuService: {
      data: [{
        id: '123',
        ends_at: '2019-01-03T11:59:59+01:00'
      }]
    }
  }

  const originalState = { ...state }

  let store = {
    dispatch: jest.fn().mockResolvedValue(undefined),
    getState: () => state
  }
  const query = {
    error: null
  }
  const params = {
    orderId: null
  }

  // we need to manually set up mocks for the thunks, because we don't want mocks around the non-thunk actions
  // otherwise they will just be stubs rather than returning { type: ..., ... } objects
  actions.menuLoadStock = jest.fn()
  actions.menuLoadOrderDetails = jest.fn()
  actions.menuLoadMenu = jest.fn()
  actions.menuLoadDays = jest.fn()
  boxSummaryActions.boxSummaryDeliveryDaysLoad = jest.fn()
  actions.basketNumPortionChange = jest.fn()
  actions.basketRecipeAdd = jest.fn()
  actions.userLoadOrders = jest.fn()
  actions.userLoadData = jest.fn()

  beforeEach(() => {
    state = { ...originalState }

    store.dispatch.mockReset()
    store.dispatch.mockResolvedValue(undefined)

    getLandingDay.mockReset()
    getLandingDay.mockReturnValue({ date: '2010-12-25T12:00:00' })
    menuLoadComplete.mockReset()

    actions.menuLoadStock.mockReset()
    actions.menuLoadOrderDetails.mockReset()
    actions.menuLoadMenu.mockReset()
    actions.menuLoadDays.mockReset()
    boxSummaryActions.boxSummaryDeliveryDaysLoad.mockReset()
    actions.basketNumPortionChange.mockReset()
    actions.basketRecipeAdd.mockReset()

    actions.userLoadOrders.mockReset()

    fetchMenus.mockReset()
    fetchBrandInfo.mockReset()
    preselectOrderIdForDeliveryDate.mockReset()
  })

  describe('is pending', () => {
    beforeEach(() => {
      state.pending = state.pending.set(actionTypes.MENU_FETCH_DATA, true)
    })

    test('should not dispatch', async () => {
      await fetchData({ store, query, params }, false, false)

      expect(store.dispatch).not.toHaveBeenCalled()
    })
  })

  describe('is not pending', () => {
    describe('should not fetch', () => {
      const force = false
      const paramsWithoutOrderId = {
        ...params,
        orderId: null
      }

      beforeEach(() => {
        const recipes = ['001', '002', '003', '004', '005', '006', '007', '008', '009']
        state.menuRecipes = Immutable.List(recipes)
        state.menuCollectionRecipes = state.menuCollectionRecipes.set('123', recipes)
        state.menuRecipesUpdatedAt = moment()
        getUserMenuVariant.mockReturnValue('')
      })

      test('should not dispatch', async () => {
        await fetchData({ store, query, params: paramsWithoutOrderId }, force, false)

        expect(store.dispatch).not.toHaveBeenCalled()
      })
    })

    describe('should fetch', () => {
      test('should dispatch pending action', async () => {
        await fetchData({ store, query, params }, false, false)

        expect(store.dispatch.mock.calls[0]).toEqual([{
          type: actionTypes.PENDING,
          key: actionTypes[actionTypes.MENU_FETCH_DATA],
          value: true
        }])
      })

      describe('query has error', () => {
        const errorQuery = {
          ...query,
          error: 'some-error'
        }

        test('should dispatch error action', async () => {
          await fetchData({ store, query: errorQuery, params }, false, false)

          expect(store.dispatch.mock.calls[3]).toEqual([{
            type: actionTypes.ERROR,
            key: actionTypes[actionTypes.ORDER_SAVE],
            value: 'some-error'
          }])
        })

        describe('error is no-stock', () => {
          const noStockQuery = {
            ...query,
            error: 'no-stock'
          }

          test('should dispatch menuLoadStock action', async () => {
            // we need to test that dispatch is called with the **result** of the action creator
            // so making it return a symbol is an easy way to do that
            const menuLoadStockResult = Symbol('fake action creator result')
            actions.menuLoadStock.mockReturnValue(menuLoadStockResult)

            await fetchData({ store, query: noStockQuery, params }, false, false)

            expect(store.dispatch.mock.calls[4]).toEqual([menuLoadStockResult])
          })
        })
      })

      describe('params has order id', () => {
        const orderId = '123'
        const paramsWithOrderId = {
          ...params,
          orderId
        }

        describe('is authenticated', () => {
          beforeEach(() => {
            state.auth = state.auth.set('isAuthenticated', true)
          })

          test('should dispatch menuLoadOrderDetails', async () => {
            // we need to test that dispatch is called with the **result** of the action creator
            // so making it return a symbol is an easy way to do that
            const menuLoadOrderDetailsResult = Symbol('fake action creator result')

            // use mockImplementation and only return the symbol if it's called with the expected orderId
            actions.menuLoadOrderDetails.mockImplementation(loadOrderId => (loadOrderId === orderId ? menuLoadOrderDetailsResult : undefined))

            await fetchData({ store, query, params: paramsWithOrderId }, false, false)

            expect(store.dispatch.mock.calls[4]).toEqual([menuLoadOrderDetailsResult])
          })

          describe('menuLoadOrderDetails changes number of recipes in basket', () => {
            beforeEach(() => {
              state.basket = state.basket.set('recipes', Immutable.fromJS({
                200: 1,
                250: 2
              }))
            })

            test('should dispatch basketRecipeAdd for each previous recipe', async () => {
              // this test requires some horrible setup because it checks the same value twice
              // which means we have to manually simulate some state changes
              const menuLoadOrderDetailsResult = Symbol('fake action creator result')
              actions.menuLoadOrderDetails.mockReturnValue(menuLoadOrderDetailsResult)

              store.dispatch.mockImplementation(event => {
                if (event === menuLoadOrderDetailsResult) {
                  return Promise.resolve(undefined).then(() => {
                    state.basket = originalState.basket
                  })
                }

                return Promise.resolve(undefined)
              })

              // just make it return an object with the recipe id to make for easier assertions
              actions.basketRecipeAdd.mockImplementation(recipeId => ({ recipeId }))

              await fetchData({ store, query, params: paramsWithOrderId }, false, false)

              expect(store.dispatch.mock.calls[5]).toEqual([{ recipeId: '200' }])
              expect(store.dispatch.mock.calls[6]).toEqual([{ recipeId: '250' }])
              expect(store.dispatch.mock.calls[7]).toEqual([{ recipeId: '250' }])
            })
          })

          test('should dispatch menuLoadMenu', async () => {
            // we need to test that dispatch is called with the **result** of the action creator
            // so making it return a symbol is an easy way to do that
            const menuLoadMenuResult = Symbol('fake action creator result')

            actions.menuLoadMenu.mockReturnValue(menuLoadMenuResult)

            await fetchData({ store, query, params: paramsWithOrderId }, false, false)

            expect(store.dispatch.mock.calls[5]).toEqual([menuLoadMenuResult])
          })

          test('should dispatch menuLoadStock', async () => {
            // we need to test that dispatch is called with the **result** of the action creator
            // so making it return a symbol is an easy way to do that
            const menuLoadStockResult = Symbol('fake action creator result')

            actions.menuLoadStock.mockReturnValue(menuLoadStockResult)

            await fetchData({ store, query, params: paramsWithOrderId }, false, false)

            expect(store.dispatch.mock.calls[6]).toEqual([menuLoadStockResult])
          })
        })
      })

      describe('params does not have order id', () => {
        describe('basket has order id', () => {
          const firstShippingAddress = { id: 'shipping-1', shippingDefault: false }
          const defaultShippingAddress = { id: 'shipping-2', shippingDefault: true }

          beforeEach(() => {
            state.basket = state.basket.set('orderId', '123')
            state.user = state.user.setIn(['shippingAddresses', 0], firstShippingAddress)
            state.user = state.user.setIn(['shippingAddresses', 1], defaultShippingAddress)
          })

          test('should dispatch basket reset action with default shipping address', async () => {
            await fetchData({ store, query, params }, false, false)

            expect(store.dispatch.mock.calls[3]).toEqual([{
              type: actionTypes.BASKET_RESET,
              payload: {
                chosenAddress: defaultShippingAddress
              }
            }])
          })

          describe('when there is no default shipping address', async () => {
            const secondShippingAddress = { id: 'shipping-3', shippingDefault: false }

            beforeEach(() => {
              state.basket = state.basket.set('orderId', '123')
              state.user = state.user.setIn(['shippingAddresses', 1], secondShippingAddress)
            })

            test('should dispatch basket reset action with first shipping address', async () => {
              await fetchData({ store, query, params }, false, false)

              expect(store.dispatch.mock.calls[3]).toEqual([{
                type: actionTypes.BASKET_RESET,
                payload: {
                  chosenAddress: firstShippingAddress
                }
              }])
            })
          })
        })

        describe('query has slot id and day id', () => {
          const queryWithSlots = {
            ...query,
            day_id: '123',
            slot_id: '456'
          }

          test('should dispatch menuLoadDays action', async () => {
            // we need to test that dispatch is called with the **result** of the action creator
            // so making it return a symbol is an easy way to do that
            const menuLoadDaysResult = Symbol('fake action creator result')

            actions.menuLoadDays.mockReturnValue(menuLoadDaysResult)

            await fetchData({ store, query: queryWithSlots, params }, false, false)

            expect(store.dispatch.mock.calls[3]).toEqual([menuLoadDaysResult])
          })

          test('should dispatch boxSummaryDeliveryDaysLoad action', async () => {
            // we need to test that dispatch is called with the **result** of the action creator
            // so making it return a symbol is an easy way to do that
            const boxSummaryDeliveryDaysLoadResult = Symbol('fake action creator result')

            boxSummaryActions.boxSummaryDeliveryDaysLoad.mockReturnValue(boxSummaryDeliveryDaysLoadResult)

            await fetchData({ store, query: queryWithSlots, params }, false, false)

            expect(store.dispatch.mock.calls[4]).toEqual([boxSummaryDeliveryDaysLoadResult])
          })

          test('should call setSlotFromIds', async () => {
            await fetchData({ store, query: queryWithSlots, params }, false, false)

            expect(setSlotFromIds).toHaveBeenCalledWith(state, queryWithSlots.slot_id, queryWithSlots.day_id, store.dispatch)
          })

          describe('when setSlotFromIds throws an error', () => {
            const err = { message: 'something broke!' }

            beforeEach(() => {
              setSlotFromIds.mockImplementation(() => {
                throw err
              })
            })

            test('should log the error', async () => {
              await fetchData({ store, query: queryWithSlots, params }, false, false)

              expect(logger.error).toHaveBeenCalledWith({
                message: `Debug fetchData: ${err.message}`,
                errors: [err]
              })
            })
          })
        })

        describe('query does not have day id and slot id', () => {
          describe('is authenticated and is not admin', () => {
            beforeEach(() => {
              state.auth = state.auth.set('isAuthenticated', true)
              state.auth = state.auth.set('isAdmin', false)
            })

            test('should dispatch userLoadOrders', async () => {
              const userLoadOrdersResult = Symbol('fake action creator result')

              actions.userLoadOrders.mockReturnValue(userLoadOrdersResult)

              await fetchData({ store, query, params }, false, false)

              expect(store.dispatch.mock.calls[3]).toEqual([userLoadOrdersResult])
            })
          })

          describe('is not authenticated', () => {
            beforeEach(() => {
              state.auth = state.auth.set('isAuthenticated', false)
            })

            test('should dispatch menuLoadDays', async () => {
              const menuLoadDaysResult = Symbol('fake action creator result')

              actions.menuLoadDays.mockReturnValue(menuLoadDaysResult)

              await fetchData({ store, query, params }, false, false)

              expect(store.dispatch.mock.calls[3]).toEqual([menuLoadDaysResult])
            })

            test('should dispatch boxSummaryDeliveryDaysLoad', async () => {
              const boxSummaryDeliveryDaysLoadResult = Symbol('fake action creator result')

              boxSummaryActions.boxSummaryDeliveryDaysLoad.mockReturnValue(boxSummaryDeliveryDaysLoadResult)

              await fetchData({ store, query, params }, false, false)

              expect(store.dispatch.mock.calls[4]).toEqual([boxSummaryDeliveryDaysLoadResult])
            })

            test('should dispatch basketDateChange with result of getLandingDay', async () => {
              const date = '2019-01-01T00:00:00'
              getLandingDay.mockReturnValue({ date })

              await fetchData({ store, query, params }, false, false)
              store.dispatch.mock.calls[5][0](store.dispatch, store.getState)
              expect(store.dispatch).toHaveBeenCalledWith({
                type: actionTypes.BASKET_DATE_CHANGE,
                date,
                menuId: '123'
              })
            })
          })
        })

        describe('query has num_portions', () => {
          const queryWithNumPortions = {
            ...query,
            num_portions: 10
          }

          test('should dispatch basketNumPortionChange', async () => {
            // we need to test that dispatch is called with the **result** of the action creator
            // so making it return a symbol is an easy way to do that
            const basketNumPortionChangeResult = Symbol('basketNumPortionChange result')

            // use mockImplementation and only return the symbol if it's called with the expected parameters
            // this would normally be accomplished using `toHaveBeenCalledWith`, but what we are actually
            // testing is that the correct action is passed to dispatch
            actions.basketNumPortionChange.mockImplementation(numPortions => (numPortions === 10 ? basketNumPortionChangeResult : undefined))

            await fetchData({ store, query: queryWithNumPortions, params }, false, false)

            expect(store.dispatch.mock.calls[6]).toEqual([basketNumPortionChangeResult])
          })
        })

        describe('query has postcode and basket does not have postcode', () => {
          const queryWithPostcode = {
            ...query,
            postcode: 'W2 3LX'
          }

          beforeEach(() => {
            state.basket = state.basket.set('postcode', null)
          })

          test('should dispatch basketPostcodeChangePure', async () => {
            await fetchData({ store, query: queryWithPostcode, params }, false, false)

            expect(store.dispatch.mock.calls[8]).toEqual([{
              type: actionTypes.BASKET_POSTCODE_CHANGE,
              postcode: 'W2 3LX'
            }])
          })
        })

        test('should dispatch menuLoadMenu', async () => {
          // we need to test that dispatch is called with the **result** of the action creator
          // so making it return a symbol is an easy way to do that
          const menuLoadMenuResult = Symbol('fake action creator result')

          actions.menuLoadMenu.mockReturnValue(menuLoadMenuResult)

          await fetchData({ store, query, params }, false, false)

          expect(store.dispatch.mock.calls[6]).toEqual([menuLoadMenuResult])
        })

        test('should catch and re-throw error from menuLoadMenu', async () => {
          menuLoadComplete.mockImplementation(() => {
            throw new Error('Error occurred')
          })

          await expect(fetchData({ store, query, params }, false, false))
            .rejects.toThrow()
        })

        describe('when user is admin', () => {
          beforeEach(() => {
            const newState = {
              ...state,
              basket: Immutable.fromJS({
                date: '2020-02-12'
              }),
              auth: Immutable.fromJS({
                isAdmin: true
              })
            }
            store = {
              dispatch: jest.fn().mockResolvedValue(undefined),
              getState: () => newState
            }
          })

          afterEach(() => {
            store = {
              dispatch: jest.fn().mockResolvedValue(undefined),
              getState: () => state
            }
          })

          test('should setCuttoff to ', async () => {
            const menuLoadMenuResult = Symbol('fake action creator result')

            actions.menuLoadMenu.mockReturnValue(menuLoadMenuResult)

            await fetchData({ store, query, params: {} }, false, false)

            expect(actions.menuLoadMenu).toHaveBeenCalledWith('2020-02-12', false)
          })
        })
      })

      describe('needs to add recipes from query', () => {
        const queryWithRecipes = {
          ...query,
          recipes: '[123,456,789]'
        }

        beforeEach(() => {
          state.auth = state.auth.set('isAuthenticated', true)
          state.auth = state.auth.set('isAdmin', false)

          state.basket = state.basket.set('numPortions', 4)
          state.menuRecipeStock = state.menuRecipeStock.setIn(['123', '4'], 2)
          state.menuRecipeStock = state.menuRecipeStock.setIn(['456', '4'], 0)
          state.menuRecipeStock = state.menuRecipeStock.setIn(['789', '4'], 1)

          // just make it return an object with the recipe id to make for easier assertions
          actions.basketRecipeAdd.mockImplementation(recipeId => ({ isMockBasketRecipeAdd: true, recipeId }))
        })

        test('should dispatch basketRecipeAdd for in stock recipes', async () => {
          await fetchData({ store, query: queryWithRecipes, params }, false, false)

          expect(store.dispatch.mock.calls[9]).toEqual([{
            isMockBasketRecipeAdd: true,
            recipeId: '123'
          }])
          expect(store.dispatch.mock.calls[10]).toEqual([{
            isMockBasketRecipeAdd: true,
            recipeId: '789'
          }])
          expect(store.dispatch).not.toHaveBeenCalledWith({
            isMockBasketRecipeAdd: true,
            recipeId: '456'
          })
        })
      })

      describe('collections feature is enabled', () => {
        const collectionName = 'foo'
        const queryWithCollection = {
          ...query,
          collection: collectionName
        }

        test('should call selectCollection with name from getPreselectedCollectionName', async () => {
          // mockImplementation is used here to ensure that queryName is passed correctly
          getPreselectedCollectionName.mockImplementation((stateArg, queryName) => (queryName === collectionName ? 'some-collection-name' : undefined))

          await fetchData({ store, query: queryWithCollection, params }, false, false)

          expect(selectCollection).toHaveBeenCalledWith(state, 'some-collection-name', store.dispatch)
        })
      })

      describe('has just for you collection', () => {
        const collectionName = 'foo'
        const queryWithCollection = {
          ...query,
          collection: collectionName
        }

        beforeEach(() => {
          state.menuCollections = state.menuCollections.set('123', Immutable.fromJS({ slug: 'recommendations' }))
          state.auth = state.auth.set('isAuthenticated', false)
        })

        test('should call selectCollection with name from getPreselectedCollectionName', async () => {
          // mockImplementation is used here to ensure that queryName is passed correctly
          getPreselectedCollectionName.mockImplementation((stateArg, queryName) => (queryName === collectionName ? 'some-collection-name' : undefined))

          await fetchData({ store, query: queryWithCollection, params }, false, false)

          expect(selectCollection).toHaveBeenCalledWith(state, 'some-collection-name', store.dispatch)
        })
      })

      test('should dispatch menuLoadComplete action', async () => {
        const firstTime = 1
        const secondTime = 2.3
        const expectedValue = 1

        const menuLoadCompleteResult = Symbol('menuLoadComplete result')

        menuLoadComplete.mockReturnValue(menuLoadCompleteResult)

        now.mockReturnValueOnce(firstTime)
          .mockReturnValueOnce(secondTime)
          .mockReturnValue(999999)

        await fetchData({ store, query, params }, false, false)

        expect(menuLoadComplete).toHaveBeenCalledWith(expectedValue, true)
        expect(store.dispatch.mock.calls[9]).toEqual([menuLoadCompleteResult])
      })
    })
  })

  describe('menuService fetchMenus', () => {
    test('Menu service fetchMenus is ', async () => {
      const orderId = '123'
      const paramsWithOrderId = {
        ...params,
        orderId
      }

      await fetchData({ store, query, params: paramsWithOrderId })

      expect(fetchMenus).toHaveBeenCalled()
      expect(fetchBrandInfo).toHaveBeenCalled()
    })
  })

  describe('menuService fetchMenusWithUserId', () => {
    describe('fetchMenusWithUserId is called', () => {
      beforeEach(() => {
        state.auth = state.auth.set('isAuthenticated', false)
        state.auth = state.auth.set('id', '')
        state.auth = state.auth.set('accessToken', '')
      })

      test('fetchMenusWithUserId is not called when user logged out', async () => {
        const menuServiceFeatureFlag = false

        const orderId = '123'
        const paramsWithOrderId = {
          ...params,
          orderId
        }

        await fetchData({ store, query, params: paramsWithOrderId }, false, false, menuServiceFeatureFlag)

        expect(fetchMenusWithUserId).not.toHaveBeenCalled()
        expect(fetchBrandInfo).toHaveBeenCalled()
      })
    })

    describe('fetchMenusWithUserId is called', () => {
      beforeEach(() => {
        state.auth = state.auth.set('isAuthenticated', true)
        state.auth = state.auth.set('id', 'test-id')
        state.auth = state.auth.set('accessToken', 'test-token')
      })
      test('when config or featureflag is enabled and user logged in', async () => {
        const orderId = '123'
        const paramsWithOrderId = {
          ...params,
          orderId
        }

        await fetchData({ store, query, params: paramsWithOrderId }, false, false)

        expect(fetchMenusWithUserId).toHaveBeenCalled()
        expect(fetchBrandInfo).toHaveBeenCalled()
      })
    })

    describe('fetchMenusWithUserId can be called for non authenticated users', () => {
      beforeEach(() => {
        state.auth = state.auth.set('isAuthenticated', false)
        state.auth = state.auth.set('accessToken', 'test-token')
      })

      test('fetchMenusWithUserId is called if variant menu requested', async () => {
        const userMenuVariant = 'menuA'
        const orderId = '123'
        const paramsWithOrderId = {
          ...params,
          orderId
        }

        await fetchData({ store, query, params: paramsWithOrderId }, false, false, userMenuVariant)

        expect(fetchMenusWithUserId).toHaveBeenCalledWith('test-token', 'menuA')
      })
    })
  })

  describe('given fetchBrandInfo is called', () => {
    describe('when the call fails', () => {
      const err = { message: 'something broke!' }

      beforeEach(() => {
        fetchBrandInfo.mockImplementation(() => {
          throw err
        })
      })

      test('then the error is caught and notice is logged', async () => {
        const orderId = '123'
        const paramsWithOrderId = {
          ...params,
          orderId
        }

        await fetchData({ store, query, params: paramsWithOrderId })

        expect(fetchMenus).toHaveBeenCalled()
        expect(fetchBrandInfo).toHaveBeenCalled()
        expect(logger.notice).toHaveBeenCalledWith({
          message: `Brand Theme failed to load: ${err.message}`,
          errors: [err]
        })
      })
    })
  })
})
