import Immutable from 'immutable'

import { actionTypes } from 'actions/actionTypes'
import * as orderConfirmationActions from 'actions/orderConfirmation'
import utilsLogger from 'utils/logger'

import * as trackingKeys from '../../../../actions/trackingKeys'
import * as orderV2 from '../../apis/orderV2'
import { basketUpdateProducts } from '../basket'

jest.mock('utils/logger', () => ({
  error: jest.fn(),
}))
describe('basketUpdateProducts', () => {
  let dispatch
  let getStateSpy
  let patchOrderProductsSpy
  let fetchOrderSpy

  beforeEach(() => {
    dispatch = jest.fn()
    getStateSpy = jest.fn().mockReturnValue({
      basket: Immutable.fromJS({
        orderId: '1234',
        products: [
          { itemableId: 'product-1', quantity: 2 },
          { itemableId: 'product-2', quantity: 1 },
        ],
      }),
      auth: Immutable.Map({ accessToken: '12234' }),
      temp: Immutable.Map({
        originalGrossTotal: '',
      }),
    })

    patchOrderProductsSpy = jest.spyOn(orderV2, 'patchOrderProducts').mockImplementation(jest.fn())
    fetchOrderSpy = jest.spyOn(orderV2, 'fetchOrder').mockImplementation(jest.fn())
    jest.mock('utils/logger', () => ({
      error: jest.fn(),
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when update is successful', () => {
    const orderProducts = {
      data: [
        { id: 'product-1', meta: { quantity: 2 } },
        { id: 'product-2', meta: { quantity: 1 } },
      ],
    }

    const order = {
      data: {
        id: '1234',
        products: orderProducts.data,
      },
    }

    test('should call updateOrderItems api with products', async () => {
      patchOrderProductsSpy.mockReturnValue(Promise.resolve(orderProducts))
      fetchOrderSpy.mockReturnValue(Promise.resolve(order))

      await basketUpdateProducts()(dispatch, getStateSpy)
    })

    test('should dispatch correct pending and action events for BASKET_CHECKOUT', async () => {
      patchOrderProductsSpy.mockReturnValue(Promise.resolve(orderProducts))
      fetchOrderSpy.mockReturnValue(Promise.resolve(order))

      await basketUpdateProducts()(dispatch, getStateSpy)

      expect(dispatch).toBeCalledTimes(7)
      expect(dispatch).toBeCalledWith({
        type: actionTypes.PENDING,
        key: actionTypes.BASKET_CHECKOUT,
        value: true,
      })
      expect(dispatch).toBeCalledWith({
        type: actionTypes.ERROR,
        key: actionTypes.BASKET_CHECKOUT,
        value: false,
      })
      expect(dispatch).toBeCalledWith({
        type: actionTypes.BASKET_CHECKOUT,
        trackingData: {
          actionType: trackingKeys.checkOutBasketAttempt,
          order: order.data,
        },
      })
      expect(dispatch).toBeCalledWith({
        type: actionTypes.PENDING,
        key: actionTypes.BASKET_CHECKOUT,
        value: false,
      })
    })

    test('should dispatch BASKET_ORDER_DETAILS_LOADED action with the orderDetails', async () => {
      patchOrderProductsSpy.mockReturnValue(Promise.resolve(orderProducts))
      fetchOrderSpy.mockReturnValue(Promise.resolve(order))

      await basketUpdateProducts()(dispatch, getStateSpy)

      expect(dispatch).toBeCalledTimes(7)
      expect(dispatch).toBeCalledWith({
        type: actionTypes.BASKET_ORDER_DETAILS_LOADED,
        orderId: order.data.id,
        orderDetails: Immutable.fromJS(order.data),
      })
    })

    test('should dispatch orderConfirmationUpdateOrderTrackingSpy if isOrderConfirmation true', async () => {
      patchOrderProductsSpy.mockReturnValue(Promise.resolve(orderProducts))
      fetchOrderSpy.mockReturnValue(Promise.resolve(order))
      const orderConfirmationUpdateOrderTrackingSpy = jest.spyOn(
        orderConfirmationActions,
        'orderConfirmationUpdateOrderTracking',
      )

      await basketUpdateProducts(true)(dispatch, getStateSpy)

      expect(dispatch).toBeCalledTimes(8)
      expect(orderConfirmationUpdateOrderTrackingSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('when it fails to update order', () => {
    let loggerErrorSpy

    beforeEach(() => {
      dispatch = jest.fn()
      patchOrderProductsSpy.mockReturnValue(Promise.reject(new Error('Error')))
      loggerErrorSpy = jest.spyOn(utilsLogger, 'error')
    })

    test('should put the error into the error store for BASKET_CHECKOUT', async () => {
      try {
        await basketUpdateProducts()(dispatch, getStateSpy)
      } catch (e) {
        expect(patchOrderProductsSpy).toHaveBeenCalledTimes(1)
        expect(dispatch).toBeCalledWith({
          type: actionTypes.ERROR,
          key: actionTypes.BASKET_CHECKOUT,
          value: true,
        })
        expect(dispatch).toBeCalledWith({
          type: actionTypes.PENDING,
          key: actionTypes.BASKET_CHECKOUT,
          value: false,
        })
      }
    })

    test('should log the error', async () => {
      try {
        await basketUpdateProducts()(dispatch, getStateSpy)
      } catch (e) {
        expect(loggerErrorSpy).toHaveBeenCalledTimes(1)
        expect(loggerErrorSpy).toHaveBeenCalledWith({
          message: 'Error saving order',
          errors: [new Error('Error')],
        })
      }
    })
  })
})
