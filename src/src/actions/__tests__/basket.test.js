import Immutable from 'immutable'
import basket from 'actions/basket'
import pricingActions from 'actions/pricing'
import actionTypes from 'actions/actionTypes'
import orderConfirmationActions from 'actions/orderConfirmation'
import { updateOrderItems } from 'apis/orders'
import utilsLogger from 'utils/logger'
import { push } from 'react-router-redux'
import config from 'config'

jest.mock('apis/orders', () => ({
  updateOrderItems: jest.fn()
}))

jest.mock('utils/logger', () => ({
  error: jest.fn()
}))

jest.mock('actions/pricing', () => ({
  __esModule: true,
  default: {
    pricingRequest: jest.fn()
  }
}))

jest.mock('utils/basket', () => ({
  okRecipes: recipes => recipes,
  limitReached: () => false,
  basketSumMock: () => false,
  shortlistLimitReached: () => false
}))

jest.mock('actions/orderConfirmation', () => ({
  orderConfirmationUpdateOrderTracking: jest.fn()
}))

describe('basket actions', () => {
  let dispatch = jest.fn()
  let getStateSpy = jest.fn()
  const { portionSizeSelectedTracking, basketCheckedOut, basketOrderItemsLoad, basketProceedToCheckout, basketRecipeAdd, basketRecipeRemove, basketNumPortionChange } = basket

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

  describe('basketNumPortionChange', () => {
    test('should dispatch a pricing pricingRequest action', () => {
      const pricingRequestResponse = Symbol()
      pricingActions.pricingRequest.mockReturnValue(pricingRequestResponse)

      getStateSpy.mockReturnValue({ routing: { locationBeforeTransitions: { query: null } } })

      basketNumPortionChange(2)(dispatch, getStateSpy)

      expect(dispatch).toHaveBeenCalledWith(pricingRequestResponse)
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

    test('should dispatch Order Edited tracking action for subscription box', async () => {
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
          type: 'event',
          eventName: 'order_edited_gross',
          tags: {
            revenue: '-0.99'
          }
        }
      })

      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        optimizelyData: {
          type: 'event',
          eventName: 'order_edited_net',
          tags: {
            revenue: '-0.99'
          }
        }
      })
    })

    test('should dispatch Order Edited tracking action for transactional box', async () => {
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
          type: 'event',
          eventName: 'order_edited_gross',
          tags: {
            revenue: '-0.99'
          }
        }
      })

      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        optimizelyData: {
          type: 'event',
          eventName: 'order_edited_net',
          tags: {
            revenue: '-0.99'
          }
        }
      })
    })

    test('should dispatch Order Place tracking action for transactional box', async () => {
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
          type: 'event',
          eventName: 'order_placed_gross',
          tags: {
            revenue: '24.00'
          }
        }
      })

      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        optimizelyData: {
          type: 'event',
          eventName: 'order_placed_net',
          tags: {
            revenue: '24.00'
          }
        }
      })
    })

    test('should dispatch Order Place tracking action for subscription box', async () => {
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
          type: 'event',
          eventName: 'order_placed_gross',
          tags: {
            revenue: '22.00'
          }
        }
      })

      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        optimizelyData: {
          type: 'event',
          eventName: 'order_placed_net',
          tags: {
            revenue: '22.00'
          }
        }
      })
    })

    test('should dispatch  BASKET_CHECKOUT tracking with dietaryAttributes', async () => {
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
          dietary_attribute: ['gluten-free'],
        },
      })
    })
  })

  describe('basketOrderItemsLoad', () => {
    let basketProductAddSpy
    let basketRecipeAddSpy
    let basketGiftAddSpy
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
      dispatch = jest.fn()
    })

    test('should call basketProductAdd for each product in the given order if order is not already loaded', () => {
      basketOrderItemsLoad('123')(dispatch, getStateSpy)
      expect(basketProductAddSpy).toHaveBeenCalledTimes(5)
      expect(basketProductAddSpy.mock.calls[0]).toEqual(['p2', null, '123'])
      expect(basketProductAddSpy.mock.calls[1]).toEqual(['p2', null, '123'])
      expect(basketProductAddSpy.mock.calls[2]).toEqual(['p2', null, '123'])
      expect(basketProductAddSpy.mock.calls[3]).toEqual(['p3', null, '123'])
      expect(basketProductAddSpy.mock.calls[4]).toEqual(['p3', null, '123'])
    })

    test('should call basketRecipeAdd for each recipe set (total recipes / number portions ) in the given order if order is not already loaded', () => {
      basketOrderItemsLoad('123')(dispatch, getStateSpy)
      expect(basketRecipeAddSpy).toHaveBeenCalledTimes(3)
      expect(basketRecipeAddSpy.mock.calls[0]).toEqual(['r1', null, '123'])
      expect(basketRecipeAddSpy.mock.calls[1]).toEqual(['r2', null, '123'])
      expect(basketRecipeAddSpy.mock.calls[2]).toEqual(['r2', null, '123'])
    })

    test('should call basketGiftAdd for each gift product in the given order if order is not already loaded', () => {
      basketOrderItemsLoad('123')(dispatch, getStateSpy)
      expect(basketGiftAddSpy).toHaveBeenCalledTimes(2)
      expect(basketGiftAddSpy.mock.calls[0]).toEqual(['p1', 'Product'])
      expect(basketGiftAddSpy.mock.calls[1]).toEqual(['p1', 'Gift'])
    })

    test('should NOT call basketProductAdd, basketRecipeAdd, or basketGiftAdd if order is already loaded', () => {
      basketOrderItemsLoad('456')(dispatch, getStateSpy)
      expect(basketProductAddSpy).not.toHaveBeenCalled()
      expect(basketRecipeAddSpy).not.toHaveBeenCalled()
      expect(basketGiftAddSpy).not.toHaveBeenCalled()
    })
  })

  describe('basketUpdateProducts', () => {
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

      updateOrderItems.mockReturnValue(Promise.resolve({ data: order }))

      test('should call updateOrderItems api with products', function () {
        basket.basketUpdateProducts()(dispatch, getStateSpy)
        expect(updateOrderItems).toHaveBeenCalled()
        expect(updateOrderItems).toHaveBeenCalledWith(
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
        updateOrderItems.mockReturnValue(Promise.resolve({ data: order }))
        basket.basketUpdateProducts()(dispatch, getStateSpy)
          .then(function () {
            expect(dispatch.mock.calls.length).toBe(8)
            expect(dispatch.mock.calls[0][0]).toEqual({
              type: actionTypes.PENDING,
              key: actionTypes.BASKET_CHECKOUT,
              value: true,
            })
            expect(dispatch.mock.calls[1][0]).toEqual({
              type: actionTypes.BASKET_CHECKOUT,
              trackingData: {
                actionType: actionTypes.BASKET_CHECKED_OUT,
                order,
              },
            })
            expect(dispatch.mock.calls[7][0]).toEqual({
              type: actionTypes.PENDING,
              key: actionTypes.BASKET_CHECKOUT,
              value: false,
            })
          })
          .then(done, done)
      })

      test('should dispatch BASKET_ORDER_DETAILS_LOADED action with the orderDetails', (done) => {
        updateOrderItems.mockReturnValue(Promise.resolve({ data: order }))
        basket.basketUpdateProducts()(dispatch, getStateSpy)
          .then(function () {
            expect(dispatch.mock.calls.length).toBe(8)
            expect(dispatch.mock.calls[2][0]).toEqual({
              type: actionTypes.BASKET_ORDER_DETAILS_LOADED,
              orderId: order.id,
              orderDetails: Immutable.fromJS(order),
            })
          })
          .then(done, done)
      })

      test('should dispatch orderConfirmationUpdateOrderTrackingSpy if isOrderConfirmation true', (done) => {
        updateOrderItems.mockReturnValue(Promise.resolve({ data: order }))
        const orderConfirmationUpdateOrderTrackingSpy = jest.spyOn(orderConfirmationActions, 'orderConfirmationUpdateOrderTracking')
        basket.basketUpdateProducts(true)(dispatch, getStateSpy)
          .then(function () {
            expect(dispatch.mock.calls.length).toBe(9)
            expect(orderConfirmationUpdateOrderTrackingSpy).toHaveBeenCalledTimes(1)
          })
          .then(done, done)
      })
    })

    describe('when it fails to update order', function () {
      let loggerErrorSpy
      beforeEach(function () {
        dispatch = jest.fn()
        updateOrderItems.mockReturnValue(Promise.reject(new Error({ e: 'Error' })))
        loggerErrorSpy = jest.spyOn(utilsLogger, 'error')
      })
      test('should put the error into the error store for BASKET_CHECKOUT', function (done) {
        basket.basketUpdateProducts()(dispatch, getStateSpy)
          .catch(function () {
            expect(updateOrderItems).toHaveBeenCalledTimes(1)
            expect(dispatch.mock.calls[0][0]).toEqual({
              type: actionTypes.PENDING,
              key: actionTypes.BASKET_CHECKOUT,
              value: true,
            })
            expect(dispatch.mock.calls[1][0]).toEqual({
              type: actionTypes.ERROR,
              key: actionTypes.BASKET_CHECKOUT,
              value: new Error({ e: 'Error' }).message,
            })
            expect(dispatch.mock.calls[2][0]).toEqual({
              type: actionTypes.PENDING,
              key: actionTypes.BASKET_CHECKOUT,
              value: false,
            })
          })
          .then(done, done)
      })
      test('should log the error', function (done) {
        basket.basketUpdateProducts()(dispatch, getStateSpy)
          .catch(function () {
            expect(loggerErrorSpy).toHaveBeenCalledTimes(1)
            expect(loggerErrorSpy).toHaveBeenCalledWith((new Error({ e: 'Error' })))
          })
          .then(done, done)
      })
    })
  })

  describe('basketProceedToCheckout', () => {
    let getState

    beforeEach(() => {
      getState = () => ({
        basket: Immutable.fromJS({
          orderId: '179',
        }),
        filters: Immutable.fromJS({
          dietaryAttributes: ['dairy-free']
        }),
      })
    })

    test('should track the dietary attribute for proceed to checkout', () => {
      basketProceedToCheckout()(dispatch, getState)
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: 'BASKET_CHECKOUT_PROCEED',
        trackingData: {
          actionType: 'BASKET_CHECKOUT_PROCEED',
          basket: Immutable.fromJS({
            orderId: '179',
          }),
          dietary_attribute: ['dairy-free'],
        },
      })
    })

    test('should proceed to choose plan if choosePlan feature is enabled', () => {
      getState = () => ({
        basket: Immutable.fromJS({
          orderId: '179',
        }),
        filters: Immutable.fromJS({
          dietaryAttributes: ['dairy-free']
        }),
        features: Immutable.fromJS({
          choosePlanRoute: {
            value: true
          }
        })
      })

      basketProceedToCheckout()(dispatch, getState)
      expect(dispatch).toHaveBeenCalledWith(push(config.routes.client.choosePlan))
    })

    test("should proceed to checkout if choosePlan feature isn't enabled", () => {
      basketProceedToCheckout()(dispatch, getState)
      expect(dispatch).toHaveBeenCalledWith(push(config.routes.client['check-out']))
    })
  })

  describe('basketRecipeAdd', () => {
    beforeEach(() => {
      getStateSpy = jest.fn().mockReturnValue({
        basket: Immutable.Map({
          recipes: Immutable.Map([['123', 1]]),
          numPortions: 2,
          limitReached: false,
          shortlist: Immutable.fromJS({
            shortlistRecipes: {}
          })
        }),
        filters: Immutable.Map({
          currentCollectionId: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
          recipeGroup: {
            slug: 'test-food-brand'
          },
        }),
        menuRecipeStock: Immutable.fromJS({
          123: { 2: 30 },
        }),
        menuRecipes: Immutable.fromJS({
          123: {},
        })
      })
    })
    test('should dispatch BASKET_LIMIT_REACHED, MENU_RECIPE_STOCK_CHANGE and BASKET_RECIPE_ADD action types with correct recipe id and limit reached when there is stock', function () {
      basketRecipeAdd('123', undefined, undefined, { position: '57' })(dispatch, getStateSpy)

      expect(getStateSpy.mock.calls).toHaveLength(4)
      expect(dispatch.mock.calls).toHaveLength(3)

      expect(dispatch.mock.calls[0]).toEqual([{
        type: actionTypes.BASKET_RECIPE_ADD,
        recipeId: '123',
        position: '57',
        collection: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
        trackingData: {
          view: undefined,
          actionType: 'Recipe Added',
          recipeId: '123',
          position: '57',
          collection: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
          source: 'test-food-brand',
          recipe_count: 2
        },
      }])

      expect(dispatch.mock.calls[1]).toEqual([{
        type: actionTypes.MENU_RECIPE_STOCK_CHANGE,
        stock: { 123: { 2: -1 } },
      }])
    })

    test('should map through the given view to the tracking data', function () {
      basketRecipeAdd('123', 'boxsummary')(dispatch, getStateSpy)

      expect(getStateSpy.mock.calls).toHaveLength(4)
      expect(dispatch.mock.calls).toHaveLength(3)

      expect(dispatch.mock.calls[0]).toEqual([{
        type: actionTypes.BASKET_RECIPE_ADD,
        recipeId: '123',
        trackingData: {
          view: 'boxsummary',
          actionType: 'Recipe Added',
          recipeId: '123',
          position: undefined,
          collection: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
          source: 'test-food-brand',
          recipe_count: 2
        },
      }])

      expect(dispatch.mock.calls[1]).toEqual([{
        type: actionTypes.MENU_RECIPE_STOCK_CHANGE,
        stock: { 123: { 2: -1 } },
      }])
    })

    test('should dispatch BASKET_LIMIT_REACHED, MENU_RECIPE_STOCK_CHANGE and BASKET_RECIPE_ADD action types with correct recipe id and limit reached when there is stock, taking portion into consideration', function () {
      getStateSpy = jest.fn().mockReturnValue({
        basket: Immutable.Map({
          recipes: Immutable.Map([['123', 1]]),
          numPortions: 4,
          limitReached: false,
        }),
        filters: Immutable.Map({
          currentCollectionId: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
          recipeGroup: {
            slug: 'test-food-brand'
          },
        }),
        menuRecipeStock: Immutable.fromJS({
          123: { 2: 0, 4: 30 },
        }),
        menuRecipes: Immutable.fromJS({
          123: {},
        }),
      })
      basketRecipeAdd('123')(dispatch, getStateSpy)

      expect(getStateSpy.mock.calls).toHaveLength(4)
      expect(dispatch.mock.calls).toHaveLength(3)
      expect(dispatch.mock.calls[0]).toEqual([{
        type: actionTypes.BASKET_RECIPE_ADD,
        recipeId: '123',
        trackingData: {
          view: undefined,
          actionType: 'Recipe Added',
          recipeId: '123',
          position: undefined,
          collection: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
          source: 'test-food-brand',
          recipe_count: 2
        },
      }])

      expect(dispatch.mock.calls[1]).toEqual([{
        type: actionTypes.MENU_RECIPE_STOCK_CHANGE,
        stock: { 123: { 4: -1 } },
      }])
    })

    test('should dispatch 3 actions when portion limit is reached when there is stock', function () {
      basketRecipeAdd('123')(dispatch, getStateSpy)

      expect(getStateSpy.mock.calls).toHaveLength(4)
      expect(dispatch.mock.calls).toHaveLength(3)
    })

    test('should dispatch 3 actions when portion and recipe limit is reached when there is stock', function () {
      getStateSpy = jest.fn().mockReturnValue({
        basket: Immutable.Map({
          recipes: Immutable.Map([['123', 1], ['111', 1], ['222', 1], ['333', 1]]),
          numPortions: 2,
          limitReached: true,
        }),
        filters: Immutable.Map({
          currentCollectionId: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
          recipeGroup: {
            slug: 'test-food-brand'
          },
        }),
        menuRecipeStock: Immutable.fromJS({
          123: { 2: 30 },
        }),
        menuRecipes: Immutable.fromJS({
          123: {},
        }),
      })
      basketRecipeAdd('123')(dispatch, getStateSpy)

      expect(getStateSpy.mock.calls).toHaveLength(4)
      expect(dispatch.mock.calls).toHaveLength(3)
    })

    test('should only dispatch pricing update action actions when out of stock', function () {
      getStateSpy = jest.fn().mockReturnValue({
        basket: Immutable.Map({
          recipes: Immutable.Map([['123', 1]]),
          numPortions: 2,
          limitReached: true,
        }),
        filters: Immutable.Map({
          currentCollectionId: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
          recipeGroup: {
            slug: 'test-food-brand'
          },
        }),
        menuRecipeStock: Immutable.fromJS({
          123: { 2: 0, 4: 30 },
        }),
        menuRecipes: Immutable.fromJS({
          123: {},
        }),
      })

      const pricingRequestResponse = Symbol()
      pricingActions.pricingRequest.mockReturnValue(pricingRequestResponse)

      basketRecipeAdd('123')(dispatch, getStateSpy)

      expect(getStateSpy.mock.calls).toHaveLength(3)
      expect(dispatch.mock.calls).toHaveLength(1)
      expect(dispatch.mock.calls[0]).toEqual([pricingRequestResponse])
    })

    test('should not run all it\'s checks or affect the stock or dispatch tracking data if the force parameter is set', function () {
      basketRecipeAdd('123', null, true, {
        position: 3,
        collection: 'sa_dasdadsfrwe234rfds',
      })(dispatch, getStateSpy)
      expect(dispatch.mock.calls).toHaveLength(3)
      expect(dispatch.mock.calls[0]).toEqual([{
        type: actionTypes.BASKET_RECIPE_ADD,
        recipeId: '123',
        position: 3,
        collection: 'sa_dasdadsfrwe234rfds',
      }])
      expect(dispatch.mock.calls[1]).toEqual([{
        type: actionTypes.BASKET_LIMIT_REACHED,
        limitReached: false,
      }])
    })

    test('should dispatch a pricing pricingRequest action', () => {
      const pricingRequestResponse = Symbol()
      pricingActions.pricingRequest.mockReturnValue(pricingRequestResponse)

      getStateSpy.mockReturnValue({
        basket: Immutable.Map({
          recipes: Immutable.Map([['123', 1]]),
          numPortions: 2,
          limitReached: true,
        })
      })

      basketRecipeAdd('123', null, true, {
        position: 3,
        collection: 'a',
      })(dispatch, getStateSpy)

      expect(dispatch).toHaveBeenCalledWith(pricingRequestResponse)
    })

    describe('when recipe in shortlist', () => {
      test('should remove recipe from shortlist', () => {
        getStateSpy = jest.fn().mockReturnValue({
          basket: Immutable.Map({
            recipes: Immutable.Map([['123', 1]]),
            numPortions: 2,
            limitReached: false,
            shortlist: Immutable.fromJS({
              shortlistRecipes: {
                '123': 1
              }
            })
          }),
          filters: Immutable.Map({
            currentCollectionId: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
            recipeGroup: {
              slug: 'test-food-brand'
            },
          }),
          menuRecipeStock: Immutable.fromJS({
            123: { 2: 30 },
          }),
          menuRecipes: Immutable.fromJS({
            123: {},
          })
        })

        basketRecipeAdd('123', null, false)(dispatch, getStateSpy)
        expect(dispatch).toHaveBeenCalledWith({
          type: actionTypes.SHORTLIST_RECIPE_REMOVE,
          recipeId: '123',
          trackingData: {
            actionType: 'Shortlist Recipe Remove',
            recipeId: '123',
            view: undefined,
            collection: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
            source: 'test-food-brand',
            shortlistRecipes: Immutable.Map({
              '123': 1
            }),
            basketRecipes: Immutable.Map([['123', 1]]),
            shortlistPosition: 1
          }
        })
      })
    })
  })

  describe('basketRecipeRemove', () => {
    beforeEach(() => {
      getStateSpy = jest.fn().mockReturnValue({
        basket: Immutable.Map({
          recipes: Immutable.Map([['111', 3]]),
          numPortions: 2,
          limitReached: true,
        }),
        filters: Immutable.Map({
          currentCollectionId: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
          recipeGroup: {
            slug: 'test-food-brand'
          },
        }),
      })
    })
    test('should dispatch BASKET_LIMIT_REACHED, MENU_RECIPE_STOCK_CHANGE and BASKET_RECIPE_REMOVE action types with correct recipe id and limit reached', function () {
      basketRecipeRemove('123')(dispatch, getStateSpy)

      expect(getStateSpy.mock.calls).toHaveLength(3)
      expect(dispatch.mock.calls).toHaveLength(4)

      expect(dispatch.mock.calls[0]).toEqual([{
        type: actionTypes.BASKET_RECIPE_REMOVE,
        recipeId: '123',
        trackingData: {
          actionType: 'Recipe Removed',
          recipeId: '123',
          view: undefined,
          position: undefined,
          collection: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
          source: 'test-food-brand',
          recipe_count: 0
        },
      }])

      expect(dispatch.mock.calls[1]).toEqual([{
        type: actionTypes.MENU_RECIPE_STOCK_CHANGE,
        stock: { 123: { 2: 1 } },
      }])

      expect(dispatch.mock.calls[2]).toEqual([{
        type: actionTypes.BASKET_LIMIT_REACHED,
        limitReached: false,
        trackingData: {
          view: undefined,
          source: actionTypes.RECIPE_REMOVED,
          actionType: actionTypes.BASKET_LIMIT_REACHED,
          limitReached: false,
        },
      }])
    })

    test('should dispatch a pricing pricingRequest action', () => {
      const pricingRequestResponse = Symbol()
      pricingActions.pricingRequest.mockReturnValue(pricingRequestResponse)
      
      basketRecipeRemove('123')(dispatch, getStateSpy)

      expect(dispatch).toHaveBeenCalledWith(pricingRequestResponse)
    })

    test('should map through the given view argument through to trackingData', function () {
      basketRecipeRemove('123', 'boxsummary')(dispatch, getStateSpy)

      expect(getStateSpy.mock.calls).toHaveLength(3)
      expect(dispatch.mock.calls).toHaveLength(4)

      expect(dispatch.mock.calls[0]).toEqual([{
        type: actionTypes.BASKET_RECIPE_REMOVE,
        recipeId: '123',
        trackingData: {
          actionType: 'Recipe Removed',
          recipeId: '123',
          view: 'boxsummary',
          position: undefined,
          collection: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
          source: 'test-food-brand',
          recipe_count: 0
        },
      }])

      expect(dispatch.mock.calls[1]).toEqual([{
        type: actionTypes.MENU_RECIPE_STOCK_CHANGE,
        stock: { 123: { 2: 1 } },
      }])

      expect(dispatch.mock.calls[2]).toEqual([{
        type: actionTypes.BASKET_LIMIT_REACHED,
        limitReached: false,
        trackingData: {
          view: 'boxsummary',
          source: actionTypes.RECIPE_REMOVED,
          actionType: actionTypes.BASKET_LIMIT_REACHED,
          limitReached: false,
        },
      }])
    })

    test('should dispatch BASKET_LIMIT_REACHED, MENU_RECIPE_STOCK_CHANGE and BASKET_RECIPE_REMOVE when portion and recipe limit is reached', function () {
      getStateSpy = jest.fn().mockReturnValue({
        basket: Immutable.Map({
          recipes: Immutable.Map([['111', 1], ['222', 1], ['333', 1]]),
          numPortions: 2,
          limitReached: true,
        }),
        filters: Immutable.Map({
          currentCollectionId: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
          recipeGroup: {
            slug: 'test-food-brand'
          },
        }),
      })
      basketRecipeRemove('123')(dispatch, getStateSpy)

      expect(getStateSpy.mock.calls).toHaveLength(3)
      expect(dispatch.mock.calls).toHaveLength(4)

      expect(dispatch.mock.calls[0]).toEqual([{
        type: actionTypes.BASKET_RECIPE_REMOVE,
        recipeId: '123',
        trackingData: {
          actionType: 'Recipe Removed',
          recipeId: '123',
          view: undefined,
          position: undefined,
          collection: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
          source: 'test-food-brand',
          recipe_count: 2
        },
      }])

      expect(dispatch.mock.calls[1]).toEqual([{
        type: actionTypes.MENU_RECIPE_STOCK_CHANGE,
        stock: { 123: { 2: 1 } },
      }])

      expect(dispatch.mock.calls[2]).toEqual([{
        type: actionTypes.BASKET_LIMIT_REACHED,
        limitReached: false,
        trackingData: {
          view: undefined,
          source: actionTypes.RECIPE_REMOVED,
          actionType: actionTypes.BASKET_LIMIT_REACHED,
          limitReached: false,
        },
      }])
    })
  })
})
