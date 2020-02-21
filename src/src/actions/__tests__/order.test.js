import Immutable from 'immutable'

import { fetchDeliveryDays } from 'apis/deliveries'
import {
  saveOrder,
  fetchOrder,
  cancelOrder,
  checkoutOrder,
  updateOrderItems,
  updateOrderAddress,
} from 'apis/orders'
import actionStatus from 'actions/status'
import { actionTypes } from 'actions/actionTypes'
import { getOrderDetails } from 'utils/basket'
import * as deliveriesUtils from 'utils/deliveries'
import { trackAffiliatePurchase } from 'actions/tracking'
import { saveUserOrder, updateUserOrder } from 'apis/user'
import { orderConfirmationRedirect } from 'actions/orderConfirmation'
import { orderAddOnRedirect } from 'actions/orderAddOn'

import {
  trackOrder,
  orderUpdate,
  orderCheckout,
  orderAssignToUser,
  orderUpdateProducts,
  orderHasAnyProducts,
  orderGetDeliveryDays,
  orderUpdateDayAndSlot,
  clearUpdateDateErrorAndPending,
  orderAddressChange,
} from 'actions/order'

jest.mock('apis/user')
jest.mock('apis/orders')
jest.mock('utils/basket')
jest.mock('actions/status')
jest.mock('actions/tracking')
jest.mock('actions/orderConfirmation')
jest.mock('actions/orderAddOn')
jest.mock('utils/logger', () => ({
  error: jest.fn()
}))

jest.mock('config/order', () => ({
  orderTrackingActions: {
    'action-no-affiliate': {
      actionType: 'A_TEST_ACTION',
      trackAffiliate: false,
    },
    'affiliate-no-action': {
      actionType: '',
      trackAffiliate: true,
    },
  }
}))

jest.mock('apis/deliveries', () => ({
  fetchDeliveryDays: jest.fn().mockReturnValue({
    data: [
      { id: 1 },
    ]
  })
}))

deliveriesUtils.getSlot = jest.fn()
deliveriesUtils.getAvailableDeliveryDays = jest.fn()
deliveriesUtils.transformDaySlotLeadTimesToMockSlots = jest.fn()

const { pending, error } = actionStatus

describe('order actions', () => {
  let orderId
  let recipes
  let coreDayId
  let coreSlotId
  let numPortions
  let orderAction
  let dispatch
  const getState = jest.fn()

  beforeEach(() => {
    orderId = '12345'
    recipes = [1, 2, 3, 4, 5]
    coreDayId = 3
    coreSlotId = 8
    numPortions = 3
    orderAction = 'transaction'
    dispatch = jest.fn()
    fetchOrder.mockClear()
    getState.mockReturnValue({
      auth: Immutable.Map({ accessToken: 'access-token' }),
      features: Immutable.Map({
        orderConfirmation: Immutable.Map({
          value: false,
        })
      }),
      basket: Immutable.Map({
        date: '2019-10-11',
        slotId: '4'
      }),
    })

    deliveriesUtils.getSlot.mockReturnValue(Immutable.fromJS({
      coreSlotId: '4',
      id: 'deliveries-uuid',
      daySlotLeadTimeId: 'day-slot-lead-time-uuid'
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('trackOrder', () => {
    beforeEach(() => {
      getState.mockReturnValue({
        basket: Immutable.Map({
          promoCode: 'B4SK3T-ST4T3-PR0M0',
        })
      })
    })

    describe('when the orderTrackingAction does not have an actionType', () => {
      test('should not take any action', () => {
        trackOrder('test', {})(dispatch, getState)

        expect(getState).not.toHaveBeenCalled()
        expect(dispatch).not.toHaveBeenCalled()
        expect(trackAffiliatePurchase).not.toHaveBeenCalled()
      })
    })

    describe('when the orderTrackingAction contains an actionType', () => {
      const order = {
        id: '735702932',
        prices: {
          total: 31.99,
          promo_code: '',
        }
      }

      describe('if affiliate is not configured to track', () => {
        test('should not dispatch an affiliate tracking action', () => {
          trackOrder('action-no-affiliate', order)(dispatch, getState)

          expect(getState).not.toHaveBeenCalled()
          expect(dispatch).toHaveBeenCalled()
          expect(trackAffiliatePurchase).not.toHaveBeenCalled()
        })
      })

      describe('if affiliate is configured to track', () => {
        test('should dispatch an affiliate tracking action', () => {
          trackOrder('affiliate-no-action', order)(dispatch, getState)

          expect(getState).toHaveBeenCalled()
          expect(dispatch).not.toHaveBeenCalled()
          expect(trackAffiliatePurchase).toHaveBeenCalledWith({
            orderId: '735702932',
            total: 31.99,
            promoCode: 'B4SK3T-ST4T3-PR0M0',
            commissionGroup: 'EXISTING',
          })
        })
      })

      describe('if no action type is configured', () => {
        test('should not dispatch an affiliate tracking action', () => {
          trackOrder('affiliate-no-action', order)(dispatch, getState)

          expect(getState).toHaveBeenCalled()
          expect(dispatch).not.toHaveBeenCalled()
          expect(trackAffiliatePurchase).toHaveBeenCalled()
        })
      })

      describe('if an action type is configured', () => {
        test('should not dispatch an affiliate tracking action', () => {
          trackOrder('action-no-affiliate', order)(dispatch, getState)

          expect(getState).not.toHaveBeenCalled()
          expect(trackAffiliatePurchase).not.toHaveBeenCalled()
          expect(dispatch).toHaveBeenCalledWith({
            type: 'A_TEST_ACTION',
            order: {
              id: '735702932',
              prices: {
                promo_code: '',
                total: 31.99,
              }
            },
          })
        })
      })
    })
  })

  describe('orderUpdate', () => {
    test('should mark ORDER_SAVE as pending', async () => {
      saveOrder.mockImplementation(jest.fn().mockReturnValueOnce(
        new Promise((resolve) => { resolve(resolve) })
      ))
      await orderUpdate(orderId, recipes, coreDayId, coreSlotId, numPortions, orderAction)(dispatch, getState)

      expect(pending).toHaveBeenCalledTimes(2)
      expect(pending).toHaveBeenNthCalledWith(1, 'ORDER_SAVE', true)
      expect(pending).toHaveBeenNthCalledWith(2, 'ORDER_SAVE', false)
    })

    test('should mark ORDER_SAVE as errored if it errors', async () => {
      const err = new Error('oops')
      saveOrder.mockImplementation(jest.fn().mockReturnValueOnce(
        new Promise((resolve, reject) => { reject(err) })
      ))
      await orderUpdate(orderId, recipes, coreDayId, coreSlotId, numPortions, orderAction)(dispatch, getState)

      expect(pending).toHaveBeenCalledTimes(3)
      expect(pending).toHaveBeenNthCalledWith(1, 'ORDER_SAVE', true)
      expect(pending).toHaveBeenNthCalledWith(2, 'BASKET_CHECKOUT', false)
      expect(pending).toHaveBeenNthCalledWith(3, 'ORDER_SAVE', false)

      expect(error).toHaveBeenCalledTimes(2)
      expect(error).toHaveBeenNthCalledWith(1, 'ORDER_SAVE', null)
      expect(error).toHaveBeenNthCalledWith(2, 'ORDER_SAVE', err.message)
      expect(dispatch.mock.calls.length).toEqual(5)
    })

    test('should map the arguments through to saveOrder correctly', async () => {
      const order = {
        recipe_choices: [
          { id: 1, type: 'Recipe', quantity: 3 },
          { id: 2, type: 'Recipe', quantity: 3 },
          { id: 3, type: 'Recipe', quantity: 3 },
          { id: 4, type: 'Recipe', quantity: 3 },
          { id: 5, type: 'Recipe', quantity: 3 },
        ],
        order_action: 'transaction',
        delivery_slot_id: 8,
        delivery_day_id: 3,
        day_slot_lead_time_id: 'day-slot-lead-time-uuid'
      }

      await orderUpdate(orderId, recipes, coreDayId, coreSlotId, numPortions, orderAction)(dispatch, getState)

      expect(saveOrder).toHaveBeenCalledTimes(1)
      expect(saveOrder).toHaveBeenCalledWith('access-token', '12345', order)
    })

    test('should redirect the user to the order summary page if it succeeds', async () => {
      orderAction = 'something'
      saveOrder.mockImplementation(jest.fn().mockReturnValueOnce(
        new Promise((resolve) => { resolve({ data: { id: '5678' } }) })
      ))
      await orderUpdate(orderId, recipes, coreDayId, coreSlotId, numPortions, orderAction)(dispatch, getState)

      expect(orderConfirmationRedirect).toHaveBeenCalledWith(
        '5678',
        'something',
      )
    })

    describe('when addOnsBeforeOrderConfirmation feature flag is on', () => {
      beforeEach(() => {
        getState.mockReturnValue({
          auth: Immutable.Map({ accessToken: 'access-token' }),
          features: Immutable.Map({
            addOnsBeforeOrderConfirmation: Immutable.Map({
              value: true,
            })
          }),
          basket: Immutable.Map({
            date: '2019-10-11',
            slotId: '4'
          }),
        })
      })

      test('should redirect the user the add ons page if it succeeds', async () => {
        orderAction = 'something'
        saveOrder.mockImplementation(jest.fn().mockReturnValueOnce(
          new Promise((resolve) => { resolve({ data: { id: '5678' } }) })
        ))
        await orderUpdate(orderId, recipes, coreDayId, coreSlotId, numPortions, orderAction)(dispatch, getState)

        expect(orderAddOnRedirect).toHaveBeenCalledWith(
          '5678',
          'something',
        )
      })
    })
  })

  describe('orderCheckout', () => {
    const checkoutOrderApiParams = {
      addressId: 'address-id',
      postcode: 'N1',
      numPortions: 3,
      promoCode: '',
      orderId: '',
      deliveryDayId: 'delivery-id',
      slotId: 'slot-id',
      orderAction: 'order-action',
      disallowRedirectToSummary: true,
      recipes: ['recipe-id-1', 'recipe-id-2'],
    }

    window.location.assign = jest.fn()

    test('api is being called correctly', async () => {
      await orderCheckout(checkoutOrderApiParams)(dispatch, getState)

      expect(checkoutOrder).toHaveBeenCalledWith('access-token', {
        address_id: 'address-id',
        deliverypostcode: 'N1',
        num_portions: 3,
        promocode: '',
        order_id: '',
        delivery_day_id: 'delivery-id',
        delivery_slot_id: 'slot-id',
        order_action: 'order-action',
        disallow_redirect_to_summary: true,
        recipes: ['recipe-id-1', 'recipe-id-2']
      })

      expect(pending).toHaveBeenNthCalledWith(2, 'ORDER_CHECKOUT', false)
      expect(error).toHaveBeenNthCalledWith(1, 'ORDER_CHECKOUT', null)
    })

    test('status is set to pending and no error', async () => {
      await orderCheckout(checkoutOrderApiParams)(dispatch, getState)

      expect(pending).toHaveBeenCalledTimes(2)
      expect(pending).toHaveBeenNthCalledWith(1, 'ORDER_CHECKOUT', true)
      expect(error).toHaveBeenNthCalledWith(1, 'ORDER_CHECKOUT', null)
    })

    test('returns an order ID and url', async () => {
      checkoutOrder.mockResolvedValueOnce({
        data: {
          orderId: '123',
          url: 'summary-url',
        }
      })

      const result = await orderCheckout(
        checkoutOrderApiParams
      )(dispatch, getState)

      expect(error).toHaveBeenNthCalledWith(1, 'ORDER_CHECKOUT', null)

      expect(result).toEqual({
        orderId: '123',
        url: 'summary-url',
      })
    })

    test('api throws an error', async () => {
      checkoutOrder.mockRejectedValueOnce({
        status: 'error',
        message: 'error api',
      })

      await orderCheckout(checkoutOrderApiParams)(dispatch, getState)

      expect(error).toHaveBeenNthCalledWith(2, 'ORDER_CHECKOUT', 'error api')
      expect(pending).toHaveBeenNthCalledWith(2, 'ORDER_CHECKOUT', false)
    })

    test('throw an error when orderId is not present in the response', async () => {
      checkoutOrder.mockResolvedValueOnce({
        data: {
          orderId: '',
          url: 'summary-url',
        }
      })

      await orderCheckout(
        checkoutOrderApiParams
      )(dispatch, getState)

      expect(error).toHaveBeenNthCalledWith(2, 'ORDER_CHECKOUT', 'Error when saving the order')
    })

    test('throw an error when url is not present in the response', async () => {
      checkoutOrder.mockResolvedValueOnce({
        data: {
          orderId: 'order-id',
          url: '',
        }
      })

      await orderCheckout(
        checkoutOrderApiParams
      )(dispatch, getState)

      expect(error).toHaveBeenNthCalledWith(2, 'ORDER_CHECKOUT', 'Error when saving the order')
    })

    test('redirect is called when redirected parameter is set to true', async () => {
      checkoutOrder.mockRejectedValueOnce({
        status: 'error',
        message: 'error api',
        url: 'redirect-url',
        redirected: true,
      })

      await orderCheckout(
        checkoutOrderApiParams
      )(dispatch, getState)

      expect(window.location.assign).toHaveBeenCalledWith('redirect-url')
    })

    test('redirect is not called when redirected parameter is not set', async () => {
      checkoutOrder.mockRejectedValueOnce({
        status: 'error',
        message: 'error api',
      })

      await orderCheckout(checkoutOrderApiParams)(dispatch, getState)

      expect(window.location.assign).toHaveBeenCalledTimes(0)
    })
  })

  describe('orderUpdateProducts', () => {
    test('api function is called with correct parameters', async () => {
      const itemChoices = [
        { id: 'df0ddd72-beb3-11e5-8432-02fada0dd3b9', quantity: 1, type: 'Product' },
        { id: 'd533155a-7c4f-11e7-b81e-02e92c52d95a', quantity: 2, type: 'Product' }
      ]
      await orderUpdateProducts(orderId, itemChoices)(dispatch, getState)

      expect(updateOrderItems).toHaveBeenCalledWith(
        'access-token',
        orderId,
        { item_choices: itemChoices, restrict: 'Product' }
      )
    })

    test('when the api call succeeds it dispatches an action', async () => {
      await orderUpdateProducts(orderId)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.ORDER_UPDATE_PRODUCTS
      })
    })

    test('when the api call errors it dispatches the error in an action', async () => {
      updateOrderItems.mockRejectedValue('error')
      await orderUpdateProducts(orderId)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.ORDER_UPDATE_PRODUCTS,
        error: 'error',
      })
    })
  })

  describe('orderHasAnyProducts', () => {
    test('api function is called with correct parameters', async () => {
      await orderHasAnyProducts(orderId)(dispatch, getState)

      expect(fetchOrder).toHaveBeenCalledWith(
        'access-token',
        orderId
      )
    })

    test('when the order has a product, it dispatches true in an action', async () => {
      const fetchOrderResult = {
        data: {
          productItems: [],
        },
      }
      fetchOrder.mockResolvedValue(fetchOrderResult)
      await orderHasAnyProducts(orderId)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.ORDER_HAS_ANY_PRODUCTS,
        hasProducts: false
      })
    })

    test('when the order has a product, it dispatches true in an action', async () => {
      const fetchOrderResult = {
        data: {
          productItems: ['1', '2', '3'],
        },
      }
      fetchOrder.mockResolvedValue(fetchOrderResult)
      await orderHasAnyProducts(orderId)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.ORDER_HAS_ANY_PRODUCTS,
        hasProducts: true
      })
    })

    test('when the orderId is not empty, null or undefined, it dispatches an error in an action', async () => {
      const errorAction = {
        type: actionTypes.ORDER_HAS_ANY_PRODUCTS,
        error: new Error('missing orderId')
      }
      await orderHasAnyProducts('')(dispatch, getState)
      await orderHasAnyProducts(null)(dispatch, getState)
      await orderHasAnyProducts()(dispatch, getState)

      expect(dispatch).toHaveBeenNthCalledWith(1, errorAction)
      expect(dispatch).toHaveBeenNthCalledWith(2, errorAction)
      expect(dispatch).toHaveBeenNthCalledWith(3, errorAction)
      expect(fetchOrder).not.toHaveBeenCalled()
    })

    test('when the api call throws an error, it dispatches the error in an action', async () => {
      fetchOrder.mockRejectedValue('error')
      await orderHasAnyProducts(orderId)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.ORDER_HAS_ANY_PRODUCTS,
        error: 'error',
      })
    })
  })

  describe('orderAssignToUser', () => {
    beforeEach(() => {
      recipes = [1, 2, 3, 4, 5]
      saveOrder.mockImplementation(jest.fn().mockReturnValue(
        new Promise((resolve) => { resolve({ data: { id: '5678' } }) })
      ))
      cancelOrder.mockImplementation(jest.fn().mockReturnValue(
        new Promise((resolve) => { resolve() })
      ))
      updateOrderAddress.mockImplementation(jest.fn().mockReturnValue(
        new Promise((resolve) => { resolve() })
      ))
      getOrderDetails.mockReturnValue({
        recipe_choices: recipes.map(id => ({ id, type: 'Recipe', quantity: numPortions })),
        delivery_slot_id: coreSlotId,
        delivery_day_id: coreDayId,
      })
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    test('should mark ORDER_SAVE as pending', async () => {
      saveUserOrder.mockImplementation(jest.fn().mockReturnValue(
        new Promise((resolve) => { resolve({ data: { id: '5678' } }) })
      ))
      await orderAssignToUser(orderAction)(dispatch, getState)

      expect(pending).toHaveBeenCalledTimes(2)
      expect(pending).toHaveBeenNthCalledWith(1, 'ORDER_SAVE', true)
      expect(pending).toHaveBeenNthCalledWith(2, 'ORDER_SAVE', false)
    })

    test('should mark ORDER_SAVE as errored with "save-order-fail" if it fails on saving order', async () => {
      const err = new Error('oops')
      saveUserOrder.mockImplementation(jest.fn().mockReturnValue(
        new Promise((resolve, reject) => { reject(err) })
      ))
      await orderAssignToUser(orderAction)(dispatch, getState)

      expect(pending).toHaveBeenCalledTimes(3)
      expect(pending).toHaveBeenNthCalledWith(1, 'ORDER_SAVE', true)
      expect(pending).toHaveBeenNthCalledWith(2, 'BASKET_CHECKOUT', false)
      expect(pending).toHaveBeenNthCalledWith(3, 'ORDER_SAVE', false)

      expect(error).toHaveBeenCalledTimes(2)
      expect(error).toHaveBeenNthCalledWith(1, 'ORDER_SAVE', null)
      expect(error).toHaveBeenNthCalledWith(2, 'ORDER_SAVE', 'save-order-fail')
    })

    test('should mark ORDER_SAVE as errored with "update-order-fail" if it fails on updating order', async () => {
      const orderSaveErr = new Error('user already has an order for chosen delivery day')
      const orderUpdateErr = new Error('user already has an order for chosen delivery day')
      saveUserOrder.mockImplementation(jest.fn().mockReturnValue(
        new Promise((resolve, reject) => { reject(orderSaveErr) })
      ))
      updateUserOrder.mockImplementation(jest.fn().mockReturnValue(
        new Promise((resolve, reject) => { reject(orderUpdateErr) })
      ))

      await orderAssignToUser(orderAction, 'order-123')(dispatch, getState)

      expect(error).toHaveBeenCalledWith('ORDER_SAVE', 'update-order-fail')
    })

    test('should call updateUserOrder with orderDetails & existingOrderId if saving order fails due to an order already existing on given day & existingOrderId is provided', async () => {
      const orderSaveErr = new Error('user already has an order for chosen delivery day')
      saveUserOrder.mockImplementation(jest.fn().mockReturnValue(
        new Promise((resolve, reject) => { reject(orderSaveErr) })
      ))

      await orderAssignToUser(orderAction, 'order-123')(dispatch, getState)

      expect(updateUserOrder).toHaveBeenCalledWith('access-token', {
        recipe_choices: [
          { id: 1, quantity: 3, type: 'Recipe' },
          { id: 2, quantity: 3, type: 'Recipe' },
          { id: 3, quantity: 3, type: 'Recipe' },
          { id: 4, quantity: 3, type: 'Recipe' },
          { id: 5, quantity: 3, type: 'Recipe' },
        ],
        delivery_slot_id: coreSlotId,
        delivery_day_id: coreDayId,
        order_id: 'order-123',
      })
    })

    test('should redirect the user to the order summary page if it succeeds on saving new order', async () => {
      saveUserOrder.mockImplementation(jest.fn().mockReturnValue(
        new Promise((resolve) => { resolve({ data: { id: '4321' } }) })
      ))

      await orderAssignToUser(orderAction, 'order-123')(dispatch, getState)

      expect(orderConfirmationRedirect).toHaveBeenCalledWith(
        '4321',
        'transaction',
      )
    })

    describe('when addOnsBeforeOrderConfirmation feature flag is on', () => {
      beforeEach(() => {
        getState.mockReturnValue({
          auth: Immutable.Map({ accessToken: 'access-token' }),
          features: Immutable.Map({
            addOnsBeforeOrderConfirmation: Immutable.Map({
              value: true,
            })
          }),
          basket: Immutable.Map({
            date: '2019-10-11',
            slotId: '4'
          }),
        })
      })

      test('should redirect the user the add ons page if it succeeds', async () => {
        saveUserOrder.mockImplementation(jest.fn().mockReturnValue(
          new Promise((resolve) => { resolve({ data: { id: '4321' } }) })
        ))

        await orderAssignToUser(orderAction, 'order-123')(dispatch, getState)

        expect(orderAddOnRedirect).toHaveBeenCalledWith(
          '4321',
          'transaction',
        )
      })
    })

    test('should redirect the user to the order summary page if it succeeds on updating existing order', async () => {
      const orderSaveErr = new Error('user already has an order for chosen delivery day')
      saveUserOrder.mockImplementation(jest.fn().mockReturnValue(
        new Promise((resolve, reject) => { reject(orderSaveErr) })
      ))

      updateUserOrder.mockImplementation(jest.fn().mockReturnValue(
        new Promise((resolve) => { resolve({ data: { id: '3456' } }) })
      ))

      await orderAssignToUser(orderAction, 'order-123')(dispatch, getState)

      expect(orderConfirmationRedirect).toHaveBeenCalledWith(
        '3456',
        'transaction',
      )
    })
  })

  describe('orderAddressChange', () => {
    let addressId

    beforeEach(() => {
      orderId = '12345'
      addressId = '101'
      getState.mockReturnValue({
        auth: Immutable.Map({ accessToken: 'access-token' }),
        user: Immutable.Map({
          newOrders: Immutable.Map({
            12345: Immutable.Map({
              shippingAddressId: '100',
              isCurrentPeriod: true
            })
          })
        })
      })
    })

    it('should mark ORDER_ADDRESS_CHANGE as pending', async () => {
      await orderAddressChange(orderId, addressId)(dispatch, getState)

      expect(pending).toHaveBeenCalledTimes(2)
      expect(pending).toHaveBeenNthCalledWith(1, 'ORDER_ADDRESS_CHANGE', '12345')
      expect(pending).toHaveBeenNthCalledWith(2, 'ORDER_ADDRESS_CHANGE', '')
    })

    it('should call updateOrderAddress and dispatch the action with the correct arguments', async () => {
      updateOrderAddress.mockReturnValueOnce(
        new Promise(resolve => resolve())
      )

      await orderAddressChange(orderId, addressId)(dispatch, getState)

      expect(updateOrderAddress).toHaveBeenCalled()
      expect(updateOrderAddress).toHaveBeenCalledWith('access-token', '12345', '101')

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.ORDER_ADDRESS_CHANGE,
        data: {
          orderId: '12345',
          addressId: '101',
        },
        trackingData: {
          actionType: 'OrderDeliveryAddress Saved',
          order_id: '12345',
          is_current_period: true,
          original_deliveryaddress_id: '100',
          new_deliveryaddress_id: '101'
        }
      })
    })

    describe('when updateOrderAddress call errors', () => {
      beforeEach(() => {
        const err = new Error('error message')
        updateOrderAddress.mockReturnValueOnce(
          new Promise((resolve, reject) => reject(err))
        )
      })
      it('should mark ORDER_ADDRESS_CHANGE as errored', async () => {
        await orderAddressChange(orderId, addressId)(dispatch, getState)

        expect(error).toHaveBeenCalledTimes(2)
        expect(error).toHaveBeenNthCalledWith(1, 'ORDER_ADDRESS_CHANGE', { orderId: '', errorMessage: '' })
        expect(error).toHaveBeenNthCalledWith(2, 'ORDER_ADDRESS_CHANGE', { orderId: '12345', errorMessage: 'error message' })
      })

      it('should dispatch the SaveAttemptFailed action with the correct arguments', async () => {
        await orderAddressChange(orderId, addressId)(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith({
          type: actionTypes.TRACKING,
          trackingData: {
            actionType: 'OrderDeliveryAddress SaveAttemptFailed',
            error: 'error message',
            order_id: '12345',
            is_current_period: true,
            original_deliveryaddress_id: '100',
            new_deliveryaddress_id: '101'
          }
        })
      })
    })
  })

  describe('orderGetDeliveryDays', () => {
    describe('given a user who has set their postcode', () => {
      let state
      const postcode = 'AA11 2BB'
      const cutoffDatetimeFrom = '01-01-2017 10:00:01'
      const cutoffDatetimeUntil = '02-02-2017 14:23:34'
      const fetchedDays = [{ id: '4' }, { id: '5' }, { id: '6' }]
      const availableDays = [{ id: '5' }, { id: '6' }]

      beforeEach(() => {
        orderId = '123'

        state = {
          user: Immutable.fromJS({
            addresses: { 789: { postcode } },
            deliveryTariffId: 'deliveryTarriffId'
          }),
        }

        fetchDeliveryDays.mockResolvedValue({ data: fetchedDays })
        deliveriesUtils.getAvailableDeliveryDays.mockReturnValue(availableDays)
      })

      describe('and next day delivery is disabled', () => {
        const deliveryTariffId = deliveriesUtils.deliveryTariffTypes.NON_NDD

        beforeEach(() => {
          state.features = Immutable.fromJS({
            ndd: {
              value: deliveryTariffId,
              experiment: false,
            }
          })

          getState.mockReturnValue(state)
          deliveriesUtils.getDeliveryTariffId = jest.fn().mockReturnValue(deliveryTariffId)
          deliveriesUtils.getNDDFeatureFlagVal = jest.fn().mockReturnValue(false)
        })

        describe('when call `orderGetDeliveryDays`', () => {
          beforeEach(async () => {
            await orderGetDeliveryDays(cutoffDatetimeFrom, cutoffDatetimeUntil, '789', orderId)(dispatch, getState)
          })

          test('then `ORDER_DELIVERY_DAYS_RECEIVE` should trigger pending and not pending state', () => {
            expect(actionStatus.pending).toHaveBeenCalledTimes(2)
            expect(actionStatus.pending).toHaveBeenNthCalledWith(1, 'ORDER_DELIVERY_DAYS_RECEIVE', true)
            expect(actionStatus.pending).toHaveBeenNthCalledWith(2, 'ORDER_DELIVERY_DAYS_RECEIVE', false)
          })

          test('then `ORDER_DELIVERY_DAYS_RECEIVE` cleared of error', () => {
            expect(actionStatus.error).toHaveBeenCalledTimes(1)
            expect(actionStatus.error).toHaveBeenCalledWith('ORDER_DELIVERY_DAYS_RECEIVE', null)
          })

          test('then `fetchDeliveryDays` should have been called with correct parameters', () => {
            expect(fetchDeliveryDays).toHaveBeenCalledTimes(1)
            expect(fetchDeliveryDays).toHaveBeenCalledWith(null, cutoffDatetimeFrom, cutoffDatetimeUntil, false, deliveryTariffId, postcode)
          })

          test('then `getAvailableDeliveryDays` should have been called with correct parameters', () => {
            expect(deliveriesUtils.getAvailableDeliveryDays).toHaveBeenCalledWith(fetchedDays)
          })

          test('then dispatch should have been called 4 times', () => {
            expect(dispatch).toHaveBeenCalledTimes(4)
          })

          test('then action `ORDER_DELIVERY_DAYS_RECEIVE` should have been dispatched third', () => {
            expect(dispatch).toHaveBeenNthCalledWith(3, {
              type: actionTypes.ORDER_DELIVERY_DAYS_RECEIVE,
              orderId,
              availableDays,
            })
          })

          test('then `transformDaySlotLeadTimesToMockSlots` should not have been called', () => {
            expect(deliveriesUtils.transformDaySlotLeadTimesToMockSlots).not.toHaveBeenCalled()
          })
        })

        describe('and `fetchDeliveryDays` throws an error', () => {
          const err = new Error('oops')

          beforeEach(() => {
            fetchDeliveryDays.mockRejectedValue(err)
          })

          describe('when call `orderGetDeliveryDays`', () => {
            beforeEach(async () => {
              await orderGetDeliveryDays(cutoffDatetimeFrom, cutoffDatetimeUntil, '789', orderId)(dispatch, getState)
            })

            test('then `ORDER_DELIVERY_DAYS_RECEIVE` should trigger pending and not pending state', () => {
              expect(actionStatus.pending).toHaveBeenCalledTimes(2)
              expect(actionStatus.pending).toHaveBeenNthCalledWith(1, 'ORDER_DELIVERY_DAYS_RECEIVE', true)
              expect(actionStatus.pending).toHaveBeenNthCalledWith(2, 'ORDER_DELIVERY_DAYS_RECEIVE', false)
            })

            test('then `ORDER_DELIVERY_DAYS_RECEIVE` should be marked as errored', () => {
              expect(actionStatus.error).toHaveBeenCalledTimes(2)
              expect(actionStatus.error).toHaveBeenNthCalledWith(1, 'ORDER_DELIVERY_DAYS_RECEIVE', null)
              expect(actionStatus.error).toHaveBeenNthCalledWith(2, 'ORDER_DELIVERY_DAYS_RECEIVE', err.message)
            })

            test('then dispatch should have been called 4 times', () => {
              expect(dispatch).toHaveBeenCalledTimes(4)
            })
          })
        })
      })

      describe('and next day delivery is enabled', () => {
        const deliveryTariffId = deliveriesUtils.deliveryTariffTypes.FREE_NDD

        beforeEach(() => {
          state.features = Immutable.fromJS({
            ndd: {
              value: deliveryTariffId,
              experiment: false,
            }
          })

          getState.mockReturnValue(state)
          deliveriesUtils.getDeliveryTariffId = jest.fn().mockReturnValue(deliveryTariffId)
          deliveriesUtils.getNDDFeatureFlagVal = jest.fn().mockReturnValue(true)
        })

        describe('when call `orderGetDeliveryDays`', () => {
          beforeEach(async () => {
            await orderGetDeliveryDays(cutoffDatetimeFrom, cutoffDatetimeUntil, '789', orderId)(dispatch, getState)
          })

          test('then `ORDER_DELIVERY_DAYS_RECEIVE` should trigger pending and not pending state', () => {
            expect(actionStatus.pending).toHaveBeenCalledTimes(2)
            expect(actionStatus.pending).toHaveBeenNthCalledWith(1, 'ORDER_DELIVERY_DAYS_RECEIVE', true)
            expect(actionStatus.pending).toHaveBeenNthCalledWith(2, 'ORDER_DELIVERY_DAYS_RECEIVE', false)
          })

          test('then `ORDER_DELIVERY_DAYS_RECEIVE` cleared of error', () => {
            expect(actionStatus.error).toHaveBeenCalledTimes(1)
            expect(actionStatus.error).toHaveBeenCalledWith('ORDER_DELIVERY_DAYS_RECEIVE', null)
          })

          test('then should call `fetchDeliveryDays` with correct parameters', () => {
            expect(fetchDeliveryDays).toHaveBeenCalledTimes(1)
            expect(fetchDeliveryDays).toHaveBeenCalledWith(null, cutoffDatetimeFrom, cutoffDatetimeUntil, true, deliveryTariffId, postcode)
          })

          test('then should call `transformDaySlotLeadTimesToMockSlots`', () => {
            expect(deliveriesUtils.transformDaySlotLeadTimesToMockSlots).toHaveBeenCalled()
          })
        })
      })
    })
  })

  describe('orderUpdateDayAndSlot', () => {
    let slotId
    let slotDate
    let availableDays

    beforeEach(() => {
      orderId = '12345'
      coreDayId = 3
      coreSlotId = 8
      slotId = 'slotid123'
      slotDate = '2019-08-10'
      availableDays = [{ id: '5' }, { id: '6' }]

      getState.mockReturnValue({
        auth: Immutable.Map({ accessToken: 'access-token' }),
        user: Immutable.Map({
          newOrders: Immutable.Map({
            12345: Immutable.Map({
              deliverySlotId: 'deliverySlotId',
              isCurrentPeriod: true
            })
          })
        })
      })
    })

    it('should mark ORDER_UPDATE_DELIVERY_DAY_AND_SLOT as pending', async () => {
      await orderUpdateDayAndSlot(orderId, coreSlotId, slotId, slotDate, availableDays)(dispatch, getState)

      expect(pending).toHaveBeenCalledTimes(2)
      expect(pending).toHaveBeenNthCalledWith(1, 'ORDER_UPDATE_DELIVERY_DAY_AND_SLOT', true)
      expect(pending).toHaveBeenNthCalledWith(2, 'ORDER_UPDATE_DELIVERY_DAY_AND_SLOT', false)
    })

    it('should mark ORDER_UPDATE_DELIVERY_DAY_AND_SLOT as errored if it errors', async () => {
      const err = new Error('oops')
      saveOrder.mockImplementation(jest.fn().mockReturnValueOnce(
        new Promise((resolve, reject) => reject(err))
      ))

      await orderUpdateDayAndSlot(orderId, coreDayId, coreSlotId, slotId, slotDate, availableDays)(dispatch, getState)

      expect(pending).toHaveBeenCalledTimes(2)
      expect(pending).toHaveBeenNthCalledWith(1, 'ORDER_UPDATE_DELIVERY_DAY_AND_SLOT', true)
      expect(pending).toHaveBeenNthCalledWith(2, 'ORDER_UPDATE_DELIVERY_DAY_AND_SLOT', false)

      expect(error).toHaveBeenCalledTimes(2)
      expect(error).toHaveBeenNthCalledWith(1, 'ORDER_UPDATE_DELIVERY_DAY_AND_SLOT', null)
      expect(error).toHaveBeenNthCalledWith(2, 'ORDER_UPDATE_DELIVERY_DAY_AND_SLOT', err.message)
    })

    it('should map the arguments through to saveOrder and dispatch the action with the correct arguments', async () => {
      const updatedOrder = {
        data: {
          deliveryDate: '01-01-2017',
          shouldCutoffAt: '29-12-2016',
          humanDeliveryDate: 'Monday 1st January'
        },
      }

      deliveriesUtils.getSlot.mockReturnValue(Immutable.fromJS({
        coreSlotId: '4',
        id: 'deliveries-uuid',
        daySlotLeadTimeId: 'day-slot-lead-time-uuid',
        deliveryStartTime: '05:00:00',
        deliveryEndTime: '07:00:00',
      }))

      saveOrder.mockReturnValueOnce(
        new Promise(resolve => resolve(updatedOrder))
      )

      await orderUpdateDayAndSlot(orderId, coreDayId, coreSlotId, slotId, slotDate, availableDays)(dispatch, getState)

      expect(saveOrder).toHaveBeenCalled()
      const order = {
        delivery_day_id: 3,
        delivery_slot_id: 8,
        day_slot_lead_time_id: 'day-slot-lead-time-uuid'
      }

      expect(saveOrder).toHaveBeenCalledWith('access-token', '12345', order)

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.ORDER_UPDATE_DELIVERY_DAY_AND_SLOT,
        orderId: '12345',
        coreDayId: 3,
        slotId: 8,
        deliveryDay: '01-01-2017',
        humanDeliveryDay: 'Monday 1st January',
        shouldCutoffAt: '29-12-2016',
        deliverySlotStart: '05:00:00',
        deliverySlotEnd: '07:00:00',
        trackingData: {
          actionType: 'OrderDeliverySlot Saved',
          order_id: '12345',
          isCurrentPeriod: true,
          original_deliveryslot_id: 'deliverySlotId',
          new_deliveryslot_id: 'slotid123'
        }
      })
    })

    it('should dispatch the SaveAttemptFailed action with the correct arguments if saveOrder fails', async () => {
      const error = new Error('error message')

      saveOrder.mockImplementation(jest.fn().mockReturnValueOnce(
        new Promise((resolve, reject) => reject(error))
      ))

      await orderUpdateDayAndSlot(orderId, coreDayId, coreSlotId, slotId, slotDate, availableDays)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: 'OrderDeliverySlot SaveAttemptFailed',
          error: 'error message',
          order_id: '12345',
          isCurrentPeriod: true,
          original_deliveryslot_id: 'deliverySlotId',
          new_deliveryslot_id: 'slotid123'
        }
      })
    })
  })

  describe('clearUpdateDateErrorAndPending', () => {
    test('should mark ORDER_UPDATE_DELIVERY_DAY_AND_SLOT as NOT pending', () => {
      clearUpdateDateErrorAndPending()(dispatch)

      expect(pending).toHaveBeenCalledWith('ORDER_UPDATE_DELIVERY_DAY_AND_SLOT', null)
    })

    test('should mark ORDER_UPDATE_DELIVERY_DAY_AND_SLOT as NOT errored', () => {
      clearUpdateDateErrorAndPending()(dispatch)

      expect(pending).toHaveBeenCalledWith('ORDER_UPDATE_DELIVERY_DAY_AND_SLOT', null)
    })
  })
})
