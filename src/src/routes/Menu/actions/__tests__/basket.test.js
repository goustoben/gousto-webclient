import Immutable from 'immutable'
import * as orderConfirmationActions from 'actions/orderConfirmation'
import * as OrderAPIV1 from 'apis/orders'
import { logger } from 'utils/logger'
import { actionTypes } from 'actions/actionTypes'
import * as trackingKeys from '../../../../actions/trackingKeys'
import { basketUpdateProducts } from '../basket'

describe('basketUpdateProducts', () => {
  let dispatch
  let getStateSpy
  let updateOrderItemsSpy

  beforeEach(() => {
    dispatch = jest.fn()
    getStateSpy = jest.fn().mockReturnValue({
      basket: Immutable.fromJS({
        orderId: '23',
        products: {
          'product-1': 2,
          'product-2': 1,
        },
      }),
      auth: Immutable.Map({ accessToken: '12234' }),
      temp: Immutable.Map({
        originalGrossTotal: ''
      })
    })

    updateOrderItemsSpy = jest.spyOn(OrderAPIV1, 'updateOrderItems').mockImplementation(jest.fn())
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when update is successful', () => {
    const order = {
      id: '23',
      products: [
        { id: 1, itemableId: 'product-1', quantity: 2 },
        { id: 2, itemableId: 'product-2', quantity: 1 },
      ],
    }

    test('should call updateOrderItems api with products', async () => {
      updateOrderItemsSpy.mockReturnValue(Promise.resolve({ data: order }))

      await basketUpdateProducts()(dispatch, getStateSpy)

      expect(updateOrderItemsSpy).toHaveBeenCalled()
      expect(updateOrderItemsSpy).toHaveBeenCalledWith(
        '12234',
        '23',
        {
          item_choices: [
            {
              id: 'product-1',
              quantity: 2,
              type: 'Product',
            },
            {
              id: 'product-2',
              quantity: 1,
              type: 'Product',
            },
          ],
          restrict: 'Product',
        },
      )
    })

    test('should dispatch correct pending and action events for BASKET_CHECKOUT', async () => {
      updateOrderItemsSpy.mockReturnValue(Promise.resolve({ data: order }))

      await basketUpdateProducts()(dispatch, getStateSpy)

      expect(dispatch).toBeCalledTimes(6)
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
      updateOrderItemsSpy.mockReturnValue(Promise.resolve({ data: order }))

      await basketUpdateProducts()(dispatch, getStateSpy)

      expect(dispatch).toBeCalledTimes(6)
      expect(dispatch).toBeCalledWith({
        type: actionTypes.BASKET_ORDER_DETAILS_LOADED,
        orderId: order.id,
        orderDetails: Immutable.fromJS(order),
      })
    })

    test('should dispatch orderConfirmationUpdateOrderTrackingSpy if isOrderConfirmation true', async () => {
      updateOrderItemsSpy.mockReturnValue(Promise.resolve({ data: order }))
      const orderConfirmationUpdateOrderTrackingSpy = jest.spyOn(orderConfirmationActions, 'orderConfirmationUpdateOrderTracking')

      await basketUpdateProducts(true)(dispatch, getStateSpy)

      expect(dispatch).toBeCalledTimes(7)
      expect(orderConfirmationUpdateOrderTrackingSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('when it fails to update order', () => {
    let loggerErrorSpy

    beforeEach(() => {
      dispatch = jest.fn()
      updateOrderItemsSpy.mockReturnValue(Promise.reject(new Error({ e: 'Error' })))
      loggerErrorSpy = jest.spyOn(logger, 'error')
    })

    test('should put the error into the error store for BASKET_CHECKOUT', async () => {
      try {
        await basketUpdateProducts()(dispatch, getStateSpy)
      } catch (e) {
        expect(updateOrderItemsSpy).toHaveBeenCalledTimes(1)
        expect(dispatch).toBeCalledWith({
          type: actionTypes.PENDING,
          key: actionTypes.BASKET_CHECKOUT,
          value: true,
        })
        expect(dispatch).toBeCalledWith({
          type: actionTypes.ERROR,
          key: actionTypes.BASKET_CHECKOUT,
          value: new Error({ e: 'Error' }).message,
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
        expect(loggerErrorSpy).toHaveBeenCalledWith((new Error({ e: 'Error' })))
      }
    })
  })
})
