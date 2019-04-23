import Immutable from 'immutable'

import actionTypes from 'actions/actionTypes'
import { fetchOrder } from 'apis/orders'

import { basketOrderLoad } from 'actions/basket'
import { recipesLoadRecipesById } from 'actions/recipes'
import {
  productsLoadProducts,
} from 'actions/products'

import {
  orderDetails,
  orderConfirmationProductTracking,
  orderConfirmationUpdateOrderTracking,
} from 'actions/orderConfirmation'


jest.mock('apis/orders', () => ({
  fetchOrder: jest.fn()
}))

jest.mock('actions/recipes', () => ({
  recipesLoadRecipesById: jest.fn()
}))

jest.mock('actions/products', () => ({
  productsLoadProducts: jest.fn(),
  productsLoadStock: jest.fn(),
  productsLoadCategories: jest.fn()
}))

jest.mock('actions/basket', () => ({
  basketOrderLoad: jest.fn()
}))

describe('orderConfirmation actions', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()

  beforeEach(() => {
    getState.mockReturnValue({
      auth: Immutable.Map({
        accessToken: 'access-token',
      }),
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('orderDetails', () => {
    test('should attempt to fetch the order details for the orderId given', async () => {
      fetchOrder.mockReturnValue(
        Promise.resolve({ data: { id: '1234', whenCutOff: '2019-04-12 19:00:00' } })
      )

      await orderDetails('1234')(dispatch, getState)

      expect(fetchOrder).toHaveBeenCalled()
    })

    describe('when fetchOrder returns an order containing recipe ids', () => {
      beforeEach(() => {
        fetchOrder.mockReturnValue(
          Promise.resolve({
            data: {
              id: '1234',
              whenCutOff: '2019-04-12 19:00:00',
              recipeItems: [
                {itemableId: '1'},
                {itemableId: '2'},
              ],
            },
          })
        )
      })

      test('should fetch the recipes for the given recipe ids in the order', async () => {
        await orderDetails('1234')(dispatch, getState)

        expect(recipesLoadRecipesById).toHaveBeenCalledWith(['1','2'])
      })
    })

    describe('when fetchOrder returns an order and a cutoff date', () => {
      beforeEach(() => {
        fetchOrder.mockReturnValue(
          Promise.resolve({
            data: {
              id: '1234',
              whenCutOff: '2019-04-12 19:00:00',
            },
          })
        )
      })

      test('should fetch the products for the returned cutoff date', async () => {
        await orderDetails('1234')(dispatch, getState)

        expect(productsLoadProducts).toHaveBeenCalledWith('2019-04-12 19:00:00')
      })

      test('should call basket order load for the returned order', async () => {
        await orderDetails('1234')(dispatch, getState)

        expect(basketOrderLoad).toHaveBeenCalledWith('1234', Immutable.Map({
          "id": "1234",
          "whenCutOff": "2019-04-12 19:00:00"
        }))
      })
    })

    describe('when the fetchOrder call fails', () => {
      beforeEach(() => {
        fetchOrder.mockReturnValue(
          Promise.reject(new Error('error'))
        )
      })

      test('should not fetch the products', async () => {
        await orderDetails('1234')(dispatch, getState)

        expect(productsLoadProducts).not.toHaveBeenCalled()
      })
    })
  })

  describe('orderConfirmationProductTracking', () => {
    test('should return actionType as MarketProduct Added if boolean value is true', () => {
      const productId = '1234'
      const added = true

      orderConfirmationProductTracking(productId, added)(dispatch)

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.BASKET_PRODUCT_TRACKING,
        trackingData: {
          actionType: 'MarketProduct Added',
          product_id: '1234'
        }
      })
    })

    test('should return actionType as MarketProduct Removed if boolean value is false', () => {
      const productId = '1234'
      const added = false

      orderConfirmationProductTracking(productId, added)(dispatch)

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.BASKET_PRODUCT_TRACKING,
        trackingData: {
          actionType: 'MarketProduct Removed',
          product_id: '1234'
        }
      })
    })
  })

  describe('orderConfirmationUpdateOrderTracking', () => {
    beforeEach(() => {
      getState.mockReturnValueOnce({
        basket: Immutable.fromJS({
          orderId: '123',
          orderDetails: {
            number: '1',
            prices: {
              total: '25.5',
              promoCode: false,
            }
          }
        }),
        user: Immutable.fromJS({
          subscription: {
            state: 'active'
          }
        })
      })
    })

    test('should dispatch orderConfirmationUpdateOrderTracking with the right details', () => {
      orderConfirmationUpdateOrderTracking()(dispatch, getState)
      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.ORDER_CONFIRMATION_EDITED_TRACKING,
        trackingData: {
          actionType: "Order Edited",
          order_id: "123",
          order_total: "25.5",
          promo_code: false,
          signup: false,
          subscription_active: true,
          subscription_order: "1"
        }
      })
    })
  })
})
