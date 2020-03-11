import Immutable from 'immutable'
import basket from 'actions/basket'
import pricingActions from 'actions/pricing'
import { actionTypes } from 'actions/actionTypes'
import orderConfirmationActions from 'actions/orderConfirmation'
import { updateOrderItems } from 'apis/orders'
import utilsLogger from 'utils/logger'
import { push } from 'react-router-redux'
import config from 'config'

import * as basketUtils from 'utils/basket'
import * as trackingKeys from 'actions/trackingKeys'

jest.mock('utils/basket')

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

jest.mock('actions/orderConfirmation', () => ({
  orderConfirmationUpdateOrderTracking: jest.fn()
}))

describe('basket actions', () => {
  let dispatch = jest.fn()
  let getStateSpy = jest.fn()
  const {
    portionSizeSelectedTracking,
    basketCheckedOut, basketOrderItemsLoad,
    basketProceedToCheckout, basketRecipesInitialise,
    basketRecipeAdd, basketRecipeRemove,
    basketNumPortionChange, basketSlotChange } = basket

  beforeEach(() => {
    basketUtils.basketSumMock = jest.fn(() => false)
    basketUtils.okRecipes = jest.fn(recipes => recipes)
  })

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
          actionType: trackingKeys.selectPortionSize,
          num_portion,
          order_id: order_id || null,
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
      }),
      user: Immutable.fromJS({
        orders: {
          178: {
            recipeItems: [
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
        originalGrossTotal: '24.99',
        originalNetTotal: '24.99'
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
        }),
        user: Immutable.fromJS({
          orders: {
            178: {
              recipeItems: [
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
          originalGrossTotal: '24.99',
          originalNetTotal: '24.99'
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
        }),
        user: Immutable.fromJS({
          orders: {
            178: {
              recipeItems: [
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
          originalGrossTotal: '24.99',
          originalNetTotal: '24.99'
        })
      })
      await basketCheckedOut(2, 'grid')(dispatch, getState)
      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        trackingData: {
          actionType: trackingKeys.placeOrder,
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
        }),
        user: Immutable.fromJS({
          orders: {
            179: {
              recipeItems: []
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
          originalGrossTotal: '24.99',
          originalNetTotal: '24.99'
        })
      })
      await basketCheckedOut(2, 'grid')(dispatch, getState)
      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        trackingData: {
          actionType: trackingKeys.placeOrder,
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

    test('should dispatch  BASKET_CHECKOUT tracking', async () => {
      getState = () => ({
        auth: Immutable.Map({
          isAuthenticated: true,
        }),
        basket: Immutable.fromJS({
          orderId: '179',
        }),
        filters: Immutable.fromJS({
        }),
        user: Immutable.fromJS({
          orders: {
            179: {
              recipeItems: []
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
          originalGrossTotal: '24.99',
          originalNetTotal: '24.99'
        })
      })
      await basketCheckedOut(2, 'grid')(dispatch, getState)

      expect(dispatch.mock.calls[3][0]).toEqual({
        type: 'BASKET_CHECKOUT',
        trackingData: {
          actionType: trackingKeys.checkOutBasketAttempt,
          numRecipes: 2,
          view: 'grid',
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

    describe('when update is sucessful', () => {
      const order = {
        id: '23',
        products: [
          { id: 1, itemableId: 'product-1', quantity: 2 },
          { id: 2, itemableId: 'product-2', quantity: 1 },
        ],
      }

      updateOrderItems.mockReturnValue(Promise.resolve({ data: order }))

      test('should call updateOrderItems api with products', () => {
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
          .then(() => {
            expect(dispatch.mock.calls.length).toBe(8)
            expect(dispatch.mock.calls[0][0]).toEqual({
              type: actionTypes.PENDING,
              key: actionTypes.BASKET_CHECKOUT,
              value: true,
            })
            expect(dispatch.mock.calls[1][0]).toEqual({
              type: actionTypes.BASKET_CHECKOUT,
              trackingData: {
                actionType: trackingKeys.checkOutBasketAttempt,
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
          .then(() => {
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
          .then(() => {
            expect(dispatch.mock.calls.length).toBe(9)
            expect(orderConfirmationUpdateOrderTrackingSpy).toHaveBeenCalledTimes(1)
          })
          .then(done, done)
      })
    })

    describe('when it fails to update order', () => {
      let loggerErrorSpy
      beforeEach(() => {
        dispatch = jest.fn()
        updateOrderItems.mockReturnValue(Promise.reject(new Error({ e: 'Error' })))
        loggerErrorSpy = jest.spyOn(utilsLogger, 'error')
      })
      test('should put the error into the error store for BASKET_CHECKOUT', (done) => {
        basket.basketUpdateProducts()(dispatch, getStateSpy)
          .catch(() => {
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
      test('should log the error', (done) => {
        basket.basketUpdateProducts()(dispatch, getStateSpy)
          .catch(() => {
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
        }),
      })
    })

    test('should dispatch a BASKET_CHECKOUT_PROCEED tracking action', () => {
      basketProceedToCheckout()(dispatch, getState)
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: 'BASKET_CHECKOUT_PROCEED',
        trackingData: {
          actionType: trackingKeys.checkOutBasketComplete,
          basket: Immutable.fromJS({
            orderId: '179',
          }),
        },
      })
    })

    test('should proceed to choose plan if choosePlan feature is enabled', () => {
      getState = () => ({
        basket: Immutable.fromJS({
          orderId: '179',
        }),
        filters: Immutable.fromJS({
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

  describe('basketRecipeInitialise', () => {
    describe('given a basket with recipes already contained', () => {
      let recipes
      const pricingRequestAction = Symbol()

      beforeEach(() => {
        getStateSpy = jest.fn().mockReturnValue({
          basket: Immutable.Map({
            recipes: Immutable.Map([['123', 1]]),
            numPortions: 2,
            limitReached: false,
          })
        })

        basketUtils.naiveLimitReached = jest.fn(() => true)
        pricingActions.pricingRequest.mockReturnValue(pricingRequestAction)

        recipes = { 123: 1, 234: 2 }
      })

      describe('when `basketRecipesInitialise` action called', () => {
        beforeEach(() => {
          basketRecipesInitialise(recipes)(dispatch, getStateSpy)
        })

        test('then the state should have been retrieved', () => {
          expect(getStateSpy).toHaveBeenCalledTimes(1)
        })

        test('then the dispatch method should have been 3 times', () => {
          expect(dispatch).toHaveBeenCalledTimes(3)
        })

        test('then the `BASKET_RECIPES_INITIALISE` action should have been dispatched first', () => {
          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: actionTypes.BASKET_RECIPES_INITIALISE,
            recipes,
          })
        })

        test('then the `BASKET_LIMIT_REACHED` action should have been dipatched second', () => {
          expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: actionTypes.BASKET_LIMIT_REACHED,
            limitReached: true,
          })
        })

        test('then pricing action should have been dispatched third', () => {
          expect(dispatch).toHaveBeenNthCalledWith(3, pricingRequestAction)
        })
      })
    })
  })

  describe('basketRecipeAdd', () => {
    describe('given a non-full basket with recipes for 2 portions', () => {
      const pricingRequestAction = Symbol()

      beforeEach(() => {
        getStateSpy = jest.fn().mockReturnValue({
          basket: Immutable.Map({
            recipes: Immutable.Map([['123', 1]]),
            numPortions: 2,
            limitReached: false
          }),
          filters: Immutable.Map({
            currentCollectionId: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
            recipeGroup: {
              slug: 'test-food-brand'
            },
          }),
          menuRecipeStock: Immutable.fromJS({
            123: { 2: 30, 4: 10 },
            234: { 2: 0, 4: 10 },
          }),
          menuRecipes: Immutable.fromJS({
            123: {},
          })
        })

        basketUtils.limitReached = jest.fn(() => false)
        pricingActions.pricingRequest.mockReturnValue(pricingRequestAction)
      })

      describe('when call `basketRecipeAdd` with recipe already within the basket which is in stock', () => {
        beforeEach(() => {
          basketRecipeAdd('123', 'boxsummary', { position: '57' })(dispatch, getStateSpy)
        })

        test('then state should have been retrieved two times', () => {
          expect(getStateSpy).toHaveBeenCalledTimes(2)
        })

        test('then 3 actions should have been dispatched', () => {
          expect(dispatch).toHaveBeenCalledTimes(3)
        })

        test('then the `BASKET_RECIPE_ADD` action should have been dispatched first', () => {
          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: actionTypes.BASKET_RECIPE_ADD,
            recipeId: '123',
            position: '57',
            collection: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
            trackingData: {
              view: 'boxsummary',
              actionType: trackingKeys.addRecipe,
              recipeId: '123',
              position: '57',
              collection: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
              recipe_count: 2
            },
          })
        })

        test('then the `MENU_RECIPE_STOCK_CHANGE` should have been dispatched second', () => {
          expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: actionTypes.MENU_RECIPE_STOCK_CHANGE,
            stock: { 123: { 2: -1 } },
          })
        })

        test('then pricing action should have been dispatched third', () => {
          expect(dispatch).toHaveBeenNthCalledWith(3, pricingRequestAction)
        })
      })

      describe('when call `basketRecipeAdd` with recipe that is out of stock', () => {
        beforeEach(() => {
          basketRecipeAdd('234', 'healthkitchen', { position: '23' })(dispatch, getStateSpy)
        })

        test('then no actions should have been dispatched', () => {
          expect(dispatch).toHaveBeenCalledTimes(0)
        })
      })
    })

    describe('given a basket with one space for 4 portions', () => {
      const pricingRequestAction = Symbol()

      beforeEach(() => {
        getStateSpy = jest.fn().mockReturnValue({
          basket: Immutable.Map({
            recipes: Immutable.Map([['123', 1], ['234', 1]]),
            numPortions: 4,
            limitReached: false
          }),
          filters: Immutable.Map({
            currentCollectionId: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
            recipeGroup: {
              slug: 'test-food-brand'
            },
          }),
          menuRecipeStock: Immutable.fromJS({
            123: { 2: 30, 4: 10 },
            234: { 2: 10, 4: 10 },
          }),
          menuRecipes: Immutable.fromJS({
            123: {},
            234: {},
          })
        })

        basketUtils.limitReached = multiReturnMock([false, true])
        pricingActions.pricingRequest.mockReturnValue(pricingRequestAction)
      })

      describe('when call `basketRecipeAdd`', () => {
        beforeEach(() => {
          basketRecipeAdd('123', 'boxsummary', { position: '57' })(dispatch, getStateSpy)
        })

        test('then state should have been retrieved two times', () => {
          expect(getStateSpy).toHaveBeenCalledTimes(2)
        })

        test('then 4 actions should have been dispatched', () => {
          expect(dispatch).toHaveBeenCalledTimes(4)
        })

        test('then the `BASKET_RECIPE_ADD` action should have been dispatched first', () => {
          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: actionTypes.BASKET_RECIPE_ADD,
            recipeId: '123',
            position: '57',
            collection: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
            trackingData: {
              view: 'boxsummary',
              actionType: trackingKeys.addRecipe,
              recipeId: '123',
              position: '57',
              collection: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
              recipe_count: 3
            },
          })
        })

        test('then the `MENU_RECIPE_STOCK_CHANGE` should have been dispatched second', () => {
          expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: actionTypes.MENU_RECIPE_STOCK_CHANGE,
            stock: { 123: { 4: -1 } },
          })
        })

        test('then the `BASKET_LIMIT_REACHED` should have been dispatched third', () => {
          expect(dispatch).toHaveBeenNthCalledWith(3, {
            type: actionTypes.BASKET_LIMIT_REACHED,
            limitReached: true,
            trackingData: {
              actionType: trackingKeys.basketLimit,
              limitReached: true,
              view: 'boxsummary',
              source: actionTypes.RECIPE_ADDED,
            }
          })
        })

        test('then pricing action should have been dispatched fourth', () => {
          expect(dispatch).toHaveBeenNthCalledWith(4, pricingRequestAction)
        })
      })
    })

    describe('given a full basket', () => {
      beforeEach(() => {
        getStateSpy = jest.fn().mockReturnValue({
          basket: Immutable.Map({
            recipes: Immutable.Map([['123', 1], ['234', 2], ['345', 1]]),
            numPortions: 2,
            limitReached: true
          }),
          filters: Immutable.Map({
            currentCollectionId: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
            recipeGroup: {
              slug: 'test-food-brand'
            },
          }),
          menuRecipeStock: Immutable.fromJS({
            123: { 2: 30, 4: 10 },
            234: { 2: 10, 4: 10 },
            345: { 2: 10, 4: 10 },
          }),
          menuRecipes: Immutable.fromJS({
            123: {},
            234: {},
            345: {},
          })
        })

        basketUtils.limitReached = jest.fn(() => true)
      })

      describe('when call  `basketRecipeAdd`', () => {
        beforeEach(() => {
          basketRecipeAdd('123', 'boxsummary', { position: '57' })(dispatch, getStateSpy)
        })

        test('then no actions should have been dispatched', () => {
          expect(dispatch).toHaveBeenCalledTimes(0)
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
        }),
      })

      basketUtils.limitReached = jest.fn(() => false)
    })
    test('should dispatch BASKET_LIMIT_REACHED, MENU_RECIPE_STOCK_CHANGE and BASKET_RECIPE_REMOVE action types with correct recipe id and limit reached', () => {
      basketRecipeRemove('123')(dispatch, getStateSpy)

      expect(getStateSpy.mock.calls).toHaveLength(3)
      expect(dispatch.mock.calls).toHaveLength(4)

      expect(dispatch.mock.calls[0]).toEqual([{
        type: actionTypes.BASKET_RECIPE_REMOVE,
        recipeId: '123',
        trackingData: {
          actionType: trackingKeys.removeRecipe,
          recipeId: '123',
          view: undefined,
          position: undefined,
          collection: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
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
          actionType: trackingKeys.basketLimit,
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

    test('should map through the given view argument through to trackingData', () => {
      basketRecipeRemove('123', 'boxsummary')(dispatch, getStateSpy)

      expect(getStateSpy.mock.calls).toHaveLength(3)
      expect(dispatch.mock.calls).toHaveLength(4)

      expect(dispatch.mock.calls[0]).toEqual([{
        type: actionTypes.BASKET_RECIPE_REMOVE,
        recipeId: '123',
        trackingData: {
          actionType: trackingKeys.removeRecipe,
          recipeId: '123',
          view: 'boxsummary',
          position: undefined,
          collection: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
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
          actionType: trackingKeys.basketLimit,
          limitReached: false,
        },
      }])
    })

    test('should dispatch BASKET_LIMIT_REACHED, MENU_RECIPE_STOCK_CHANGE and BASKET_RECIPE_REMOVE when portion and recipe limit is reached', () => {
      getStateSpy = jest.fn().mockReturnValue({
        basket: Immutable.Map({
          recipes: Immutable.Map([['111', 1], ['222', 1], ['333', 1]]),
          numPortions: 2,
          limitReached: true,
        }),
        filters: Immutable.Map({
          currentCollectionId: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
        }),
      })
      basketRecipeRemove('123')(dispatch, getStateSpy)

      expect(getStateSpy.mock.calls).toHaveLength(3)
      expect(dispatch.mock.calls).toHaveLength(4)

      expect(dispatch.mock.calls[0]).toEqual([{
        type: actionTypes.BASKET_RECIPE_REMOVE,
        recipeId: '123',
        trackingData: {
          actionType: trackingKeys.removeRecipe,
          recipeId: '123',
          view: undefined,
          position: undefined,
          collection: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
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
          actionType: trackingKeys.basketLimit,
          limitReached: false,
        },
      }])
    })
  })

  describe('basketSlotChange', () => {
    const pricingRequestAction = Symbol()

    beforeEach(() => {
      getStateSpy = jest.fn().mockReturnValue({
        basket: Immutable.Map({
          date: '2020-02-13',
        }),
        boxSummaryDeliveryDays: Immutable.Map({
          '2020-02-13': Immutable.Map({
            id: 123
          })
        }),
        user: Immutable.fromJS({
          orders: {
            12345: {
              id: '12345',
              deliveryDate: '2020-02-13 08:00:00'
            },
            12305: {
              id: '12305',
              deliveryDate: '2020-02-28 08:00:00'
            }
          }
        })
      })
      pricingActions.pricingRequest.mockReturnValue(pricingRequestAction)
    })

    test('should dispatch BASKET_SLOT_CHANGE', () => {
      const slotId = 'slot-1-day-1'
      basketSlotChange(slotId)(dispatch, getStateSpy)
      const expectedResult = {
        type: 'BASKET_SLOT_CHANGE',
        slotId: 'slot-1-day-1',
        trackingData: {
          actionType: trackingKeys.changeBasketSlot,
          date: '2020-02-13',
          dayId: 123,
          slotId: 'slot-1-day-1',
        },
      }
      expect(dispatch).toHaveBeenNthCalledWith(1, expectedResult)
    })

    test('should dispatch pricingRequestAction', () => {
      const slotId = 'slot-1-day-1'
      basketSlotChange(slotId)(dispatch, getStateSpy)
      expect(dispatch).toHaveBeenNthCalledWith(3, pricingRequestAction)
    })

    test('should dispatch pricingRequestAction', () => {
      const slotId = 'slot-1-day-1'
      basketSlotChange(slotId)(dispatch, getStateSpy)
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: actionTypes.BASKET_ID_CHANGE,
        orderId: '12345'
      })
    })
  })
})

const multiReturnMock = (array) => {
  const reversedArray = (array || []).reverse()

  return jest.fn(() => reversedArray.pop())
}
