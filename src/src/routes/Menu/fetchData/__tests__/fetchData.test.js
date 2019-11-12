import Immutable from 'immutable'
import moment from 'moment'
import now from 'performance-now'

import actions from 'actions'
import actionTypes from 'actions/actionTypes'
import { initialState as initialAuthState } from 'reducers/auth'
import { initialState as initialBasketState } from 'reducers/basket'
import { initialState as initialRequestState } from 'reducers/request'
import { initialState as initialFeaturesState } from 'reducers/features'
import { defaultState as defaultUserState } from 'reducers/user'
import logger from 'utils/logger'
import { getLandingDay } from 'utils/deliveries'

import fetchData from '../fetchData'

import { setSlotFromIds, getPreselectedCollectionName, selectCollection } from '../utils'

jest.mock('../utils')
jest.mock('utils/deliveries')
jest.mock('utils/logger')
jest.mock('performance-now')

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
    pending: Immutable.Map({})
  }

  const originalState = { ...state }

  const store = {
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
  actions.boxSummaryDeliveryDaysLoad = jest.fn()
  actions.basketNumPortionChange = jest.fn()
  actions.basketRecipeAdd = jest.fn()
  actions.featureSet = jest.fn()
  actions.userLoadOrders = jest.fn()

  beforeEach(() => {
    state = { ...originalState }

    store.dispatch.mockReset()
    store.dispatch.mockResolvedValue(undefined)

    getLandingDay.mockReset()
    getLandingDay.mockReturnValue({ date: '2010-12-25T12:00:00' })

    actions.menuLoadStock.mockReset()
    actions.menuLoadOrderDetails.mockReset()
    actions.menuLoadMenu.mockReset()
    actions.menuLoadDays.mockReset()
    actions.boxSummaryDeliveryDaysLoad.mockReset()
    actions.basketNumPortionChange.mockReset()
    actions.basketRecipeAdd.mockReset()
    actions.featureSet.mockReset()
    actions.userLoadOrders.mockReset()
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

          expect(store.dispatch.mock.calls[1]).toEqual([{
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
            const menuLoadStockResult = Symbol()
            actions.menuLoadStock.mockReturnValue(menuLoadStockResult)

            await fetchData({ store, query: noStockQuery, params }, false, false)

            expect(store.dispatch.mock.calls[2]).toEqual([menuLoadStockResult])
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
            const menuLoadOrderDetailsResult = Symbol()

            // use mockImplementation and only return the symbol if it's called with the expected orderId
            actions.menuLoadOrderDetails.mockImplementation(loadOrderId => {
              if (loadOrderId === orderId) {
                return menuLoadOrderDetailsResult
              }
            })

            await fetchData({ store, query, params: paramsWithOrderId }, false, false)

            expect(store.dispatch.mock.calls[2]).toEqual([menuLoadOrderDetailsResult])
          })

          describe('menuLoadOrderDetails changes number of recipes in basket', () => {
            beforeEach(() => {
              state.basket = state.basket.set('recipes', Immutable.fromJS({
                '200': 1,
                '250': 2
              }))
            })

            test('should dispatch basketRecipeAdd for each previous recipe', async () => {
              // this test requires some horrible setup because it checks the same value twice
              // which means we have to manually simulate some state changes
              const menuLoadOrderDetailsResult = Symbol()
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

              expect(store.dispatch.mock.calls[3]).toEqual([{ recipeId: '200' }])
              expect(store.dispatch.mock.calls[4]).toEqual([{ recipeId: '250' }])
              expect(store.dispatch.mock.calls[5]).toEqual([{ recipeId: '250' }])
            })
          })

          describe('requiresMenuRecipeClear', () => {
            beforeEach(() => {
              state.basket = state.basket.setIn(['recipes', '123'], 5)
              state.features = state.features.setIn(['menuRecipes', 'experiment'], true)
            })

            test('should dispatch featureSet menuRecipes action', async () => {
              // we need to test that dispatch is called with the **result** of the action creator
              // so making it return a symbol is an easy way to do that 
              const featureSetResult = Symbol()

              // use mockImplementation and only return the symbol if it's called with the expected parameters
              // this would normally be accomplished using `toHaveBeenCalledWith`, but what we are actually
              // testing is that the correct action is passed to dispatch
              actions.featureSet.mockImplementation((feature, val, experiment) => {
                if (feature === 'menuRecipes' && val === undefined && experiment === false) {
                  return featureSetResult
                }
              })

              await fetchData({ store, query, params: paramsWithOrderId }, false, false)

              expect(store.dispatch.mock.calls[3]).toEqual([featureSetResult])
            })
          })

          test('should dispatch menuLoadMenu', async () => {
            // we need to test that dispatch is called with the **result** of the action creator
            // so making it return a symbol is an easy way to do that 
            const menuLoadMenuResult = Symbol()

            actions.menuLoadMenu.mockReturnValue(menuLoadMenuResult)

            await fetchData({ store, query, params: paramsWithOrderId }, false, false)

            expect(store.dispatch.mock.calls[3]).toEqual([menuLoadMenuResult])
          })

          test('should dispatch menuLoadStock', async () => {
            // we need to test that dispatch is called with the **result** of the action creator
            // so making it return a symbol is an easy way to do that 
            const menuLoadStockResult = Symbol()

            actions.menuLoadStock.mockReturnValue(menuLoadStockResult)

            await fetchData({ store, query, params: paramsWithOrderId }, false, false)

            expect(store.dispatch.mock.calls[4]).toEqual([menuLoadStockResult])
          })
        })
      })

      describe('params does not have order id', () => {
        describe('basket has order id', () => {
          const firstShippingAddress = { id: 'shipping-1' }

          beforeEach(() => {
            state.basket = state.basket.set('orderId', '123')
            state.user = state.user.setIn(['shippingAddresses', 0], firstShippingAddress)
          })

          test('should dispatch basket reset action', async () => {
            await fetchData({ store, query, params }, false, false)

            expect(store.dispatch.mock.calls[1]).toEqual([{
              type: actionTypes.BASKET_RESET
            }])
          })

          test('should dispatch chosen address change action with first shipping address', async () => {
            await fetchData({ store, query, params }, false, false)

            expect(store.dispatch.mock.calls[2]).toEqual([{
              type: actionTypes.BASKET_CHOSEN_ADDRESS_CHANGE,
              address: firstShippingAddress
            }])
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
            const menuLoadDaysResult = Symbol()

            actions.menuLoadDays.mockReturnValue(menuLoadDaysResult)

            await fetchData({ store, query: queryWithSlots, params }, false, false)

            expect(store.dispatch.mock.calls[1]).toEqual([menuLoadDaysResult])
          })

          test('should dispatch boxSummaryDeliveryDaysLoad action', async () => {
            // we need to test that dispatch is called with the **result** of the action creator
            // so making it return a symbol is an easy way to do that 
            const boxSummaryDeliveryDaysLoadResult = Symbol()

            actions.boxSummaryDeliveryDaysLoad.mockReturnValue(boxSummaryDeliveryDaysLoadResult)

            await fetchData({ store, query: queryWithSlots, params }, false, false)

            expect(store.dispatch.mock.calls[2]).toEqual([boxSummaryDeliveryDaysLoadResult])
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
          describe('is not in browse mode', () => {
            beforeEach(() => {
              state.request = state.request.set('browser', 'mobile')
              state.features = state.features.setIn(['browse', 'value'], false)
            })

            describe('is authenticated and is not admin', () => {
              beforeEach(() => {
                state.auth = state.auth.set('isAuthenticated', true)
                state.auth = state.auth.set('isAdmin', false)
              })

              test('should dispatch userLoadOrders', async () => {
                const userLoadOrdersResult = Symbol()

                actions.userLoadOrders.mockReturnValue(userLoadOrdersResult)

                await fetchData({ store, query, params }, false, false)

                expect(store.dispatch.mock.calls[2]).toEqual([userLoadOrdersResult])
              })
            })

            describe('is not authenticated', () => {
              beforeEach(() => {
                state.auth = state.auth.set('isAuthenticated', false)
              })

              test('should dispatch menuLoadDays', async () => {
                const menuLoadDaysResult = Symbol()

                actions.menuLoadDays.mockReturnValue(menuLoadDaysResult)

                await fetchData({ store, query, params }, false, false)

                expect(store.dispatch.mock.calls[1]).toEqual([menuLoadDaysResult])
              })

              test('should dispatch boxSummaryDeliveryDaysLoad', async () => {
                const boxSummaryDeliveryDaysLoadResult = Symbol()

                actions.boxSummaryDeliveryDaysLoad.mockReturnValue(boxSummaryDeliveryDaysLoadResult)

                await fetchData({ store, query, params }, false, false)

                expect(store.dispatch.mock.calls[2]).toEqual([boxSummaryDeliveryDaysLoadResult])
              })

              test('should dispatch basketDateChange with result of getLandingDay', async () => {
                const date = '2019-01-01T00:00:00'
                getLandingDay.mockReturnValue({ date })

                await fetchData({ store, query, params }, false, false)

                expect(store.dispatch.mock.calls[3]).toEqual([{
                  type: actionTypes.BASKET_DATE_CHANGE,
                  date
                }])
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
            const basketNumPortionChangeResult = Symbol()

            // use mockImplementation and only return the symbol if it's called with the expected parameters
            // this would normally be accomplished using `toHaveBeenCalledWith`, but what we are actually
            // testing is that the correct action is passed to dispatch
            actions.basketNumPortionChange.mockImplementation((numPortions) => {
              if (numPortions === 10) {
                return basketNumPortionChangeResult
              }
            })

            await fetchData({ store, query: queryWithNumPortions, params }, false, false)

            expect(store.dispatch.mock.calls[1]).toEqual([basketNumPortionChangeResult])
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

            expect(store.dispatch.mock.calls[2]).toEqual([{
              type: actionTypes.BASKET_POSTCODE_CHANGE,
              postcode: 'W2 3LX'
            }])
          })
        })

        test('should dispatch menuLoadMenu', async () => {
          // we need to test that dispatch is called with the **result** of the action creator
          // so making it return a symbol is an easy way to do that 
          const menuLoadMenuResult = Symbol()

          actions.menuLoadMenu.mockReturnValue(menuLoadMenuResult)

          await fetchData({ store, query, params }, false, false)

          expect(store.dispatch.mock.calls[1]).toEqual([menuLoadMenuResult])
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

          expect(store.dispatch.mock.calls[8]).toEqual([{
            isMockBasketRecipeAdd: true,
            recipeId: '123'
          }])
          expect(store.dispatch.mock.calls[9]).toEqual([{
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

        beforeEach(() => {
          state.features = state.features.setIn(['collections', 'value'], true)
        })

        test('should call selectCollection with name from getPreselectedCollectionName', async () => {
          // mockImplementation is used here to ensure that queryName is passed correctly
          getPreselectedCollectionName.mockImplementation((stateArg, queryName) => {
            if (queryName === collectionName) {
              return 'some-collection-name'
            }
          })

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
          state.features = state.features.setIn(['collections', 'value'], false)
          state.auth = state.auth.set('isAuthenticated', false)
        })

        test('should call selectCollection with name from getPreselectedCollectionName', async () => {
          // mockImplementation is used here to ensure that queryName is passed correctly
          getPreselectedCollectionName.mockImplementation((stateArg, queryName) => {
            if (queryName === collectionName) {
              return 'some-collection-name'
            }
          })

          await fetchData({ store, query: queryWithCollection, params }, false, false)

          expect(selectCollection).toHaveBeenCalledWith(state, 'some-collection-name', store.dispatch)
        })
      })

      test('should dispatch menuLoadComplete action', async () => {
        const firstTime = 1
        const secondTime = 2.3

        // Math.round(2.3 - 1)
        const expectedValue = 1 

        now.mockReturnValueOnce(firstTime)
          .mockReturnValueOnce(secondTime)
          .mockReturnValue(999999)

        await fetchData({ store, query, params }, false, false)

        expect(store.dispatch.mock.calls[5]).toEqual([{
          type: actionTypes.MENU_LOAD_COMPLETE,
          timeToLoadMs: expectedValue
        }])
      })
    })
  })
})
