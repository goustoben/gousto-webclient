import Immutable from 'immutable'

import { getOrderDetails } from 'utils/basket'
import { saveUserOrder, updateUserOrder } from 'apis/user'
import {
  saveOrder,
  cancelOrder,
  updateOrderAddress,
  fetchOrder,
  updateOrderItems,
  orderCheckout,
} from 'apis/orders'
import { orderConfirmationRedirect } from 'actions/orderConfirmation'
import actionStatus from 'actions/status'
import actionTypes from 'actions/actionTypes'
import orderActions from '../order'
import { fetchDeliveryDays } from "../../apis/deliveries"
import { getAvailableDeliveryDays } from "../../utils/deliveries"

jest.mock('apis/orders')
jest.mock('actions/orderConfirmation')
jest.mock('actions/status')
jest.mock('apis/user')
jest.mock('utils/basket')
jest.mock('apis/deliveries')
jest.mock('utils/deliveries')

const { pending, error } = actionStatus

describe('order actions', () => {
  let orderId
  let recipes
  let coreDayId
  let coreSlotId
  let numPortions
  let orderAction
  let dispatchSpy
  let getStateSpy

  beforeEach(() => {
    orderId = '12345'
    recipes = [1, 2, 3, 4, 5]
    coreDayId = 3
    coreSlotId = 8
    numPortions = 3
    orderAction = 'transaction'
    dispatchSpy = jest.fn()
    fetchOrder.mockClear()

    getStateSpy = () => ({
      auth: Immutable.Map({ accessToken: 'access-token' }),
      features: Immutable.Map({
        orderConfirmation: Immutable.Map({
          value: false,
        })
      })
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('orderUpdate', () => {
    test('should mark ORDER_SAVE as pending', async () => {
      saveOrder.mockImplementation(jest.fn().mockReturnValueOnce(
        new Promise((resolve) => { resolve(resolve) })
      ))
      await orderActions.orderUpdate(orderId, recipes, coreDayId, coreSlotId, numPortions, orderAction)(dispatchSpy, getStateSpy)

      expect(pending).toHaveBeenCalled()
      expect(pending.mock.calls[0][0]).toEqual('ORDER_SAVE')
      expect(pending.mock.calls[0][1]).toBe(true)
      expect(pending.mock.calls[1][0]).toEqual('ORDER_SAVE')
      expect(pending.mock.calls[1][1]).toBe(false)
      expect(pending.mock.calls.length).toBe(2)
    })

    test('should mark ORDER_SAVE as errored if it errors', async () => {
      const err = new Error('oops')
      saveOrder.mockImplementation(jest.fn().mockReturnValueOnce(
        new Promise((resolve, reject) => { reject(err) })
      ))
      await orderActions.orderUpdate(orderId, recipes, coreDayId, coreSlotId, numPortions, orderAction)(dispatchSpy, getStateSpy)

      expect(pending).toHaveBeenCalled()
      expect(pending.mock.calls[0][0]).toEqual('ORDER_SAVE')
      expect(pending.mock.calls[0][1]).toBe(true)
      expect(pending.mock.calls[1][0]).toEqual('BASKET_CHECKOUT')
      expect(pending.mock.calls[1][1]).toBe(false)
      expect(pending.mock.calls[2][0]).toEqual('ORDER_SAVE')
      expect(pending.mock.calls[2][1]).toBe(false)

      expect(error).toHaveBeenCalledTimes(2)
      expect(error.mock.calls[0][0]).toEqual('ORDER_SAVE')
      expect(error.mock.calls[0][1]).toBe(null)
      expect(error.mock.calls[1][0]).toEqual('ORDER_SAVE')
      expect(error.mock.calls[1][1]).toEqual(err.message)
      expect(dispatchSpy.mock.calls.length).toEqual(5)
    })

    test('should map the arguments through to saveOrder correctly', async () => {
      await orderActions.orderUpdate(orderId, recipes, coreDayId, coreSlotId, numPortions, orderAction)(dispatchSpy, getStateSpy)

      expect(saveOrder).toHaveBeenCalledTimes(1)
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
      }
      expect(saveOrder.mock.calls[0][0]).toEqual('access-token')
      expect(saveOrder.mock.calls[0][1]).toEqual('12345')
      expect(saveOrder.mock.calls[0][2]).toEqual(order)
    })

    test('should redirect the user to the order summary page if it succeeds', async () => {
      orderAction = 'something'
      saveOrder.mockImplementation(jest.fn().mockReturnValueOnce(
        new Promise((resolve) => { resolve({ data: { id: '5678' } }) })
      ))
      await orderActions.orderUpdate(orderId, recipes, coreDayId, coreSlotId, numPortions, orderAction)(dispatchSpy, getStateSpy)

      expect(orderConfirmationRedirect).toHaveBeenCalledWith(
        '5678',
        'something',
      )
    })
  })

  describe('orderCheckout', () => {
    const orderCheckoutApiParams = {
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
      await orderActions.orderCheckout(orderCheckoutApiParams)(dispatchSpy, getStateSpy)

      expect(orderCheckout).toHaveBeenCalledWith("access-token", {
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

      expect(pending.mock.calls[1][0]).toEqual('ORDER_CHECKOUT')
      expect(pending.mock.calls[1][1]).toBe(false)

      expect(error.mock.calls[0][0]).toEqual('ORDER_CHECKOUT')
      expect(error.mock.calls[0][1]).toBe(null)
    })

    test('status is set to pending and no error', async () => {
      await orderActions.orderCheckout(orderCheckoutApiParams)(dispatchSpy, getStateSpy)
      expect(pending).toHaveBeenCalled()
      expect(pending.mock.calls[0][0]).toEqual('ORDER_CHECKOUT')
      expect(pending.mock.calls[0][1]).toBe(true)

      expect(error.mock.calls[0][0]).toEqual('ORDER_CHECKOUT')
      expect(error.mock.calls[0][1]).toBe(null)
    })

    test('returns an order ID and url', async () => {
      orderCheckout.mockResolvedValueOnce({
        data: {
          orderId: '123',
          url: 'summary-url',
        }
      })

      const result = await orderActions.orderCheckout(
        orderCheckoutApiParams
      )(dispatchSpy, getStateSpy)

      expect(error.mock.calls[0][0]).toEqual('ORDER_CHECKOUT')
      expect(error.mock.calls[0][1]).toBe(null)

      expect(result).toEqual({
        orderId: '123',
        url: 'summary-url',
      })
    })

    test('api throws an error', async () => {
      orderCheckout.mockRejectedValueOnce({
        status: 'error',
        message: 'error api',
      })

      await orderActions.orderCheckout(orderCheckoutApiParams)(dispatchSpy, getStateSpy)

      expect(error.mock.calls[1][0]).toEqual('ORDER_CHECKOUT')
      expect(error.mock.calls[1][1]).toBe('error api')

      expect(pending.mock.calls[1][0]).toEqual('ORDER_CHECKOUT')
      expect(pending.mock.calls[1][1]).toBe(false)
    })

    test('throw an error when orderId is not present in the response', async () => {
      orderCheckout.mockResolvedValueOnce({
        data: {
          orderId: '',
          url: 'summary-url',
        }
      })

      await orderActions.orderCheckout(
        orderCheckoutApiParams
      )(dispatchSpy, getStateSpy)

      expect(error.mock.calls[1][0]).toEqual('ORDER_CHECKOUT')
      expect(error.mock.calls[1][1]).toBe('Error when saving the order')
    })

    test('throw an error when url is not present in the response', async () => {
      orderCheckout.mockResolvedValueOnce({
        data: {
          orderId: 'order-id',
          url: '',
        }
      })

      await orderActions.orderCheckout(
        orderCheckoutApiParams
      )(dispatchSpy, getStateSpy)

      expect(error.mock.calls[1][0]).toEqual('ORDER_CHECKOUT')
      expect(error.mock.calls[1][1]).toBe('Error when saving the order')
    })

    test('redirect is called when redirected parameter is set to true', async () => {
      orderCheckout.mockRejectedValueOnce({
        status: 'error',
        message: 'error api',
        url: 'redirect-url',
        redirected: true,
      })

      await orderActions.orderCheckout(
        orderCheckoutApiParams
      )(dispatchSpy, getStateSpy)

      expect(window.location.assign).toHaveBeenCalledWith('redirect-url')
    })

    test('redirect is not called when redirected parameter is not set', async () => {
      orderCheckout.mockRejectedValueOnce({
        status: 'error',
        message: 'error api',
      })

      await orderActions.orderCheckout(orderCheckoutApiParams)(dispatchSpy, getStateSpy)

      expect(window.location.assign).toHaveBeenCalledTimes(0)
    })
  })

  describe('orderUpdateProducts', () => {
    test('api function is called with correct parameters', async () => {
      const itemChoices = [
        { id: "df0ddd72-beb3-11e5-8432-02fada0dd3b9", quantity: 1, type: "Product" },
        { id: "d533155a-7c4f-11e7-b81e-02e92c52d95a", quantity: 2, type: "Product" }
      ]
      await orderActions.orderUpdateProducts(orderId, itemChoices)(dispatchSpy, getStateSpy)

      expect(updateOrderItems).toHaveBeenCalledWith(
        'access-token',
        orderId,
        { item_choices: itemChoices, restrict: "Product" }
      )
    })

    test('when the api call succeeds it dispatches an action', async () => {
      await orderActions.orderUpdateProducts(orderId)(dispatchSpy, getStateSpy)

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionTypes.ORDER_UPDATE_PRODUCTS
      })
    })

    test('when the api call errors it dispatches the error in an action', async () => {
      updateOrderItems.mockRejectedValue('error')
      await orderActions.orderUpdateProducts(orderId)(dispatchSpy, getStateSpy)

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionTypes.ORDER_UPDATE_PRODUCTS,
        error: 'error',
      })
    })
  })

  describe('orderHasAnyProducts', () => {
    test('api function is called with correct parameters', async () => {
      await orderActions.orderHasAnyProducts(orderId)(dispatchSpy, getStateSpy)

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
      await orderActions.orderHasAnyProducts(orderId)(dispatchSpy, getStateSpy)

      expect(dispatchSpy).toHaveBeenCalledWith({
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
      await orderActions.orderHasAnyProducts(orderId)(dispatchSpy, getStateSpy)

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionTypes.ORDER_HAS_ANY_PRODUCTS,
        hasProducts: true
      })
    })

    test('when the orderId is not empty, null or undefined, it dispatches an error in an action', async() => {
      const errorAction = {
        type: actionTypes.ORDER_HAS_ANY_PRODUCTS,
        error: new Error('missing orderId')
      }
      await orderActions.orderHasAnyProducts('')(dispatchSpy, getStateSpy)
      await orderActions.orderHasAnyProducts(null)(dispatchSpy, getStateSpy)
      await orderActions.orderHasAnyProducts()(dispatchSpy, getStateSpy)

      expect(dispatchSpy).toHaveBeenNthCalledWith(1, errorAction)
      expect(dispatchSpy).toHaveBeenNthCalledWith(2, errorAction)
      expect(dispatchSpy).toHaveBeenNthCalledWith(3, errorAction)
      expect(fetchOrder).not.toHaveBeenCalled()
    })

    test('when the api call throws an error, it dispatches the error in an action', async () => {
      fetchOrder.mockRejectedValue('error')
      await orderActions.orderHasAnyProducts(orderId)(dispatchSpy, getStateSpy)

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionTypes.ORDER_HAS_ANY_PRODUCTS,
        error: 'error',
      })
    })
  })

  describe('orderAssignToUser', () => {
    beforeEach(() => {
      recipes = [1, 2, 3, 4, 5]
      saveOrder.mockImplementation(jest.fn().mockReturnValue(
        new Promise((resolve) => { resolve({ data: { id: '5678' } })})
      ))
      cancelOrder.mockImplementation(jest.fn().mockReturnValue(
        new Promise((resolve) => { resolve()})
      ))
      updateOrderAddress.mockImplementation(jest.fn().mockReturnValue(
        new Promise((resolve) => { resolve()})
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
        new Promise((resolve) => { resolve({ data: { id: '5678' } })})
      ))
      await orderActions.orderAssignToUser(orderAction)(dispatchSpy, getStateSpy)

      expect(pending.mock.calls.length).toBe(2)
      expect(pending.mock.calls[0][0]).toEqual('ORDER_SAVE')
      expect(pending.mock.calls[0][1]).toBe(true)
      expect(pending.mock.calls[1][0]).toEqual('ORDER_SAVE')
      expect(pending.mock.calls[1][1]).toBe(false)
      expect(dispatchSpy.mock.calls.length).toBe(4)
    })

    test('should mark ORDER_SAVE as errored with "save-order-fail" if it fails on saving order', async () => {
      const err = new Error('oops')
      saveUserOrder.mockImplementation(jest.fn().mockReturnValue(
        new Promise((resolve, reject) => { reject(err)})
      ))
      await orderActions.orderAssignToUser(orderAction)(dispatchSpy, getStateSpy)

      expect(pending.mock.calls.length).toBe(3)
      expect(pending.mock.calls[0][0]).toEqual('ORDER_SAVE')
      expect(pending.mock.calls[0][1]).toBe(true)
      expect(pending.mock.calls[1][0]).toEqual('BASKET_CHECKOUT')
      expect(pending.mock.calls[1][1]).toBe(false)
      expect(pending.mock.calls[2][0]).toEqual('ORDER_SAVE')
      expect(pending.mock.calls[2][1]).toBe(false)

      expect(error.mock.calls.length).toBe(2)
      expect(error.mock.calls[0][0]).toEqual('ORDER_SAVE')
      expect(error.mock.calls[0][1]).toBe(null)
      expect(error.mock.calls[1][0]).toEqual('ORDER_SAVE')
      expect(error.mock.calls[1][1]).toBe('save-order-fail')
    })

    test('should mark ORDER_SAVE as errored with "update-order-fail" if it fails on updating order', async () => {
      const orderSaveErr = new Error('user already has an order for chosen delivery day')
      const orderUpdateErr = new Error('user already has an order for chosen delivery day')
      saveUserOrder.mockImplementation(jest.fn().mockReturnValue(
        new Promise((resolve, reject) => { reject(orderSaveErr)})
      ))
      updateUserOrder.mockImplementation(jest.fn().mockReturnValue(
        new Promise((resolve, reject) => { reject(orderUpdateErr)})
      ))

      await orderActions.orderAssignToUser(orderAction, 'order-123')(dispatchSpy, getStateSpy)

      expect(error).toHaveBeenCalledWith("ORDER_SAVE", 'update-order-fail')
    })

    test('should call updateUserOrder with orderDetails & existingOrderId if saving order fails due to an order already existing on given day & existingOrderId is provided', async () => {
      const orderSaveErr = new Error('user already has an order for chosen delivery day')
      saveUserOrder.mockImplementation(jest.fn().mockReturnValue(
        new Promise((resolve, reject) => { reject(orderSaveErr)})
      ))

      await orderActions.orderAssignToUser(orderAction, 'order-123')(dispatchSpy, getStateSpy)

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
        new Promise((resolve) => { resolve({ data: { id: '4321' } })})
      ))

      await orderActions.orderAssignToUser(orderAction, 'order-123')(dispatchSpy, getStateSpy)

      expect(orderConfirmationRedirect).toHaveBeenCalledWith(
        '4321',
        'transaction',
      )
    })

    test('should redirect the user to the order summary page if it succeeds on updating existing order', async () => {
      const orderSaveErr = new Error('user already has an order for chosen delivery day')
      saveUserOrder.mockImplementation(jest.fn().mockReturnValue(
        new Promise((resolve, reject) => { reject(orderSaveErr)})
      ))

      updateUserOrder.mockImplementation(jest.fn().mockReturnValue(
        new Promise((resolve) => { resolve({ data: { id: '3456' } })})
      ))

      await orderActions.orderAssignToUser(orderAction, 'order-123')(dispatchSpy, getStateSpy)

      expect(orderConfirmationRedirect).toHaveBeenCalledWith(
        '3456',
        'transaction',
      )
    })
  })
  describe('orderGetDeliveryDays', () => {
    let cutoffDatetimeFrom
    let cutoffDatetimeUntil

    beforeEach(() => {
      orderId = '123'
      cutoffDatetimeFrom = '01-01-2017 10:00:01'
      cutoffDatetimeUntil = '02-02-2017 14:23:34'
      getStateSpy = jest.fn().mockReturnValue({
        user: Immutable.fromJS({
          addresses: {789: {postcode: 'AA11 2BB'}},
        }),
        features: Immutable.fromJS({
          ndd: {
            value: true,
            experiment: false,
          }
        }),
      })
    })

    it('should mark ORDER_DELIVERY_DAYS_RECEIVE as pending', async () => {
      await orderActions.orderGetDeliveryDays(cutoffDatetimeFrom, cutoffDatetimeUntil, '789', orderId)(dispatchSpy, getStateSpy)

      expect(actionStatus.pending.mock.calls.length).toEqual(2)
      expect(actionStatus.pending.mock.calls[0][0]).toEqual('ORDER_DELIVERY_DAYS_RECEIVE')
      expect(actionStatus.pending.mock.calls[0][1]).toBe(true)
      expect(actionStatus.pending.mock.calls[1][0]).toEqual('ORDER_DELIVERY_DAYS_RECEIVE')
      expect(actionStatus.pending.mock.calls[1][1]).toBe(false)
      expect(dispatchSpy.mock.calls.length).toEqual(4)
    })

    it('should mark ORDER_DELIVERY_DAYS_RECEIVE as errored if it errors', async () => {
      const err = new Error('oops')
      fetchDeliveryDays.mockImplementation(jest.fn().mockReturnValue(
        new Promise((resolve, reject) => {
          reject(err)
        })
      ))

      await orderActions.orderGetDeliveryDays(cutoffDatetimeFrom, cutoffDatetimeUntil, '789', orderId)(dispatchSpy, getStateSpy)

      expect(actionStatus.pending.mock.calls.length).toEqual(2)
      expect(actionStatus.pending.mock.calls[0][0]).toEqual('ORDER_DELIVERY_DAYS_RECEIVE')
      expect(actionStatus.pending.mock.calls[0][1]).toEqual(true)
      expect(actionStatus.pending.mock.calls[1][0]).toEqual('ORDER_DELIVERY_DAYS_RECEIVE')
      expect(actionStatus.pending.mock.calls[1][1]).toEqual(false)

      expect(actionStatus.error.mock.calls.length).toEqual(2)
      expect(actionStatus.error.mock.calls[0][0]).toEqual('ORDER_DELIVERY_DAYS_RECEIVE')
      expect(actionStatus.error.mock.calls[0][1]).toBeNull()
      expect(actionStatus.error.mock.calls[1][0]).toEqual('ORDER_DELIVERY_DAYS_RECEIVE')
      expect(actionStatus.error.mock.calls[1][1]).toEqual(err.message)
      expect(dispatchSpy.mock.calls.length).toEqual(4)
    })

    it('should map the arguments through to fetchDeliveryDays and dispatch the action with the correct arguments', async () => {
      getStateSpy = jest.fn().mockReturnValue({
        user: Immutable.fromJS({
          addresses: {789: {postcode: 'AA11 2BB'}},
        }),
      })

      const fetchedDays = { data: [{ id: '4' }, { id: '5' }, { id: '6' }] }

      fetchDeliveryDays.mockImplementation(jest.fn().mockReturnValue(
        new Promise((resolve, reject) => {
          resolve(fetchedDays)
        })
      ))

      getAvailableDeliveryDays.mockImplementation(jest.fn().mockReturnValue(
        [{ id: '5' }, { id: '6' }]
      ))

      await orderActions.orderGetDeliveryDays(cutoffDatetimeFrom, cutoffDatetimeUntil, '789', orderId)(dispatchSpy, getStateSpy)

      expect(fetchDeliveryDays.mock.calls.length).toEqual(1)

      const expectedReqData = {
        'filters[cutoff_datetime_from]': '01-01-2017 10:00:01',
        'filters[cutoff_datetime_until]': '02-02-2017 14:23:34',
        sort: 'date',
        direction: 'asc',
        postcode: 'AA11 2BB',
        ndd: 'false'
      }

      expect(fetchDeliveryDays.mock.calls[0][0]).toBeNull()

      expect(fetchDeliveryDays.mock.calls[0][1]).toEqual(expectedReqData)
      expect(getAvailableDeliveryDays.mock.calls[0][0]).toEqual([{ id: '4' }, { id: '5' }, { id: '6' }])
      expect(dispatchSpy.mock.calls.length).toEqual(4)
      expect(dispatchSpy.mock.calls[2][0]).toEqual({
        type: actionTypes.ORDER_DELIVERY_DAYS_RECEIVE,
        orderId: '123',
        availableDays: [{ id: '5' }, { id: '6' }],
      })
    })

    it('fetch delivery days method should include ndd in its request if the feature is on', async () => {
      await orderActions.orderGetDeliveryDays(cutoffDatetimeFrom, cutoffDatetimeUntil, '789', orderId)(dispatchSpy, getStateSpy)

      expect(fetchDeliveryDays.mock.calls.length).toEqual(1)

      const expectedReqData = {
        'filters[cutoff_datetime_from]': '01-01-2017 10:00:01',
        'filters[cutoff_datetime_until]': '02-02-2017 14:23:34',
        sort: 'date',
        direction: 'asc',
        postcode: 'AA11 2BB',
        ndd: 'true'
      }

      expect(fetchDeliveryDays.mock.calls[0][0]).toBeNull
      expect(fetchDeliveryDays.mock.calls[0][1]).toEqual(expectedReqData)
    })
  })
})
