import Immutable from 'immutable'
import moment from 'moment'
import now from 'performance-now'

import actions from 'actions'
import { actionTypes } from 'actions/actionTypes'
import { initialState as initialAuthState } from 'reducers/auth'
import { initialState as initialBasketState } from 'reducers/basket'
import { initialState as initialRequestState } from 'reducers/request'
import { initialState as initialFeaturesState } from 'reducers/features'
import { menuInitialState } from 'reducers/menu'
import { defaultState as defaultUserState } from 'reducers/user'
import logger from 'utils/logger'
import { getLandingDay } from 'utils/deliveries'
import * as boxSummaryActions from 'actions/boxSummary'
import { getUserMenuVariant } from 'selectors/features'
import * as basketRecipesActions from '../../actions/basketRecipes/basketRecipes'
import { safeJestMock } from '../../../../_testing/mocks'
import * as brandHeadersActions from '../../actions/brandData/brandData'
import * as clientMetrics ∂from '../../apis/clientMetrics/clientMetrics'

import fetchData from '../fetchData'

import { getPreselectedCollectionName, selectCollection, setSlotFromIds } from '../utils'
import { boxSummaryDeliveryDaysLoad } from "actions/boxSummary/boxSummaryDeliveryDaysLoad"
import { menuLoadComplete } from "actions/menu/menuLoadComplete"
import { fetchBrandInfo } from "apis/brand/fetchBrandInfo"
import { fetchMenus } from "routes/Menu/fetchData/apis/fetchMenus"
import { fetchMenusWithUserId } from "routes/Menu/fetchData/apis/fetchMenusWithUserId"

jest.mock('../utils')
jest.mock('utils/deliveries')
jest.mock('utils/logger')
jest.mock('performance-now')
jest.mock('apis/brand')
jest.mock('selectors/features')
jest.mock('actions/menu')
jest.mock('../menuApi')
jest.mock('../../actions/basketRecipes')

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

  let dispatch
  let getState

  const query = {
    error: null
  }
  const params = {
    orderId: null
  }

  // we need to manually set up mocks for the thunks, because we don't want mocks around the non-thunk actions
  // otherwise they will just be stubs rather than returning { type: ..., ... } objects
  const basketRecipeAddSpy = safeJestMock(basketRecipesActions, 'basketRecipeAdd')
  actions.menuLoadStock = jest.fn()
  actions.menuLoadOrderDetails = jest.fn()
  actions.menuLoadMenu = jest.fn()
  actions.menuLoadDays = jest.fn()
  actions.basketNumPortionChange = jest.fn()
  actions.userLoadOrders = jest.fn()
  actions.userLoadData = jest.fn()

  const getBrandInfoMock = safeJestMock(brandHeadersActions, 'getBrandInfo')
  const sendClientMetricMock = safeJestMock(clientMetrics, 'sendClientMetric')

  beforeEach(() => {
    jest.spyOn(boxSummaryActions, 'boxSummaryDeliveryDaysLoad')
    getState = () => state
    dispatch = jest.fn().mockResolvedValue(undefined)
    state = { ...originalState }
    safeJestMock(brandHeadersActions, 'getBrandMenuHeaders').mockReturnValue('getBrandMenuHeaders')
    getBrandInfoMock.mockReturnValue('getBrandInfo')

    dispatch.mockReset()
    dispatch.mockResolvedValue(undefined)

    getLandingDay.mockReset()
    getLandingDay.mockReturnValue({ date: '2010-12-25T12:00:00' })
    menuLoadComplete.mockReset()

    actions.menuLoadStock.mockReset()
    actions.menuLoadOrderDetails.mockReset()
    actions.menuLoadMenu.mockReset()
    actions.menuLoadDays.mockReset()
    boxSummaryDeliveryDaysLoad.mockReset()
    actions.basketNumPortionChange.mockReset()
    basketRecipeAddSpy.mockReset()

    actions.userLoadOrders.mockReset()

    fetchMenus.mockReset()
    fetchBrandInfo.mockReset()
    sendClientMetricMock.mockReset()
  })

  describe('is pending', () => {
    beforeEach(() => {
      state.pending = state.pending.set(actionTypes.MENU_FETCH_DATA, true)
    })

    test('should not dispatch', async () => {
      await fetchData({ query, params }, false, false)(dispatch, getState)

      expect(dispatch).not.toHaveBeenCalled()
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
        state.menuCollections = state.menuCollections.set('123', { recipesInCollection: recipes } )
        state.menuRecipesUpdatedAt = moment()
        getUserMenuVariant.mockReturnValue('')
      })

      test('should not dispatch', async () => {
        await fetchData({ query, params: paramsWithoutOrderId }, force, false)(dispatch, getState)

        expect(dispatch).not.toHaveBeenCalled()
      })
    })

    describe('should fetch', () => {
      test('should dispatch pending action', async () => {
        await fetchData({ query, params }, false, false)(dispatch, getState)

        expect(dispatch.mock.calls[0]).toEqual([{
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
          await fetchData({ query: errorQuery, params }, false, false)(dispatch, getState)

          expect(dispatch.mock.calls[4]).toEqual([{
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

            await fetchData({ query: noStockQuery, params }, false, false)(dispatch, getState)

            expect(dispatch.mock.calls[5]).toEqual([menuLoadStockResult])
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

            await fetchData({ query, params: paramsWithOrderId }, false, false)(dispatch, getState)

            expect(dispatch.mock.calls[5]).toEqual([menuLoadOrderDetailsResult])
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

              dispatch.mockImplementation(event => {
                if (event === menuLoadOrderDetailsResult) {
                  return Promise.resolve(undefined).then(() => {
                    state.basket = originalState.basket
                  })
                }

                return Promise.resolve(undefined)
              })

              // just make it return an object with the recipe id to make for easier assertions
              basketRecipeAddSpy.mockImplementation(recipeId => ({ recipeId }))

              await fetchData({ query, params: paramsWithOrderId }, false, false)(dispatch, getState)

              expect(dispatch.mock.calls[6]).toEqual([{ recipeId: '200' }])
              expect(dispatch.mock.calls[7]).toEqual([{ recipeId: '250' }])
              expect(dispatch.mock.calls[8]).toEqual([{ recipeId: '250' }])
            })
          })

          test('should dispatch menuLoadMenu', async () => {
            // we need to test that dispatch is called with the **result** of the action creator
            // so making it return a symbol is an easy way to do that
            const menuLoadMenuResult = Symbol('fake action creator result')

            actions.menuLoadMenu.mockReturnValue(menuLoadMenuResult)

            await fetchData({ query, params: paramsWithOrderId }, false, false)(dispatch, getState)

            expect(dispatch.mock.calls[6]).toEqual([menuLoadMenuResult])
          })

          test('should dispatch menuLoadStock', async () => {
            // we need to test that dispatch is called with the **result** of the action creator
            // so making it return a symbol is an easy way to do that
            const menuLoadStockResult = Symbol('fake action creator result')

            actions.menuLoadStock.mockReturnValue(menuLoadStockResult)

            await fetchData({ query, params: paramsWithOrderId }, false, false)(dispatch, getState)

            expect(dispatch.mock.calls[8]).toEqual([menuLoadStockResult])
          })

          test('should call sendClientMetric with correct details', async () => {
            await fetchData({ query, params: paramsWithOrderId }, false, false)(dispatch, getState)

            expect(sendClientMetricMock).toHaveBeenCalledWith('menu-edit-initiated', 1, 'Count')
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
            await fetchData({ query, params }, false, false)(dispatch, getState)

            expect(dispatch.mock.calls[4]).toEqual([{
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
              await fetchData({ query, params }, false, false)(dispatch, getState)

              expect(dispatch.mock.calls[4]).toEqual([{
                type: actionTypes.BASKET_RESET,
                payload: {
                  chosenAddress: firstShippingAddress
                }
              }])
            })
          })
        })

        describe('query has slot id and day id', () => {
          const menuLoadDaysResult = Symbol('fake action creator result')
          const boxSummaryDeliveryDaysLoadResult = Symbol('fake action creator result')
          const queryWithSlots = {
            ...query,
            day_id: '123',
            slot_id: '456'
          }
          beforeEach(async () => {
            // we need to test that dispatch is called with the **result** of the action creator
            // so making it return a symbol is an easy way to do that

            actions.menuLoadDays.mockReturnValue(menuLoadDaysResult)

            boxSummaryDeliveryDaysLoad.mockReturnValue(boxSummaryDeliveryDaysLoadResult)

            await fetchData({ query: queryWithSlots, params }, false, false)(dispatch, getState)
          })

          test('should dispatch menuLoadDays action', async () => {
            expect(dispatch.mock.calls[4]).toEqual([menuLoadDaysResult])
          })

          test('should dispatch boxSummaryDeliveryDaysLoad action', async () => {
            expect(dispatch.mock.calls[5]).toEqual([boxSummaryDeliveryDaysLoadResult])
          })

          test('should call setSlotFromIds', async () => {
            await fetchData({ query: queryWithSlots, params }, false, false)(dispatch, getState)

            expect(setSlotFromIds).toHaveBeenCalledWith(queryWithSlots.slot_id, queryWithSlots.day_id)
          })

          describe('when setSlotFromIds throws an error', () => {
            const err = { message: 'something broke!' }

            beforeEach(() => {
              setSlotFromIds.mockImplementation(() => {
                throw err
              })
            })

            test('should log the error', async () => {
              await fetchData({ query: queryWithSlots, params }, false, false)(dispatch, getState)

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

              await fetchData({ query, params }, false, false)(dispatch, getState)

              expect(dispatch.mock.calls[4]).toEqual([userLoadOrdersResult])
            })
          })

          describe('is not authenticated', () => {
            beforeEach(() => {
              state.auth = state.auth.set('isAuthenticated', false)
            })

            test('should dispatch menuLoadDays', async () => {
              const menuLoadDaysResult = Symbol('fake action creator result')

              actions.menuLoadDays.mockReturnValue(menuLoadDaysResult)

              await fetchData({ query, params }, false, false)(dispatch, getState)

              expect(dispatch.mock.calls[4]).toEqual([menuLoadDaysResult])
            })

            test('should dispatch boxSummaryDeliveryDaysLoad', async () => {
              const boxSummaryDeliveryDaysLoadResult = Symbol('fake action creator result')

              boxSummaryDeliveryDaysLoad.mockReturnValue(boxSummaryDeliveryDaysLoadResult)

              await fetchData({ query, params }, false, false)(dispatch, getState)

              expect(dispatch.mock.calls[5]).toEqual([boxSummaryDeliveryDaysLoadResult])
            })

            test('should dispatch basketDateChange with result of getLandingDay', async () => {
              const date = '2019-01-01T00:00:00'
              getLandingDay.mockReturnValue({ date })

              await fetchData({ query, params }, false, false)(dispatch, getState)
              expect(dispatch.mock.calls[6][0]).toEqual({
                type: actionTypes.BASKET_DATE_CHANGE,
                date,
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

            await fetchData({ query: queryWithNumPortions, params }, false, false)(dispatch, getState)

            expect(dispatch.mock.calls[7]).toEqual([basketNumPortionChangeResult])
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
            await fetchData({ query: queryWithPostcode, params }, false, false)(dispatch, getState)

            expect(dispatch.mock.calls[10]).toEqual([{
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

          await fetchData({ query, params }, false, false)(dispatch, getState)

          expect(dispatch.mock.calls[7]).toEqual([menuLoadMenuResult])
        })

        test('should catch and re-throw error from menuLoadMenu', async () => {
          menuLoadComplete.mockImplementation(() => {
            throw new Error('Error occurred')
          })

          await expect(fetchData({ query, params }, false, false)(dispatch, getState))
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

            getState = () => newState
          })

          afterEach(() => {
            dispatch = jest.fn().mockResolvedValue(undefined)
            getState = () => state
          })

          test('should setCuttoff to 2020-02-12', async () => {
            const menuLoadMenuResult = Symbol('fake action creator result')

            actions.menuLoadMenu.mockReturnValue(menuLoadMenuResult)

            await fetchData({ query, params: {} }, false, false)(dispatch, getState)

            expect(actions.menuLoadMenu).toHaveBeenCalledWith('2020-02-12', false)
          })
        })

        describe('when preview menu', () => {
          beforeEach(() => {
            const newState = {
              ...state,
              auth: Immutable.fromJS({
                isAdmin: false
              }),
              menuService: {
                data: [{
                  attributes: {
                    ends_at: '2020-10-13'
                  }
                }]
              }
            }
            getState = () => newState
          })

          afterEach(() => {
            dispatch = jest.fn().mockResolvedValue(undefined)
            getState = () => state
          })

          test('should setCuttoff to 2020-10-12', async () => {
            const menuLoadMenuResult = Symbol('fake action creator result')

            actions.menuLoadMenu.mockReturnValue(menuLoadMenuResult)

            await fetchData({ query: {
              'preview[auth_user_id]': 'user-id-preview',
            },
            params: {}
            }, false, false)(dispatch, getState)
            expect(actions.menuLoadMenu).toHaveBeenCalledWith('2020-10-12', false)
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

          await fetchData({ query: queryWithCollection, params }, false, false)(dispatch, getState)

          expect(selectCollection).toHaveBeenCalledWith('some-collection-name')
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

          await fetchData({ query: queryWithCollection, params }, false, false)(dispatch, getState)

          expect(selectCollection).toHaveBeenCalledWith('some-collection-name')
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

        await fetchData({ query, params }, false, false)(dispatch, getState)

        expect(menuLoadComplete).toHaveBeenCalledWith(expectedValue, true)
        expect(dispatch.mock.calls[11]).toEqual([menuLoadCompleteResult])
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

      await fetchData({ query, params: paramsWithOrderId })(dispatch, getState)

      expect(fetchMenus).toHaveBeenCalled()
      expect(getBrandInfoMock).toHaveBeenCalled()
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

        await fetchData({ query, params: paramsWithOrderId }, false, false, menuServiceFeatureFlag)(dispatch, getState)

        expect(fetchMenusWithUserId).not.toHaveBeenCalled()
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

        await fetchData({ query, params: paramsWithOrderId }, false, false)(dispatch, getState)

        expect(fetchMenusWithUserId).toHaveBeenCalledWith('test-token', query, 'test-id')
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

        await fetchData({ query, params: paramsWithOrderId }, false, false, userMenuVariant)(dispatch, getState)

        expect(fetchMenusWithUserId).toHaveBeenCalledWith('test-token', query, 'menuA')
      })
    })
  })

  describe('given brand headers is called', () => {
    test('should call dispatch with getBrandMenuHeaders', async () => {
      await fetchData({ query, params }, false, false)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith('getBrandMenuHeaders')
    })
  })

  describe('given brand info is called', () => {
    test('should call dispatch with getBrandInfo', async () => {
      await fetchData({ query, params }, false, false)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith('getBrandInfo')
    })
  })
})
