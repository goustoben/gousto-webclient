import Immutable from 'immutable'

import { getOrderDetails } from 'utils/basket'
import { saveUserOrder, updateUserOrder } from 'apis/user'
import { saveOrder, cancelOrder, updateOrderAddress } from 'apis/orders'
import { orderConfirmationRedirect } from 'actions/orderConfirmation'
import { pending, error } from 'actions/status'

import orderActions from '../order'

jest.mock('apis/orders', () => ({
  saveOrder: jest.fn(),
  cancelOrder: jest.fn(),
  updateOrderAddress: jest.fn(),
}))

jest.mock('actions/orderConfirmation', () => ({
  orderDetails: jest.fn(),
  orderConfirmationRedirect: jest.fn(),
}))

jest.mock('utils/window', () => ({
  redirect: jest.fn()
}))
jest.mock('actions/status', () => ({
  pending: jest.fn(),
  error: jest.fn()
}))

jest.mock('apis/user', () => ({
  saveUserOrder: jest.fn(),
  updateUserOrder: jest.fn()
}))

jest.mock('utils/basket', () => ({
  getOrderDetails: jest.fn()
}))

describe('order actions', () => {
  let orderId
  let recipes
  let coreDayId
  let coreSlotId
  let numPortions
  let orderAction
  let dispatchSpy

  beforeEach(() => {
    orderId = '12345'
    recipes = [1, 2, 3, 4, 5]
    coreDayId = 3
    coreSlotId = 8
    numPortions = 3
    orderAction = 'transaction'
    dispatchSpy = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('orderUpdate', () => {
    let getStateSpy
    beforeEach(function () {
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
      jest.resetAllMocks()
    })

    test('should mark ORDER_SAVE as pending', async function () {
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

    test('should mark ORDER_SAVE as errored if it errors', async function () {
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

    test('should map the arguments through to saveOrder correctly', async function () {
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

    test('should redirect the user to the order summary page if it succeeds', async function () {
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

  describe('orderAssignToUser', () => {
    let getStateSpy
    beforeEach(() => {
      getStateSpy = () => ({
        auth: Immutable.Map({ accessToken: 'access-token' }),
        features: Immutable.Map({
          orderConfirmation: Immutable.Map({
            value: false,
          })
        }),
        basket:Immutable.Map({

        })
      })

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

    test('should mark ORDER_SAVE as pending', async function(){
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

    test('should mark ORDER_SAVE as errored with "save-order-fail" if it fails on saving order', async function() {
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

    test('should mark ORDER_SAVE as errored with "update-order-fail" if it fails on updating order', async function() {
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

    test('should call updateUserOrder with orderDetails & existingOrderId if saving order fails due to an order already existing on given day & existingOrderId is provided', async function() {
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

    test('should redirect the user to the order summary page if it succeeds on saving new order', async function() {
      saveUserOrder.mockImplementation(jest.fn().mockReturnValue(
        new Promise((resolve) => { resolve({ data: { id: '4321' } })})
      ))

      await orderActions.orderAssignToUser(orderAction, 'order-123')(dispatchSpy, getStateSpy)

      expect(orderConfirmationRedirect).toHaveBeenCalledWith(
        '4321',
        'transaction',
      )
    })

    test('should redirect the user to the order summary page if it succeeds on updating existing order', async function() {
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
})
