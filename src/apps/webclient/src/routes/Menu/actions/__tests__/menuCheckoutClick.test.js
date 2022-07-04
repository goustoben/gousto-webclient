import Immutable from 'immutable'

import * as basketActions from 'actions/basket'
import * as boxSummaryActions from 'actions/boxSummary'
import * as orderActions from 'actions/order'
import * as menuCheckoutActions from 'routes/Menu/actions/checkout'
import * as menuActions from 'routes/Menu/actions/order'

import * as menuSelectors from '../../selectors/menu'
import { checkoutBasket, clearBasketNotValidError } from '../menuCheckoutClick'

jest.mock('utils/isomorphicEnvironment', () => ({
  getEnvironment: () => 'local',
  getProtocol: () => 'http:',
}))

describe('menuCheckoutClick', () => {
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
      const removeRecipeMock = jest.fn()
      boxSummaryVisibilityChangeSpy.mockReturnValue(boxSummaryVisibilityChangeMock)

      await checkoutBasket({ section, view, pricing, removeRecipe: removeRecipeMock })(
        dispatch,
        getState,
      )

      expect(boxSummaryVisibilityChangeSpy).toHaveBeenCalledWith(false, removeRecipeMock)
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
            const orderUpdateMock = jest.fn()
            const orderUpdateSpy = jest
              .spyOn(orderActions, 'orderUpdate')
              .mockReturnValue(orderUpdateMock)

            await checkoutBasket({ section, view: 'orderUpdate', pricing })(dispatch, getState)

            expect(orderUpdateSpy).toBeCalledWith(false)
            expect(dispatch).toHaveBeenCalledWith(orderUpdateMock)
          })

          // test skipped by James M due to commit 616ffa6be9c054cde2f30b48b560b7e148dbd490
          // Radishes - fix this!
          describe.skip('when update OrderAPI V1 feature flag returns true', () => {
            test('should dispatch sendUpdateOrder', async () => {
              const sendUpdateOrderMock = jest.fn()
              const sendUpdateOrderSpy = jest
                .spyOn(menuActions, 'sendUpdateOrder')
                .mockReturnValue(sendUpdateOrderMock)

              await checkoutBasket({ section, view: 'sendUpdateOrder', pricing })(
                dispatch,
                getState,
              )

              expect(sendUpdateOrderSpy).toBeCalledWith(false)
              expect(dispatch).toHaveBeenCalledWith(sendUpdateOrderMock)
            })
          })

          // test skipped by James M due to commit 616ffa6be9c054cde2f30b48b560b7e148dbd490
          // Radishes - fix this!
          describe.skip('when Sides feature flag returns true', () => {
            test('should dispatch orderUpdate', async () => {
              const orderUpdateMock = jest.fn()
              const orderUpdateSpy = jest
                .spyOn(orderActions, 'orderUpdate')
                .mockReturnValue(orderUpdateMock)

              await checkoutBasket({ section, view: 'orderUpdate', pricing })(dispatch, getState)

              expect(orderUpdateSpy).toBeCalledWith(true)
              expect(dispatch).toHaveBeenCalledWith(orderUpdateMock)
            })

            describe('when update OrderAPI V1 feature flag returns true', () => {
              test('should dispatch sendUpdateOrder', async () => {
                const sendUpdateOrderMock = jest.fn()
                const sendUpdateOrderSpy = jest
                  .spyOn(menuActions, 'sendUpdateOrder')
                  .mockReturnValue(sendUpdateOrderMock)

                await checkoutBasket({ section, view: 'sendUpdateOrder', pricing })(
                  dispatch,
                  getState,
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

        // test skipped by James M due to commit 616ffa6be9c054cde2f30b48b560b7e148dbd490
        // Radishes - fix this!
        test.skip('should dispatch checkoutTransactionalOrder', async () => {
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
