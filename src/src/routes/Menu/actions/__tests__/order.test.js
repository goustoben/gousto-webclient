import Immutable from 'immutable'

import {
  saveOrder,
  fetchOrder,
  cancelOrder,
  updateOrderAddress,
} from 'apis/orders'
import actionStatus from 'actions/status'
import { getOrderDetails } from 'utils/basket'
import * as deliveriesUtils from 'utils/deliveries'
import { saveUserOrder, updateUserOrder } from 'apis/user'
import { orderConfirmationRedirect } from 'actions/orderConfirmation'

import * as clientMetrics from 'routes/Menu/apis/clientMetrics'
import { orderAssignToUser } from '../order'

import { safeJestMock } from '../../../../_testing/mocks'

jest.mock('apis/user')
jest.mock('apis/orders')
jest.mock('utils/basket')
jest.mock('actions/status')
jest.mock('actions/tracking')
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

deliveriesUtils.getSlot = jest.fn()
deliveriesUtils.getAvailableDeliveryDays = jest.fn()
deliveriesUtils.transformDaySlotLeadTimesToMockSlots = jest.fn()

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
      onScreenRecovery: Immutable.Map({
        valueProposition: 'mock-value-proposition',
        offer: 'mock-offer'
      }),
      user: Immutable.Map({
        newOrders: [Immutable.fromJS({ id: '123', orderState: 'scheduled' })]
      })
    })

    deliveriesUtils.getSlot.mockReturnValue(Immutable.fromJS({
      coreSlotId: '4',
      id: 'deliveries-uuid',
      daySlotLeadTimeId: 'day-slot-lead-time-uuid'
    }))

    sendClientMetricMock.mockReset()
  })

  afterEach(() => {
    jest.clearAllMocks()
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
})
