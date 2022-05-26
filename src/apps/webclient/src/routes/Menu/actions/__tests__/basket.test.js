import Immutable from 'immutable'

import { actionTypes } from 'actions/actionTypes'
import * as orderConfirmationActions from 'actions/orderConfirmation'
import utilsLogger from 'utils/logger'

import * as trackingKeys from '../../../../actions/trackingKeys'
import * as orderV2 from '../../apis/orderV2'
import { basketUpdateProducts } from '../basket'

describe('basketUpdateProducts', () => {
  let dispatch
  let getStateSpy
  let updateOrderSpy

  beforeEach(() => {
    dispatch = jest.fn()
    getStateSpy = jest.fn().mockReturnValue({
      basket: Immutable.fromJS({
        orderId: '1234',
        products: {
          'product-1': 2,
          'product-2': 1,
        },
      }),
      auth: Immutable.Map({ accessToken: '12234' }),
      temp: Immutable.Map({
        originalGrossTotal: '',
      }),
    })

    updateOrderSpy = jest.spyOn(orderV2, 'updateOrder').mockImplementation(jest.fn())
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when update is successful', () => {
    const order = {
      id: '1234',
      products: [
        { id: 1, itemableId: 'product-1', quantity: 2 },
        { id: 2, itemableId: 'product-2', quantity: 1 },
      ],
    }

    test('should call updateOrderItems api with products', async () => {
      updateOrderSpy.mockReturnValue(Promise.resolve({ data: order }))

      await basketUpdateProducts()(dispatch, getStateSpy)
    })

    test('should dispatch correct pending and action events for BASKET_CHECKOUT', async () => {
      updateOrderSpy.mockReturnValue(Promise.resolve({ data: order }))

      await basketUpdateProducts()(dispatch, getStateSpy)

      expect(dispatch).toBeCalledTimes(7)
      expect(dispatch).toBeCalledWith({
        type: actionTypes.PENDING,
        key: actionTypes.BASKET_CHECKOUT,
        value: true,
      })
      expect(dispatch).toBeCalledWith({
        type: actionTypes.BASKET_CHECKOUT,
        trackingData: {
          actionType: trackingKeys.checkOutBasketAttempt,
          order,
        },
      })
      expect(dispatch).toBeCalledWith({
        type: actionTypes.PENDING,
        key: actionTypes.BASKET_CHECKOUT,
        value: false,
      })
    })

    test('should dispatch BASKET_ORDER_DETAILS_LOADED action with the orderDetails', async () => {
      updateOrderSpy.mockReturnValue(Promise.resolve({ data: order }))

      await basketUpdateProducts()(dispatch, getStateSpy)

      expect(dispatch).toBeCalledTimes(7)
      expect(dispatch).toBeCalledWith({
        type: actionTypes.BASKET_ORDER_DETAILS_LOADED,
        orderId: order.id,
        orderDetails: Immutable.fromJS(order),
      })
    })

    test('should dispatch orderConfirmationUpdateOrderTrackingSpy if isOrderConfirmation true', async () => {
      updateOrderSpy.mockReturnValue(Promise.resolve({ data: order }))
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
      updateOrderSpy.mockReturnValue(Promise.reject(new Error({ e: 'Error' })))
      loggerErrorSpy = jest.spyOn(utilsLogger, 'error')
    })

    test('should put the error into the error store for BASKET_CHECKOUT', async () => {
      try {
        await basketUpdateProducts()(dispatch, getStateSpy)
      } catch (e) {
        expect(updateOrderSpy).toHaveBeenCalledTimes(1)
        expect(dispatch).toBeCalledWith({
          type: actionTypes.ERROR,
          key: actionTypes.BASKET_CHECKOUT,
          value: false,
        })
        expect(dispatch).toBeCalledWith({
          type: actionTypes.PENDING,
          key: actionTypes.BASKET_CHECKOUT,
          value: true,
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
          errors: [new Error({ e: 'Error' })],
        })
      }
    })
  })
})
