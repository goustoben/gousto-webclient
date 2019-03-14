import orderActions from '../order'
import Immutable from 'immutable'
import statusActions from '../status'
import utils from 'utils/window'
import orderConfirmation from '../orderConfirmation'
import orderApi from 'apis/orders'

jest.mock('apis/orders')

jest.mock('../orderConfirmation', () => ({
  orderDetails: jest.fn()
}))

jest.mock('utils/window', () => ({
  redirect: jest.fn()
}))
jest.mock('../status', () => ({
  pending: jest.fn(),
  error: jest.fn()
}))

jest.mock('../products', () => ({
  productsLoadCategories: jest.fn()
}))

describe('orderUpdate', function () {
  let pendingSpy
  let orderId
  let recipes
  let coreDayId
  let coreSlotId
  let numPortions
  let orderAction
  let dispatchSpy
  let errorSpy
  let saveOrderSpy
  let redirectSpy
  
  beforeEach(() => {
    orderId = '12345'
    recipes = [1, 2, 3, 4, 5]
    coreDayId = 3
    coreSlotId = 8
    numPortions = 3
    orderAction = 'transaction'
    pendingSpy = jest.spyOn(statusActions, 'pending')
    errorSpy = jest.spyOn(statusActions, 'error')
    saveOrderSpy = jest.spyOn(orderApi, 'saveOrder')
    redirectSpy = jest.spyOn(utils, 'redirect')
    dispatchSpy = jest.fn()
  })
  
  describe('Redirect to old stack orderSummary', () => {
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
      orderApi.saveOrder.mockImplementation(jest.fn().mockReturnValueOnce(
        new Promise((resolve, reject) => { resolve(resolve) })
      ))
      await orderActions.orderUpdate(orderId, recipes, coreDayId, coreSlotId, numPortions, orderAction)(dispatchSpy, getStateSpy)
  
      expect(pendingSpy).toHaveBeenCalled()
      expect(pendingSpy.mock.calls[0][0]).toEqual('ORDER_SAVE')
      expect(pendingSpy.mock.calls[0][1]).toBe(true)
      expect(pendingSpy.mock.calls[1][0]).toEqual('ORDER_SAVE')
      expect(pendingSpy.mock.calls[1][1]).toBe(false)
      expect(pendingSpy.mock.calls.length).toBe(2)
    })
  
    test('should mark ORDER_SAVE as errored if it errors', async function () {
      const err = new Error('oops')
      orderApi.saveOrder.mockImplementation(jest.fn().mockReturnValueOnce(
        new Promise((resolve, reject) => { reject(err) })
      ))
      await orderActions.orderUpdate(orderId, recipes, coreDayId, coreSlotId, numPortions, orderAction)(dispatchSpy, getStateSpy)
  
      expect(pendingSpy).toHaveBeenCalled()
      expect(pendingSpy.mock.calls[0][0]).toEqual('ORDER_SAVE')
      expect(pendingSpy.mock.calls[0][1]).toBe(true)
      expect(pendingSpy.mock.calls[1][0]).toEqual('BASKET_CHECKOUT')
      expect(pendingSpy.mock.calls[1][1]).toBe(false)
      expect(pendingSpy.mock.calls[2][0]).toEqual('ORDER_SAVE')
      expect(pendingSpy.mock.calls[2][1]).toBe(false)
  
      expect(errorSpy).toHaveBeenCalledTimes(2)
      expect(errorSpy.mock.calls[0][0]).toEqual('ORDER_SAVE')
      expect(errorSpy.mock.calls[0][1]).toBe(null)
      expect(errorSpy.mock.calls[1][0]).toEqual('ORDER_SAVE')
      expect(errorSpy.mock.calls[1][1]).toEqual(err.message)
      expect(dispatchSpy.mock.calls.length).toEqual(5)
    })
  
    test('should map the arguments through to saveOrder correctly', async function () {
      await orderActions.orderUpdate(orderId, recipes, coreDayId, coreSlotId, numPortions, orderAction)(dispatchSpy, getStateSpy)
  
      expect(saveOrderSpy).toHaveBeenCalledTimes(1)
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
      expect(saveOrderSpy.mock.calls[0][0]).toEqual('access-token')
      expect(saveOrderSpy.mock.calls[0][1]).toEqual('12345')
      expect(saveOrderSpy.mock.calls[0][2]).toEqual(order)
    })
  
    test('should redirect the user to the order summary page if it succeeds', async function () {
      orderAction = 'something'
      orderApi.saveOrder.mockImplementation(jest.fn().mockReturnValueOnce(
        new Promise((resolve, reject) => { resolve({ data: { id: '5678' } }) })
      ))
      await orderActions.orderUpdate(orderId, recipes, coreDayId, coreSlotId, numPortions, orderAction)(dispatchSpy, getStateSpy)
  
      expect(redirectSpy).toHaveBeenCalledWith('/order/5678/summary?order_action=something')
    })
    
  })

  describe('Redirect to new stack orderConfirmation', () => {
    let getStateSpy
    beforeEach(function () {
      getStateSpy = () => ({
        auth: Immutable.Map({ accessToken: 'access-token' }),
        features: Immutable.Map({
          orderConfirmation: Immutable.Map({
            value: true,
          })
        })
      })
    })

    test('should call orderDetails action ', async () => {
      orderApi.saveOrder.mockImplementation(jest.fn().mockReturnValue(
        new Promise((resolve, reject) => { resolve({ data: { id: '12345' } }) })
      ))
      const orderDetailsSpy = jest.spyOn(orderConfirmation, 'orderDetails')
      await orderActions.orderUpdate(orderId, recipes, coreDayId, coreSlotId, numPortions, orderAction)(dispatchSpy, getStateSpy)
      expect(orderDetailsSpy).toHaveBeenCalled()
    })
  })

})

