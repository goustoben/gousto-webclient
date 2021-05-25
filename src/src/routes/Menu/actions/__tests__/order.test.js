import Immutable from 'immutable'

import {
  fetchOrder,
  updateOrderAddress,
} from 'apis/orders'
import * as userApi from 'apis/user'
import actionStatus from 'actions/status'
import * as deliveriesUtils from 'utils/deliveries'
import { orderConfirmationRedirect } from 'actions/orderConfirmation'
import { trackOrder } from 'actions/order'
import * as clientMetrics from 'routes/Menu/apis/clientMetrics'
import { transformOrderV2ToOrderV1 } from 'routes/Menu/transformers/orderV2ToV1'
import { actionTypes } from 'src/actions/actionTypes'
import * as orderV2 from '../../apis/orderV2'
import { saveUserOrder, updateUserOrder } from '../../apis/core'
import { getUserOrders } from '../../apis/orderV2'
import * as orderSelectors from '../../selectors/order'
import { fetchUserOrders, orderAssignToUser, sendUpdateOrder } from '../order'
import * as basketSelectors from '../../../../selectors/basket'

import { safeJestMock } from '../../../../_testing/mocks'

jest.mock('../../apis/core')
jest.mock('../../apis/orderV2')
jest.mock('routes/Menu/transformers/orderV2ToV1')
jest.mock('apis/orders')
jest.mock('apis/user')
jest.mock('actions/status')
jest.mock('actions/tracking')
jest.mock('actions/order')
jest.mock('actions/orderConfirmation')
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

const sendClientMetricMock = safeJestMock(clientMetrics, 'sendClientMetric')

const { pending, error } = actionStatus

describe('order actions', () => {
  let recipes
  let coreDayId
  let coreSlotId
  let numPortions
  let orderAction
  let dispatch
  const getState = jest.fn()

  beforeEach(() => {
    recipes = [1, 2, 3, 4, 5]
    coreDayId = 3
    coreSlotId = 8
    numPortions = 3
    orderAction = 'transaction'

    fetchOrder.mockClear()
    getState.mockReturnValue({
      auth: Immutable.Map({
        accessToken: 'access-token',
        id: 'user-id'
      }),
      features: Immutable.Map({
        orderConfirmation: Immutable.Map({
          value: false,
        })
      }),
      basket: Immutable.Map({
        date: '2019-10-11',
        slotId: '4'
      }),
      onScreenRecovery: Immutable.Map({
        valueProposition: 'mock-value-proposition',
        offer: 'mock-offer'
      }),
      user: Immutable.Map({
        newOrders: [Immutable.fromJS({ id: '123', orderState: 'scheduled' })]
      })
    })

    jest.spyOn(deliveriesUtils, 'getSlot').mockReturnValue(Immutable.fromJS({
      coreSlotId: '4',
      id: 'deliveries-uuid',
      daySlotLeadTimeId: 'day-slot-lead-time-uuid'
    }))

    // We stub out some action so they will be `undefined`
    dispatch = jest.fn(async (fn) => (fn ? fn(dispatch, getState) : undefined))

    sendClientMetricMock.mockReset()

    jest.spyOn(deliveriesUtils, 'getAvailableDeliveryDays')
    jest.spyOn(deliveriesUtils, 'transformDaySlotLeadTimesToMockSlots')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('orderAssignToUser', () => {
    beforeEach(() => {
      recipes = [1, 2, 3, 4, 5]
      jest.spyOn(orderV2, 'updateOrder').mockImplementation(jest.fn().mockReturnValue(
        new Promise((resolve) => { resolve({ data: { id: '5678' } }) })
      ))
      updateOrderAddress.mockImplementation(jest.fn().mockReturnValue(
        new Promise((resolve) => { resolve() })
      ))
      jest.spyOn(orderSelectors, 'getOrderDetails').mockReturnValue({
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

    test('should mark ORDER_SAVE as errored with "assign-order-fail" if updating order doesn\'t return data', async () => {
      const orderSaveErr = new Error('user already has an order for chosen delivery day')
      saveUserOrder.mockImplementation(jest.fn().mockReturnValue(
        new Promise((resolve, reject) => { reject(orderSaveErr) })
      ))
      updateUserOrder.mockImplementation(jest.fn().mockReturnValue(
        new Promise((resolve) => { resolve({}) })
      ))

      await orderAssignToUser(orderAction, 'order-123')(dispatch, getState)

      expect(error).toHaveBeenCalledWith('ORDER_SAVE', 'assign-order-fail')
    })

    test('should redirect the user to the order summary page if it succeeds on saving new order', async () => {
      saveUserOrder.mockImplementation(jest.fn().mockReturnValue(
        new Promise((resolve) => { resolve({ data: { id: '4321' } }) })
      ))

      await orderAssignToUser(orderAction, 'order-123')(dispatch, getState)

      expect(trackOrder).toHaveBeenCalledWith('transaction', { id: '4321' })
      expect(orderConfirmationRedirect).toHaveBeenCalledWith(
        '4321',
        'transaction',
      )
      expect(pending).toHaveBeenCalledWith(
        actionTypes.ORDER_SAVE,
        false,
      )
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

      expect(trackOrder).toHaveBeenCalledWith('transaction', { id: '3456' })
      expect(orderConfirmationRedirect).toHaveBeenCalledWith(
        '3456',
        'transaction',
      )
      expect(pending).toHaveBeenCalledWith(
        actionTypes.ORDER_SAVE,
        false,
      )
    })
  })

  describe('sendUpdateOrder', () => {
    let getOrderV2Spy
    let getOrderActionSpy

    beforeEach(() => {
      getOrderV2Spy = jest.spyOn(orderSelectors, 'getOrderV2').mockImplementation(jest.fn)
      getOrderActionSpy = jest.spyOn(orderSelectors, 'getOrderAction').mockImplementation(jest.fn)
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    test('should mark ORDER_SAVE as pending', async () => {
      jest.spyOn(orderV2, 'updateOrder').mockImplementation(jest.fn().mockReturnValueOnce(
        new Promise((resolve) => { resolve(resolve) })
      ))

      await sendUpdateOrder()(dispatch, getState)

      expect(pending).toHaveBeenCalledTimes(2)
      expect(pending).toHaveBeenNthCalledWith(1, 'ORDER_SAVE', true)
      expect(pending).toHaveBeenNthCalledWith(2, 'ORDER_SAVE', false)
    })

    test('should mark ORDER_SAVE as errored if it errors', async () => {
      const err = new Error('oops')
      jest.spyOn(orderV2, 'updateOrder').mockImplementation(jest.fn().mockReturnValueOnce(
        new Promise((resolve, reject) => { reject(err) })
      ))

      await sendUpdateOrder()(dispatch, getState)

      expect(pending).toHaveBeenCalledTimes(3)
      expect(pending).toHaveBeenNthCalledWith(1, 'ORDER_SAVE', true)
      expect(pending).toHaveBeenNthCalledWith(2, 'BASKET_CHECKOUT', false)
      expect(pending).toHaveBeenNthCalledWith(3, 'ORDER_SAVE', false)

      expect(error).toHaveBeenCalledTimes(2)
      expect(error).toHaveBeenNthCalledWith(1, 'ORDER_SAVE', null)
      expect(error).toHaveBeenNthCalledWith(2, 'ORDER_SAVE', err.message)
      expect(dispatch).toBeCalledTimes(5)
    })

    test('should map the arguments through to updateOrder correctly', async () => {
      const updateOrderSpy = jest.spyOn(orderV2, 'updateOrder').mockImplementation(jest.fn().mockReturnValueOnce(
        new Promise((resolve) => { resolve({ data: { id: 'order_id' } }) })
      ))
      const getBasketOrderIdSpy = jest.spyOn(basketSelectors, 'getBasketOrderId').mockReturnValue('order-id')
      getOrderV2Spy.mockReturnValue({ id: 'order_id' })

      await sendUpdateOrder()(dispatch, getState)

      expect(getOrderV2Spy).toBeCalledWith(getState())
      expect(getOrderV2Spy).toHaveBeenCalledTimes(1)
      expect(getBasketOrderIdSpy).toBeCalledWith(getState())
      expect(getBasketOrderIdSpy).toHaveBeenCalledTimes(1)
      expect(updateOrderSpy).toHaveBeenCalledTimes(1)
      expect(updateOrderSpy).toHaveBeenCalledWith('access-token', 'order-id', { id: 'order_id' }, 'user-id')
    })

    test('should redirect the user to the order summary page if it succeeds', async () => {
      getOrderActionSpy.mockReturnValue('order_action')
      getOrderV2Spy.mockReturnValue({ id: 'not_this_order_id', order_action: 'order_action' })
      jest.spyOn(orderV2, 'updateOrder').mockImplementation(jest.fn().mockReturnValueOnce(
        new Promise((resolve) => { resolve({ data: { id: 'order_id' } }) })
      ))

      await sendUpdateOrder()(dispatch, getState)

      expect(orderConfirmationRedirect).toHaveBeenCalledWith(
        'order-id',
        'order_action',
      )
    })

    test('should call sendClientMetric with correct details', async () => {
      jest.spyOn(orderV2, 'updateOrder').mockImplementation(jest.fn().mockReturnValueOnce(
        new Promise((resolve) => { resolve({ data: { id: 'order_id' } }) })
      ))

      await sendUpdateOrder()(dispatch, getState)

      expect(sendClientMetricMock).toHaveBeenCalledWith('menu-edit-complete-order-api-v2', 1, 'Count')
    })
  })

  describe('fetchUserOrders', () => {
    const accessToken = 'access-token'
    const limit = 10
    const userId = 'user-id'
    const orderType = 'pending'

    describe('when useOrderApiV2 is true', () => {
      const useOrderApiV2 = true

      beforeEach(() => {
        getUserOrders.mockResolvedValue({
          data: [
            { id: 'a' }, { id: 'b' }
          ],
          included: []
        })

        transformOrderV2ToOrderV1.mockImplementation((order) => `transformed-order-${order.id}`)
      })

      test('should call getUserOrders with correct parameters', async () => {
        await fetchUserOrders(accessToken, limit, userId, orderType, useOrderApiV2)

        expect(getUserOrders).toHaveBeenCalledWith(accessToken, userId, null, null, limit)
      })

      test('should return transformed orders', async () => {
        const result = await fetchUserOrders(accessToken, limit, userId, orderType, useOrderApiV2)

        expect(result).toEqual([
          'transformed-order-a',
          'transformed-order-b'
        ])
      })
    })

    describe('when useOrderApiV2 is false', () => {
      const useOrderApiV2 = false

      beforeEach(() => {
        userApi.fetchUserOrders.mockResolvedValue({
          data: [
            { id: 'a' }, { id: 'b' }
          ]
        })
      })

      test('should call core (userApi.fetchUserOrders) with correct parameters', async () => {
        await fetchUserOrders(accessToken, limit, userId, orderType, useOrderApiV2)

        expect(userApi.fetchUserOrders).toHaveBeenCalledWith(accessToken, {
          limit,
          sort_order: 'desc',
          state: orderType,
          includes: ['shipping_address']
        })
      })

      test('should return orders from core', async () => {
        const result = await fetchUserOrders(accessToken, limit, userId, orderType, useOrderApiV2)

        expect(result).toEqual([
          { id: 'a' }, { id: 'b' }
        ])
      })
    })
  })
})
