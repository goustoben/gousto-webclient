import Immutable from 'immutable'
import basket from 'actions/basket'
import pricingActions from 'actions/pricing'
import { actionTypes } from 'actions/actionTypes'
import * as orderConfirmationActions from 'actions/orderConfirmation'
import * as menuActions from 'actions/menu'
import { updateOrderItems } from 'apis/orders'
import utilsLogger from 'utils/logger'
import { push } from 'react-router-redux'
import config from 'config'
import { safeJestMock, returnArgumentsFromMock } from '_testing/mocks'

import * as basketUtils from 'utils/basket'
import * as trackingKeys from 'actions/trackingKeys'
import * as basketRecipesActions from '../../routes/Menu/actions/basketRecipes'
import * as trackingActions from '../tracking'
import { basketReset } from '../basket'

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

const menuLoadMenu = safeJestMock(menuActions, 'menuLoadMenu')
returnArgumentsFromMock(menuLoadMenu, 'menuLoadMenu')

const menuLoadStock = safeJestMock(menuActions, 'menuLoadStock')
returnArgumentsFromMock(menuLoadStock, 'menuLoadStock')

const trackingOrderCheckout = safeJestMock(trackingActions, 'trackingOrderCheckout')
returnArgumentsFromMock(trackingOrderCheckout, 'trackingOrderCheckout')

describe('basket actions', () => {
  let dispatch = jest.fn()
  let getStateSpy = jest.fn()
  const {
    portionSizeSelectedTracking,
    basketCheckedOut, basketCheckoutClicked, basketOrderItemsLoad,
    basketProceedToCheckout, basketRecipesInitialise,
    basketPostcodeChange,
    basketNumPortionChange, basketSlotChange, basketOrderLoaded } = basket

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('basketOrderLoaded', () => {
    const getState = jest.fn()
    beforeEach(() => {
      getState.mockReturnValue({
        basket: Immutable.fromJS({
          recipes: []
        })
      })
    })
    test('should dispatch BASKET_ORDER_LOADED', () => {
      const orderId = '123'
      basketOrderLoaded(orderId)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.BASKET_ORDER_LOADED,
        orderId,
        editBox: false,
      })
    })
  })

  describe('basketCheckoutClicked', () => {
    test('basketCheckoutClicked should dispatch BASKET_CHECKOUT_CLICKED', async () => {
      const getState = () => ({
        tracking: Immutable.fromJS({}),
        basket: Immutable.fromJS({
          promoCode: 'test-promo-code',
          recipes: {
            1122: 1,
            1334: 3,
          }
        }),
      })

      const section = trackingKeys.boxSummary
      const trackingData = {
        type: actionTypes.BASKET_CHECKOUT_CLICKED,
        trackingData: {
          actionType: trackingKeys.clickCheckout,
          promoCode: 'test-promo-code',
          section,
          recipes: Immutable.Map({
            1122: 1,
            1334: 3,
          })
        },
      }
      await basketCheckoutClicked(section)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith(trackingData)
    })
  })

  describe('portionSizeSelectedTracking', () => {
    test('should dispatch a PORTION_SIZE_SELECTED_TRACKING action with the correct tracking params', async () => {
      const numPortion = 2
      const orderId = 5
      const numPortionChangeTracking = {
        type: actionTypes.PORTION_SIZE_SELECTED_TRACKING,
        trackingData: {
          actionType: trackingKeys.selectPortionSize,
          num_portion: numPortion,
          order_id: orderId || null,
        },
      }
      await portionSizeSelectedTracking(numPortion, orderId)(dispatch)

      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith(numPortionChangeTracking)
    })
  })

  describe('basketNumPortionChange', () => {
    getStateSpy.mockReturnValue({
      routing: { locationBeforeTransitions: { query: null } },
      tracking: Immutable.fromJS({
        utmSource: null,
      }),
      basket: Immutable.fromJS({
        promoCode: 'test-promo-code',
      }),
    })

    test('should dispatch a pricing pricingRequest action', async () => {
      const pricingRequestResponse = Symbol('Pricing request')
      pricingActions.pricingRequest.mockReturnValue(pricingRequestResponse)

      await basketNumPortionChange(2)(dispatch, getStateSpy)

      expect(dispatch).toHaveBeenCalledWith(pricingRequestResponse)
    })

    test('should dispatch box size changed action', async () => {
      await basketNumPortionChange(4)(dispatch, getStateSpy)
      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.BOX_SIZE_CHANGED_TRACKING,
        trackingData: {
          actionType: trackingKeys.selectBoxSize,
          boxSize: '4 people',
          promoCode: 'test-promo-code'
        },
      })
    })
  })

  describe('basketPostcodeChange', () => {
    beforeEach(() => {
      getStateSpy.mockReturnValue({
        tracking: Immutable.fromJS({
          utmSource: null,
        }),
        basket: Immutable.fromJS({
          promoCode: 'test-promo-code',
        }),
      })
    })

    test('should dispatch BASKET_SELECT_POSTCODE', async () => {
      const postcode = 'W37UP'
      await basketPostcodeChange(postcode)(dispatch, getStateSpy)
      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.BASKET_SELECT_POSTCODE,
        trackingData: {
          actionType: trackingKeys.selectPostcode,
          promoCode: 'test-promo-code',
          postcode
        }
      })
    })
  })

  describe('basketCheckedOut', () => {
    let getState
    beforeEach(() => {
      getState = () => ({
        auth: Immutable.Map({
          isAuthenticated: true,
        })
      })
    })

    test('should dispatch  BASKET_CHECKOUT tracking', async () => {
      await basketCheckedOut(2, 'grid')(dispatch, getState)

      expect(dispatch.mock.calls[2][0]).toEqual({
        type: 'BASKET_CHECKOUT',
        trackingData: {
          actionType: trackingKeys.checkOutBasketAttempt,
          numRecipes: 2,
          view: 'grid',
        },
      })
    })

    test('should dispatch trackingOrderCheckout', async () => {
      await basketCheckedOut(2, 'grid')(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith(trackingOrderCheckout())
    })
  })

  describe('basketOrderItemsLoad', () => {
    let basketProductAddSpy
    let basketRecipeAddSpy
    let basketGiftAddSpy
    beforeEach(() => {
      getStateSpy = () => ({
        tracking: Immutable.fromJS({
          utmSource: null,
        }),
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
      basketRecipeAddSpy = safeJestMock(basketRecipesActions, 'basketRecipeAdd')
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
      expect(basketRecipeAddSpy.mock.calls[0]).toEqual(['r1', null, undefined, undefined, '123'])
      expect(basketRecipeAddSpy.mock.calls[1]).toEqual(['r2', null, undefined, undefined, '123'])
      expect(basketRecipeAddSpy.mock.calls[2]).toEqual(['r2', null, undefined, undefined, '123'])
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
      const pricingRequestAction = Symbol('Pricing request')

      beforeEach(() => {
        getStateSpy = jest.fn().mockReturnValue({
          basket: Immutable.Map({
            recipes: Immutable.Map([['123', 1]]),
            numPortions: 2,
            limitReached: false,
          })
        })

        jest.spyOn(basketUtils, 'naiveLimitReached').mockReturnValue(true)
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

  describe('basketSlotChange', () => {
    const pricingRequestAction = Symbol('Pricing request')
    describe('when slot contains default slot', () => {
      beforeEach(() => {
        getStateSpy = jest.fn().mockReturnValue({
          tracking: Immutable.fromJS({
            utmSource: null,
          }),
          basket: Immutable.Map({
            date: '2020-02-13',
            promoCode: 'test-promo-code',
            numPortions: 2,
          }),
          boxSummaryDeliveryDays: Immutable.Map({
            '2020-02-13': Immutable.Map({
              id: 123,
              isDefault: true,
              slots: Immutable.List([Immutable.Map({
                isDefault: true,
                id: 'slot-1-day-1',
              })])
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

      test('should dispatch BASKET_SELECT_DELIVERY_SLOT', () => {
        const slotId = 'slot-1-day-1'
        basketSlotChange(slotId)(dispatch, getStateSpy)
        expect(dispatch).toHaveBeenNthCalledWith(4, {
          type: actionTypes.BASKET_SELECT_DELIVERY_SLOT,
          trackingData: {
            actionType: trackingKeys.selectDeliverySlot,
            promoCode: 'test-promo-code',
            deliverySlot: 'default'
          },
        })
      })
    })
    describe('when slots is empty', () => {
      beforeEach(() => {
        getStateSpy = jest.fn().mockReturnValue({
          tracking: Immutable.fromJS({
            utmSource: null,
          }),
          basket: Immutable.Map({
            date: '2020-02-13',
            promoCode: 'test-promo-code',
            numPortions: 2,
          }),
          boxSummaryDeliveryDays: Immutable.Map({
            '2020-02-13': Immutable.Map({
              id: 123,
              isDefault: true,
              slots: Immutable.List()
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

      test('should not dispatch BASKET_SELECT_DELIVERY_SLOT', () => {
        const slotId = 'slot-1-day-1'
        basketSlotChange(slotId)(dispatch, getStateSpy)
        expect(dispatch).not.toHaveBeenNthCalledWith(4, {
          type: actionTypes.BASKET_SELECT_DELIVERY_SLOT,
          trackingData: {
            actionType: trackingKeys.selectDeliverySlot,
            promoCode: 'test-promo-code',
            deliverySlot: 'default'
          },
        })
      })
    })
  })

  describe('basketReset', () => {
    describe('when chosenAddress is not set', () => {
      test('should return the correct action', () => {
        const result = basketReset()

        expect(result).toEqual({
          type: actionTypes.BASKET_RESET,
          payload: {
            chosenAddress: null
          }
        })
      })
    })

    describe('when chosenAddress is set', () => {
      test('should return the correct action', () => {
        const address = { id: '12345' }
        const result = basketReset(address)

        expect(result).toEqual({
          type: actionTypes.BASKET_RESET,
          payload: {
            chosenAddress: address
          }
        })
      })
    })
  })

  describe('basketRestorePreviousValues', () => {
    let state
    beforeEach(() => {
      dispatch = jest.fn()
      state = {
        basket: Immutable.fromJS({
          prevSlotId: '1ab-3esd',
          slotId: '',
          prevPostcode: 'W140EE',
          postcode: '',
          prevAddress: { id: '12345' },
          address: null
        })
      }
      getStateSpy = jest.fn().mockReturnValue(state)
    })

    test('should dispatch BASKET_SLOT_CHANGE', () => {
      basket.basketRestorePreviousValues()(dispatch, getStateSpy)
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: 'BASKET_SLOT_CHANGE',
        slotId: '1ab-3esd',
      })
    })

    test('should dispatch BASKET_POSTCODE_CHANGE', () => {
      basket.basketRestorePreviousValues()(dispatch, getStateSpy)
      expect(dispatch.mock.calls[1][0]).toEqual({
        type: 'BASKET_POSTCODE_CHANGE',
        postcode: 'W140EE',
      })
    })

    test('should dispatch BASKET_ADDRESS_CHANGE', () => {
      basket.basketRestorePreviousValues()(dispatch, getStateSpy)
      expect(dispatch.mock.calls[2][0]).toEqual({
        type: 'BASKET_ADDRESS_CHANGE',
        address: Immutable.Map({ id: '12345' }),
      })
    })
  })

  describe('basketRestorePreviousDate', () => {
    beforeEach(() => {
      dispatch = jest.fn()
      getStateSpy = jest.fn().mockReturnValue({
        basket: Immutable.fromJS({
          prevSlotId: 'slot-124',
          numPortions: 2,
          prevDate: '2020-03-30'
        }),
        boxSummaryDeliveryDays: Immutable.Map({
          '2020-02-13': Immutable.Map({
            id: 123,
            isDefault: true,
            slots: [Immutable.Map({
              isDefault: true,
              id: 'slot-1-day-1',
              whenCutoff: '2020-03-27T11:59:59+01:00'
            })]

          })
        }),
        menuService: {
          data: [
            { id: '123',
              ends_at: '2020-04-03T11:59:59+01:00'
            }
          ]
        }
      })
    })

    test('should dispatch BASKET_DATE_CHANGE', () => {
      basket.basketRestorePreviousDate()(dispatch, getStateSpy)
      expect( dispatch.mock.calls[0][0]).toEqual({
        type: actionTypes.BASKET_DATE_CHANGE,
        date: '2020-03-30',
      })
    })

    test('should dispatch BASKET_SLOT_CHANGE', () => {
      basket.basketRestorePreviousDate()(dispatch, getStateSpy)
      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.BASKET_SLOT_CHANGE,
        slotId: 'slot-124',
      })
    })

    test('should dispatch TRACKING_UNDO_DELIVERY_OPTIONS_CHANGE', () => {
      basket.basketRestorePreviousDate()(dispatch, getStateSpy)
      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.TRACKING_UNDO_DELIVERY_OPTIONS_CHANGE,
        trackingData: {
          actionType: 'undo_delivery_options_change',
        }
      })
    })
  })

  describe('basketDateChange', () => {
    beforeEach(() => {
      dispatch = jest.fn()
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    test('should dispatch BASKET_DATE_CHANGE with right date', () => {
      const date = '2020-05-02 00:00:00'
      const result = basket.basketDateChange(date)
      expect(result).toEqual({
        date: '2020-05-02 00:00:00',
        type: 'BASKET_DATE_CHANGE'
      })
    })
  })
})
