import Immutable, { Map } from 'immutable'
import * as basketActions from 'actions/basket'
import * as boxSummaryActions from 'actions/boxSummary'
import * as menuCheckoutActions from 'routes/Menu/actions/checkout'
import * as orderActions from 'actions/order'
import optimizelySdk from '@optimizely/optimizely-sdk'
import * as menuActions from 'routes/Menu/actions/order'
import * as menuSelectors from '../../selectors/menu'
import {
  isOrderApiCreateEnabled,
  isOrderApiUpdateEnabled,
  checkoutBasket,
  clearBasketNotValidError,
  getIsSidesEnabled,
} from '../menuCheckoutClick'

jest.mock('utils/isomorphicEnvironment', () => ({
  getEnvironment: () => 'local',
  getProtocol: () => 'http:',
}))

// The first spec to create optimizely instance will point to this function.
// as we memories the optimizely instances onces created.
// see: getOptimizelyInstance in src/containers/OptimizelyRollouts/optimizelySDK.js
const isFeatureEnabled = jest.fn()
describe('menuCheckoutClick', () => {
  beforeEach(() => {
    jest
      .spyOn(optimizelySdk, 'createInstance')
      .mockReturnValue({ onReady: () => ({ success: true }), isFeatureEnabled })
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('feature flags', () => {
    const getState = jest.fn().mockReturnValue({ auth: Map({ id: 'user_id' }) })
    const dispatch = jest.fn()

    describe('isOrderApiCreateEnabled', () => {
      test('it calls feature enabled with the correct flag', async () => {
        isFeatureEnabled.mockResolvedValueOnce(true)

        const isEnabled = await isOrderApiCreateEnabled(dispatch, getState)

        expect(isFeatureEnabled).toBeCalledWith('radishes_order_api_create_web_enabled', 'user_id')
        expect(isEnabled).toBe(true)
      })
    })

    describe('isOrderApiUpdateEnabled', () => {
      test('it calls feature enabled with the correct flag', async () => {
        isFeatureEnabled.mockResolvedValueOnce(true)

        const isEnabled = await isOrderApiUpdateEnabled(dispatch, getState)

        expect(isFeatureEnabled).toBeCalledWith('radishes_order_api_update_web_enabled', 'user_id')
        expect(isEnabled).toBe(true)
      })
    })

    describe('getIsSidesEnabled', () => {
      test('it calls feature enabled with the correct flag', async () => {
        isFeatureEnabled.mockResolvedValueOnce(true)

        const isEnabled = await getIsSidesEnabled(dispatch, getState)

        expect(isFeatureEnabled).toBeCalledWith(
          'radishes_menu_api_recipe_agnostic_sides_mvp_web_enabled',
          'user_id',
        )
        expect(isEnabled).toBe(true)
      })
    })
  })

  describe('checkoutBasket', () => {
    let state
    const dispatch = jest.fn()
    const getState = jest.fn()
    let basketCheckedOutSpy
    let basketCheckoutClickedSpy
    let basketProceedToCheckoutSpy
    let boxSummaryVisibilityChangeSpy
    let checkoutTransactionalOrderSpy
    let validateMenuLimitsForBasketSpy
    const section = 'menu'
    const view = 'grid'
    const pricing = {
      total: 'test-total',
    }

    beforeEach(() => {
      state = {
        basket: Immutable.fromJS({
          orderId: '',
        }),
        auth: Immutable.fromJS({
          id: 'user_id',
          isAuthenticated: true,
        }),
      }
      getState.mockReturnValue(state)

      basketCheckedOutSpy = jest.spyOn(basketActions, 'basketCheckedOut').mockImplementation()
      basketCheckoutClickedSpy = jest
        .spyOn(basketActions, 'basketCheckoutClicked')
        .mockImplementation()
      basketProceedToCheckoutSpy = jest
        .spyOn(basketActions, 'basketProceedToCheckout')
        .mockImplementation()
      boxSummaryVisibilityChangeSpy = jest
        .spyOn(boxSummaryActions, 'boxSummaryVisibilityChange')
        .mockImplementation()
      checkoutTransactionalOrderSpy = jest
        .spyOn(menuCheckoutActions, 'checkoutTransactionalOrder')
        .mockImplementation()
      validateMenuLimitsForBasketSpy = jest
        .spyOn(menuSelectors, 'validateMenuLimitsForBasket')
        .mockReturnValue([])
    })

    afterAll(() => {
      jest.restoreAllMocks()
    })

    test('should dispatch boxSummaryVisibilityChange with false', async () => {
      const boxSummaryVisibilityChangeMock = jest.fn()
      boxSummaryVisibilityChangeSpy.mockReturnValue(boxSummaryVisibilityChangeMock)

      await checkoutBasket({ section, view, pricing })(dispatch, getState)

      expect(boxSummaryVisibilityChangeSpy).toHaveBeenCalledWith(false)
      expect(dispatch).toHaveBeenCalledWith(boxSummaryVisibilityChangeMock)
    })

    test('should dispatch basketCheckedOut with the view', async () => {
      const basketCheckedOutMock = jest.fn()
      basketCheckedOutSpy.mockReturnValue(basketCheckedOutMock)

      await checkoutBasket({ section, view, pricing })(dispatch, getState)

      expect(basketCheckedOutSpy).toHaveBeenCalledWith({ view, pricing })
      expect(dispatch).toHaveBeenCalledWith(basketCheckedOutMock)
    })

    test('should dispatch basketCheckoutClicked with the section', async () => {
      const basketCheckoutClickedMock = jest.fn()
      basketCheckoutClickedSpy.mockReturnValue(basketCheckoutClickedMock)

      await checkoutBasket({ section, view, pricing })(dispatch, getState)

      expect(basketCheckoutClickedSpy).toHaveBeenCalledWith('menu')
      expect(dispatch).toHaveBeenCalledWith(basketCheckoutClickedMock)
    })

    describe('when no basket rules are broken', () => {
      describe('when orderId is available', () => {
        describe('when user is authenticated', () => {
          beforeEach(() => {
            state = {
              basket: Immutable.fromJS({
                orderId: '1234567',
              }),
              auth: Immutable.fromJS({
                id: 'user_id',
                isAuthenticated: true,
              }),
            }

            getState.mockReturnValue(state)
          })

          test('should dispatch orderUpdate', async () => {
            isFeatureEnabled
              // `radishes_order_api_create_web_enabled`
              .mockResolvedValueOnce(false)
              // `radishes_menu_api_recipe_agnostic_sides_mvp_web_enabled`
              .mockResolvedValueOnce(false)

            const orderUpdateMock = jest.fn()
            const orderUpdateSpy = jest
              .spyOn(orderActions, 'orderUpdate')
              .mockReturnValue(orderUpdateMock)

            await checkoutBasket({ section, view: 'orderUpdate', pricing })(dispatch, getState)
            expect(isFeatureEnabled).toBeCalledTimes(2)
            expect(isFeatureEnabled).toBeCalledWith(
              'radishes_order_api_update_web_enabled',
              'user_id',
            )
            expect(isFeatureEnabled).toBeCalledWith(
              'radishes_menu_api_recipe_agnostic_sides_mvp_web_enabled',
              'user_id',
            )
            expect(orderUpdateSpy).toBeCalledWith(false)
            expect(dispatch).toHaveBeenCalledWith(orderUpdateMock)
          })

          describe('when update OrderAPI V1 feature flag returns true', () => {
            test('should dispatch sendUpdateOrder', async () => {
              isFeatureEnabled
                // `radishes_order_api_create_web_enabled`
                .mockResolvedValueOnce(true)
                // `radishes_menu_api_recipe_agnostic_sides_mvp_web_enabled`
                .mockResolvedValueOnce(false)

              const sendUpdateOrderMock = jest.fn()
              const sendUpdateOrderSpy = jest
                .spyOn(menuActions, 'sendUpdateOrder')
                .mockReturnValue(sendUpdateOrderMock)

              await checkoutBasket({ section, view: 'sendUpdateOrder', pricing })(
                dispatch,
                getState,
              )

              expect(isFeatureEnabled).toBeCalledWith(
                'radishes_order_api_update_web_enabled',
                'user_id',
              )
              expect(isFeatureEnabled).toBeCalledWith(
                'radishes_menu_api_recipe_agnostic_sides_mvp_web_enabled',
                'user_id',
              )
              expect(sendUpdateOrderSpy).toBeCalledWith(false)
              expect(dispatch).toHaveBeenCalledWith(sendUpdateOrderMock)
            })
          })

          describe('when Sides feature flag returns true', () => {
            test('should dispatch orderUpdate', async () => {
              isFeatureEnabled
                // `radishes_order_api_create_web_enabled`
                .mockResolvedValueOnce(false)
                // `radishes_menu_api_recipe_agnostic_sides_mvp_web_enabled`
                .mockResolvedValueOnce(true)

              const orderUpdateMock = jest.fn()
              const orderUpdateSpy = jest
                .spyOn(orderActions, 'orderUpdate')
                .mockReturnValue(orderUpdateMock)

              await checkoutBasket({ section, view: 'orderUpdate', pricing })(dispatch, getState)

              expect(isFeatureEnabled).toBeCalledWith(
                'radishes_order_api_update_web_enabled',
                'user_id',
              )
              expect(isFeatureEnabled).toBeCalledWith(
                'radishes_menu_api_recipe_agnostic_sides_mvp_web_enabled',
                'user_id',
              )
              expect(orderUpdateSpy).toBeCalledWith(true)
              expect(dispatch).toHaveBeenCalledWith(orderUpdateMock)
            })

            describe('when update OrderAPI V1 feature flag returns true', () => {
              test('should dispatch sendUpdateOrder', async () => {
                isFeatureEnabled
                  // `radishes_order_api_create_web_enabled`
                  .mockResolvedValueOnce(true)
                  // `radishes_menu_api_recipe_agnostic_sides_mvp_web_enabled`
                  .mockResolvedValueOnce(true)

                const sendUpdateOrderMock = jest.fn()
                const sendUpdateOrderSpy = jest
                  .spyOn(menuActions, 'sendUpdateOrder')
                  .mockReturnValue(sendUpdateOrderMock)

                await checkoutBasket({ section, view: 'sendUpdateOrder', pricing })(
                  dispatch,
                  getState,
                )

                expect(isFeatureEnabled).toBeCalledWith(
                  'radishes_order_api_update_web_enabled',
                  'user_id',
                )
                expect(isFeatureEnabled).toBeCalledWith(
                  'radishes_menu_api_recipe_agnostic_sides_mvp_web_enabled',
                  'user_id',
                )
                expect(sendUpdateOrderSpy).toBeCalledWith(true)
                expect(dispatch).toHaveBeenCalledWith(sendUpdateOrderMock)
              })
            })
          })
        })
      })

      describe('when not orderId is available', () => {
        describe('when user is not authenticated', () => {
          beforeEach(() => {
            state = {
              basket: Immutable.fromJS({
                orderId: '',
              }),
              auth: Immutable.fromJS({
                isAuthenticated: false,
              }),
            }

            getState.mockReturnValue(state)
          })

          test('should dispatch basketProceedToCheckout', async () => {
            const basketProceedToCheckoutMock = jest.fn()
            basketProceedToCheckoutSpy.mockReturnValue(basketProceedToCheckoutMock)

            await checkoutBasket({ section, view: '', pricing })(dispatch, getState)

            expect(basketProceedToCheckoutSpy).toBeCalled()
            expect(dispatch).toHaveBeenCalledWith(basketProceedToCheckoutMock)
          })
        })
      })

      describe('when is authenticated', () => {
        beforeEach(() => {
          state = {
            basket: Immutable.fromJS({
              slotId: 'slot-id-date-17',
            }),
            auth: Immutable.fromJS({
              isAuthenticated: true,
            }),
          }

          getState.mockReturnValue(state)
        })

        test('should dispatch checkoutTransactionalOrder', async () => {
          const checkoutTransactionalOrderMock = jest.fn()
          checkoutTransactionalOrderSpy.mockReturnValue(checkoutTransactionalOrderMock)

          await checkoutBasket({ section, view: '', pricing })(dispatch, getState)

          expect(checkoutTransactionalOrderSpy).toBeCalledWith('create')
          expect(dispatch).toHaveBeenCalledWith(checkoutTransactionalOrderMock)
        })
      })
    })

    describe('when menu has broken rules', () => {
      test('should dispatch BASKET_NOT_VALID with validation response', async () => {
        validateMenuLimitsForBasketSpy.mockReturnValue([
          {
            items: ['123'],
            message: 'Only 1 oven ready meal is available per order',
            name: 'charlie-binghams-basket-limit',
          },
        ])

        await checkoutBasket('menu', '')(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith({
          key: 'BASKET_NOT_VALID',
          type: 'ERROR',
          value: {
            errorTitle: 'Basket Not Valid',
            recipeId: null,
            rules: [
              {
                items: ['123'],
                message: 'Only 1 oven ready meal is available per order',
                name: 'charlie-binghams-basket-limit',
              },
            ],
          },
        })
      })
    })
  })

  describe('clearBasketNotValidError', () => {
    test('should dispatch error BASKET_NOT_VALID with null', () => {
      const dispatch = jest.fn()

      clearBasketNotValidError()(dispatch)

      expect(dispatch).toHaveBeenCalledWith({
        key: 'BASKET_NOT_VALID',
        type: 'ERROR',
        value: null,
      })
    })
  })
})
