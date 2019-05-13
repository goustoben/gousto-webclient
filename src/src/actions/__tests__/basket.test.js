import Immutable from 'immutable'
import basket from 'actions/basket'
import actionTypes from 'actions/actionTypes'
import orderConfirmationActions from 'actions/orderConfirmation'
import orderApi from 'apis/orders'
import utilsLogger from 'utils/logger'

jest.mock('apis/orders', () => ({
  updateOrderItems: jest.fn()
}))

jest.mock('utils/logger', () => ({
  error: jest.fn()
}))

jest.mock('actions/orderConfirmation', () => ({
  orderConfirmationUpdateOrderTracking: jest.fn()
}))

describe('basket actions', () => {
  const dispatch = jest.fn()
  const { portionSizeSelectedTracking, basketCheckedOut, basketOrderItemsLoad } = basket

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('portionSizeSelectedTracking', () => {
    test('should dispatch a PORTION_SIZE_SELECTED_TRACKING action with the correct tracking params', async () => {
      const num_portion = 2
      const order_id = 5
      const numPortionChangeTracking = {
        type: actionTypes.PORTION_SIZE_SELECTED_TRACKING,
        trackingData: {
          actionType: 'PortionSize Selected',
          num_portion,
          order_id: order_id ? order_id : null,
        },
      }
      await portionSizeSelectedTracking(num_portion, order_id)(dispatch)

      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith(numPortionChangeTracking)
    })

  })

  describe('basketCheckedOut', () => {
    let getState = () => ({
      auth: Immutable.Map({
        isAuthenticated: true,
      }),
      basket: Immutable.fromJS({
        orderId: '178',
      }),
      filters: Immutable.fromJS({
        dietaryAttributes: []
      }),
      user: Immutable.fromJS({
        orders: {
          '178': {
            'recipeItems': [
              '1234'
            ]
          },
        },
        subscription: {
          state: 'active',
        }
      }),
      pricing: Immutable.fromJS({
        prices: {
          total: '24.00',
          grossTotal: '24.00',
          promoCode: false,
        }
      }),
      temp: Immutable.fromJS({
        originalGrossTotal: "24.99",
        originalNetTotal: "24.99"
      })
    })

    test('should dispatch Order Edited tracking action for subscription box', async() => {
      await basketCheckedOut(2, 'grid')(dispatch, getState)
      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        trackingData: {
          actionType: 'Order Edited',
          order_id: '178',
          order_total: '24.00',
          promo_code: false,
          signp: false,
          subscription_active: true,
        },
        optimizelyData: {
          eventName: 'order_edited_gross',
          tags: {
            revenue: '-0.99'
          }
        }
      })

      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        optimizelyData: {
          eventName: 'order_edited_net',
          tags: {
            revenue: '-0.99'
          }
        }
      })
    })

    test('should dispatch Order Edited tracking action for transactional box', async() => {
      getState = () => ({
        auth: Immutable.Map({
          isAuthenticated: true,
        }),
        basket: Immutable.fromJS({
          orderId: '178',
        }),
        filters: Immutable.fromJS({
          dietaryAttributes: []
        }),
        user: Immutable.fromJS({
          orders: {
            '178': {
              'recipeItems': [
                '1234'
              ]
            },
          },
          subscription: {
            state: 'inactive',
          }
        }),
        pricing: Immutable.fromJS({
          prices: {
            total: '24.00',
            grossTotal: '24.00',
            promoCode: false,
          }
        }),
        temp: Immutable.fromJS({
          originalGrossTotal: "24.99",
          originalNetTotal: "24.99"
        })
      })

      await basketCheckedOut(2, 'grid')(dispatch, getState)
      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        trackingData: {
          actionType: 'Order Edited',
          order_id: '178',
          order_total: '24.00',
          promo_code: false,
          signp: false,
          subscription_active: false,
        },
        optimizelyData: {
          eventName: 'order_edited_gross',
          tags: {
            revenue: '-0.99'
          }
        }
      })

      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        optimizelyData: {
          eventName: 'order_edited_net',
          tags: {
            revenue: '-0.99'
          }
        }
      })
    })

    test('should dispatch Order Place tracking action for transactional box', async() => {
      getState = () => ({
        auth: Immutable.Map({
          isAuthenticated: true,
        }),
        basket: Immutable.fromJS({
          orderId: '',
        }),
        filters: Immutable.fromJS({
          dietaryAttributes: []
        }),
        user: Immutable.fromJS({
          orders: {
            '178': {
              'recipeItems': [
                '1234'
              ]
            },
          },
          subscription: {
            state: 'active',
          }
        }),
        pricing: Immutable.fromJS({
          prices: {
            total: '24.00',
            grossTotal: '24.00',
            promoCode: false,
          }
        }),
        temp: Immutable.fromJS({
          originalGrossTotal: "24.99",
          originalNetTotal: "24.99"
        })
      })
      await basketCheckedOut(2, 'grid')(dispatch, getState)
      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        trackingData: {
          actionType: 'Order Placed',
          order_id: '',
          order_total: '24.00',
          promo_code: false,
          signp: false,
          subscription_active: true,
        },
        optimizelyData: {
          eventName: 'order_placed_gross',
          tags: {
            revenue: '24.00'
          }
        }
      })

      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        optimizelyData: {
          eventName: 'order_placed_net',
          tags: {
            revenue: '24.00'
          }
        }
      })
    })

    test('should dispatch Order Place tracking action for subscription box', async() => {
      getState = () => ({
        auth: Immutable.Map({
          isAuthenticated: true,
        }),
        basket: Immutable.fromJS({
          orderId: '179',
        }),
        filters: Immutable.fromJS({
          dietaryAttributes: []
        }),
        user: Immutable.fromJS({
          orders: {
            '179': {
              'recipeItems': []
            },
          },
          subscription: {
            state: 'active',
          }
        }),
        pricing: Immutable.fromJS({
          prices: {
            total: '22.00',
            grossTotal: '22.00',
            promoCode: false,
          }
        }),
        temp: Immutable.fromJS({
          originalGrossTotal: "24.99",
          originalNetTotal: "24.99"
        })
      })
      await basketCheckedOut(2, 'grid')(dispatch, getState)
      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        trackingData: {
          actionType: 'Order Placed',
          order_id: '179',
          order_total: '22.00',
          promo_code: false,
          signp: false,
          subscription_active: true,
        },
        optimizelyData: {
          eventName: 'order_placed_gross',
          tags: {
            revenue: '22.00'
          }
        }
      })

      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        optimizelyData: {
          eventName: 'order_placed_net',
          tags: {
            revenue: '22.00'
          }
        }
      })
    })

    test('should dispatch  BASKET_CHECKOUT tracking with dietaryAttributes', async() => {
      getState = () => ({
        auth: Immutable.Map({
          isAuthenticated: true,
        }),
        basket: Immutable.fromJS({
          orderId: '179',
        }),
        filters: Immutable.fromJS({
          dietaryAttributes: ['gluten-free']
        }),
        user: Immutable.fromJS({
          orders: {
            '179': {
              'recipeItems': []
            },
          },
          subscription: {
            state: 'active',
          }
        }),
        pricing: Immutable.fromJS({
          prices: {
            total: '22.00',
            grossTotal: '22.00',
            promoCode: false,
          }
        }),
        temp: Immutable.fromJS({
          originalGrossTotal: "24.99",
          originalNetTotal: "24.99"
        })
      })
      await basketCheckedOut(2, 'grid')(dispatch, getState)

      expect(dispatch.mock.calls[3][0]).toEqual({
        type: 'BASKET_CHECKOUT',
        trackingData: {
          actionType: 'BASKET_CHECKED_OUT',
          numRecipes: 2,
          view: 'grid',
          dietary_attribute: Immutable.fromJS(['gluten-free']),
        },
      })
    })
  })

  describe('basketOrderItemsLoad', () => {
    let basketProductAddSpy
    let basketRecipeAddSpy
    let basketGiftAddSpy
    let getStateSpy
    let dispatchSpy
    beforeEach(() => {
      getStateSpy = () => ({
        basket: Immutable.fromJS({ orderId: '456' }),
        products: Immutable.fromJS({
          p1: { id: 'p1' },
          p2: { id: 'p2' },
          p3: { id: 'p3' },
        }),
        user: Immutable.fromJS({
          orders: [
            {
              id: '123',
              box: {
                numPortions: 2,
              },
              giftItems: [
                { id: 'gp1', itemableId: 'p1', itemableType: 'Product', quantity: 1 },
                { id: 'gp3', itemableId: 'p1', itemableType: 'Gift', quantity: 1 },
              ],
              productItems: [
                { id: 'p2', itemableId: 'p2', quantity: 3 },
                { id: 'p3', itemableId: 'p3', quantity: 2 },
              ],
              recipeItems: [
                { id: 'r1', itemableId: 'r1', quantity: 2 },
                { id: 'r2', itemableId: 'r2', quantity: 4 },
              ],
            },
            { id: '456' },
          ],
        }),
      })

      basketProductAddSpy = jest.spyOn(basket, 'basketProductAdd')
      basketRecipeAddSpy = jest.spyOn(basket, 'basketRecipeAdd')
      basketGiftAddSpy = jest.spyOn(basket, 'basketGiftAdd')
      dispatchSpy = jest.fn()
    })

    test('should call basketProductAdd for each product in the given order if order is not already loaded', () => {
      basketOrderItemsLoad('123')(dispatchSpy, getStateSpy)
      expect(basketProductAddSpy).toHaveBeenCalledTimes(5)
      expect(basketProductAddSpy.mock.calls[0]).toEqual(['p2', null, '123'])
      expect(basketProductAddSpy.mock.calls[1]).toEqual(['p2', null, '123'])
      expect(basketProductAddSpy.mock.calls[2]).toEqual(['p2', null, '123'])
      expect(basketProductAddSpy.mock.calls[3]).toEqual(['p3', null, '123'])
      expect(basketProductAddSpy.mock.calls[4]).toEqual(['p3', null, '123'])
    })

    test('should call basketRecipeAdd for each recipe set (total recipes / number portions ) in the given order if order is not already loaded', () => {
      basketOrderItemsLoad('123')(dispatchSpy, getStateSpy)
      expect(basketRecipeAddSpy).toHaveBeenCalledTimes(3)
      expect(basketRecipeAddSpy.mock.calls[0]).toEqual(['r1', null, '123'])
      expect(basketRecipeAddSpy.mock.calls[1]).toEqual(['r2', null, '123'])
      expect(basketRecipeAddSpy.mock.calls[2]).toEqual(['r2', null, '123'])
    })

    test('should call basketGiftAdd for each gift product in the given order if order is not already loaded', () => {
      basketOrderItemsLoad('123')(dispatchSpy, getStateSpy)
      expect(basketGiftAddSpy).toHaveBeenCalledTimes(2)
      expect(basketGiftAddSpy.mock.calls[0]).toEqual(['p1', 'Product'])
      expect(basketGiftAddSpy.mock.calls[1]).toEqual(['p1', 'Gift'])
    })

    test('should NOT call basketProductAdd, basketRecipeAdd, or basketGiftAdd if order is already loaded', () => {
      basketOrderItemsLoad('456')(dispatchSpy, getStateSpy)
      expect(basketProductAddSpy).not.toHaveBeenCalled()
      expect(basketRecipeAddSpy).not.toHaveBeenCalled()
      expect(basketGiftAddSpy).not.toHaveBeenCalled()
    })
  })
  describe('basketUpdateProducts', function () {
    let getStateSpy
    let dispatchSpy
    beforeEach(() => {
      dispatchSpy = jest.fn()
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
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    describe('when update is sucessful', function () {
      const order = {
        id: '23',
        products: [
          { id: 1, itemableId: 'product-1', quantity: 2 },
          { id: 2, itemableId: 'product-2', quantity: 1 },
        ],
      }
      const updateOrderItemsSpy = jest.spyOn(orderApi, 'updateOrderItems')
      orderApi.updateOrderItems.mockReturnValue(Promise.resolve({ data: order }))

      test('should call updateOrderItems api with products', function () {
        basket.basketUpdateProducts()(dispatchSpy, getStateSpy)
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
      test('should dispatch correct pending and action events for BASKET_CHECKOUT', (done) => {
        orderApi.updateOrderItems.mockReturnValue(Promise.resolve({ data: order }))
        basket.basketUpdateProducts()(dispatchSpy, getStateSpy)
          .then(function () {
            expect(dispatchSpy.mock.calls.length).toBe(8)
            expect(dispatchSpy.mock.calls[0][0]).toEqual({
              type: actionTypes.PENDING,
              key: actionTypes.BASKET_CHECKOUT,
              value: true,
            })
            expect(dispatchSpy.mock.calls[1][0]).toEqual({
              type: actionTypes.BASKET_CHECKOUT,
              trackingData: {
                actionType: actionTypes.BASKET_CHECKED_OUT,
                order,
              },
            })
            expect(dispatchSpy.mock.calls[7][0]).toEqual({
              type: actionTypes.PENDING,
              key: actionTypes.BASKET_CHECKOUT,
              value: false,
            })
          })
          .then(done, done)
      })

      test('should dispatch BASKET_ORDER_DETAILS_LOADED action with the orderDetails', (done) => {
        orderApi.updateOrderItems.mockReturnValue(Promise.resolve({ data: order }))
        basket.basketUpdateProducts()(dispatchSpy, getStateSpy)
          .then(function () {
            expect(dispatchSpy.mock.calls.length).toBe(8)
            expect(dispatchSpy.mock.calls[2][0]).toEqual({
              type: actionTypes.BASKET_ORDER_DETAILS_LOADED,
              orderId: order.id,
              orderDetails: Immutable.fromJS(order),
            })
          })
          .then(done, done)
      })

      test('should dispatch orderConfirmationUpdateOrderTrackingSpy if isOrderConfirmation true', (done) => {
        orderApi.updateOrderItems.mockReturnValue(Promise.resolve({ data: order }))
        const orderConfirmationUpdateOrderTrackingSpy = jest.spyOn(orderConfirmationActions, 'orderConfirmationUpdateOrderTracking')
        basket.basketUpdateProducts(true)(dispatchSpy, getStateSpy)
          .then(function () {
            expect(dispatchSpy.mock.calls.length).toBe(9)
            expect(orderConfirmationUpdateOrderTrackingSpy).toHaveBeenCalledTimes(1)
          })
          .then(done, done)
      })
    })

    describe('when it fails to update order', function () {
      let updateOrderItemsSpy
      let loggerErrorSpy
      beforeEach(function () {
        dispatchSpy = jest.fn()
        updateOrderItemsSpy = jest.spyOn(orderApi, 'updateOrderItems')
        orderApi.updateOrderItems.mockReturnValue(Promise.reject(new Error({ e: 'Error' })))
        loggerErrorSpy = jest.spyOn(utilsLogger, 'error')
      })
      test('should put the error into the error store for BASKET_CHECKOUT', function (done) {
        basket.basketUpdateProducts()(dispatchSpy, getStateSpy)
          .catch(function () {
            expect(updateOrderItemsSpy).toHaveBeenCalledTimes(1)
            expect(dispatchSpy.mock.calls[0][0]).toEqual({
              type: actionTypes.PENDING,
              key: actionTypes.BASKET_CHECKOUT,
              value: true,
            })
            expect(dispatchSpy.mock.calls[1][0]).toEqual({
              type: actionTypes.ERROR,
              key: actionTypes.BASKET_CHECKOUT,
              value: new Error({ e: 'Error' }).message,
            })
            expect(dispatchSpy.mock.calls[2][0]).toEqual({
              type: actionTypes.PENDING,
              key: actionTypes.BASKET_CHECKOUT,
              value: false,
            })
          })
          .then(done, done)
      })
      test('should log the error', function (done) {
        basket.basketUpdateProducts()(dispatchSpy, getStateSpy)
          .catch(function () {
            expect(loggerErrorSpy).toHaveBeenCalledTimes(1)
            expect(loggerErrorSpy).toHaveBeenCalledWith((new Error({ e: 'Error' })))
          })
          .then(done, done)
      })
    })
  })
})
