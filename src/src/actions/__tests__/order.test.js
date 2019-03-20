import Immutable from 'immutable'
import orderActions from '../order'
import statusActions from '../status'
import utils from 'utils/window'
import orderConfirmation from '../orderConfirmation'
import orderApi from 'apis/orders'
import { getOrderDetails } from 'utils/basket'

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

jest.mock('apis/user', () => ({
  saveUserOrder: jest.fn()
}))

jest.mock('utils/basket', () => ({
  getOrderDetails: jest.fn()
}))

describe('Order Actions', () => {
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
  let updateOrderAddressSpy
  let orderCancelSpy

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
    orderCancelSpy = jest.spyOn(orderApi, 'cancelOrder')
    updateOrderAddressSpy = jest.spyOn(orderApi, 'updateOrderAddress')
    redirectSpy = jest.spyOn(utils, 'redirect')
    dispatchSpy = jest.fn()
  })

  describe.skip('orderUpdate', () => {
    
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

      recipes = Immutable.List([1, 2, 3, 4])
      orderApi.saveOrder.mockImplementation(jest.fn().mockReturnValue(
        new Promise((resolve, reject) => { resolve(resolve)})
      ))
      orderApi.cancelOrder.mockImplementation(jest.fn().mockReturnValue(
        new Promise((resolve, reject) => { resolve()})
      ))
      orderApi.updateOrderAddress.mockImplementation(jest.fn().mockReturnValue(
        new Promise((resolve, reject) => { resolve()})
      ))
      getOrderDetails.mockReturnValue({
        recipe_choices: recipes.map(id => ({ id, type: 'Recipe', quantity: numPortions })),
        delivery_slot_id: coreSlotId,
        delivery_day_id: coreDayId,
      })
    })
    test.only('should mark ORDER_SAVE as pending', async function(){
      await orderActions.orderAssignToUser(orderAction)(dispatchSpy, getStateSpy)
    
      expect(pendingSpy.mock.calls.length).toBe(3)
      expect(pendingSpy.mock.calls[0][0]).toEqual('ORDER_SAVE')
      expect(pendingSpy.mock.calls[0][1]).toBe(true)
      expect(pendingSpy.mock.calls[1][0]).toEqual('ORDER_SAVE')
      expect(pendingSpy.mock.calls[1][1]).toBe(false)
      expect(dispatchSpy.mock.calls).toBe(true)
    })
    
    // test('should mark ORDER_SAVE as errored with "save-order-fail" if it fails on saving order', async function() {
    //   const err = new Error('oops')
    //   saveUserOrderSpy = () => new Promise((resolve, reject) => { reject(err) })
    //   orderActions = require('inject-loader?apis/orders&apis/user&utils/window&utils/basket&./status&./checkout!actions/order')({ // eslint-disable-line global-require
    //     'apis/orders': {
    //       saveOrder: saveOrderSpy,
    //     },
    //     'apis/user': {
    //       saveUserOrder: saveUserOrderSpy,
    //     },
    //     'utils/window': {
    //       redirect: redirectSpy,
    //     },
    //     'utils/basket': {
    //       getOrderDetails: sandbox.stub().returns({
    //         recipe_choices: recipes.map(id => ({ id, type: 'Recipe', quantity: numPortions })),
    //         delivery_slot_id: coreSlotId,
    //         delivery_day_id: coreDayId,
    //       }),
    //     },
    //     './checkout': {
    //       checkoutErrorHandling,
    //     },
    //     './status': {
    //       pending: pendingSpy,
    //       error: errorSpy,
    //     },
    //   }).default
    //   await orderActions.orderAssignToUser(orderAction)(dispatchSpy, getStateSpy)
    
    //   expect(pendingSpy.calledThrice).to.be.true
    //   expect(pendingSpy.getCall(0).args[0]).to.equal('ORDER_SAVE')
    //   expect(pendingSpy.getCall(0).args[1]).to.be.true
    //   expect(pendingSpy.getCall(1).args[0]).to.equal('BASKET_CHECKOUT')
    //   expect(pendingSpy.getCall(1).args[1]).to.be.false
    //   expect(pendingSpy.getCall(2).args[0]).to.equal('ORDER_SAVE')
    //   expect(pendingSpy.getCall(2).args[1]).to.be.false
    
    //   expect(errorSpy.calledTwice).to.be.true
    //   expect(errorSpy.getCall(0).args[0]).to.equal('ORDER_SAVE')
    //   expect(errorSpy.getCall(0).args[1]).to.be.null
    //   expect(errorSpy.getCall(1).args[0]).to.equal('ORDER_SAVE')
    //   expect(errorSpy.getCall(1).args[1]).to.equal('save-order-fail')
    // })
    
    // test('should mark ORDER_SAVE as errored with "update-order-fail" if it fails on updating order', async function() {
    //   const orderSaveErr = new Error('user already has an order for chosen delivery day')
    //   const orderUpdateErr = new Error('user already has an order for chosen delivery day')
    //   saveUserOrderSpy = () => new Promise((resolve, reject) => { reject(orderSaveErr) })
    //   const updateUserOrderSpy = () => new Promise((resolve, reject) => { reject(orderUpdateErr) })
    //   orderActions = require('inject-loader?apis/orders&apis/user&utils/window&utils/basket&./status&./checkout!actions/order')({ // eslint-disable-line global-require
    //     'apis/orders': {
    //       saveOrder: saveOrderSpy,
    //     },
    //     'apis/user': {
    //       saveUserOrder: saveUserOrderSpy,
    //       updateUserOrder: updateUserOrderSpy,
    //     },
    //     'utils/window': {
    //       redirect: redirectSpy,
    //     },
    //     'utils/basket': {
    //       getOrderDetails: sandbox.stub().returns({
    //         recipe_choices: recipes.map(id => ({ id, type: 'Recipe', quantity: numPortions })),
    //         delivery_slot_id: coreSlotId,
    //         delivery_day_id: coreDayId,
    //       }),
    //     },
    //     './checkout': {
    //       checkoutErrorHandling,
    //     },
    //     './status': {
    //       pending: pendingSpy,
    //       error: errorSpy,
    //     },
    //   }).default
    //   await orderActions.orderAssignToUser(orderAction, 'order-123')(dispatchSpy, getStateSpy)
    
    //   expect(errorSpy).to.have.been.calledWithExactly(actionTypes.ORDER_SAVE, 'update-order-fail')
    // })
    
    // test('should call updateUserOrder with orderDetails & existingOrderId if saving order fails due to an order already existing on given day & existingOrderId is provided', async function() {
    //   const orderSaveErr = new Error('user already has an order for chosen delivery day')
    //   saveUserOrderSpy = () => new Promise((resolve, reject) => { reject(orderSaveErr) })
    //   const updateUserOrderSpy = sandbox.spy()
    //   orderActions = require('inject-loader?apis/orders&apis/user&utils/window&utils/basket&./status&./checkout!actions/order')({ // eslint-disable-line global-require
    //     'apis/orders': {
    //       saveOrder: saveOrderSpy,
    //     },
    //     'apis/user': {
    //       saveUserOrder: saveUserOrderSpy,
    //       updateUserOrder: updateUserOrderSpy,
    //     },
    //     'utils/window': {
    //       redirect: redirectSpy,
    //     },
    //     'utils/basket': {
    //       getOrderDetails: sandbox.stub().returns({
    //         recipe_choices: recipes.map(id => ({ id, type: 'Recipe', quantity: numPortions })),
    //         delivery_slot_id: coreSlotId,
    //         delivery_day_id: coreDayId,
    //       }),
    //     },
    //     './checkout': {
    //       checkoutErrorHandling,
    //     },
    //     './status': {
    //       pending: pendingSpy,
    //       error: errorSpy,
    //     },
    //   }).default
    //   await orderActions.orderAssignToUser(orderAction, 'order-123')(dispatchSpy, getStateSpy)
    
    //   expect(updateUserOrderSpy).to.have.been.calledWithExactly('access-token', {
    //     recipe_choices: [
    //       { id: 1, quantity: 3, type: 'Recipe' },
    //       { id: 2, quantity: 3, type: 'Recipe' },
    //       { id: 3, quantity: 3, type: 'Recipe' },
    //       { id: 4, quantity: 3, type: 'Recipe' },
    //       { id: 5, quantity: 3, type: 'Recipe' },
    //     ],
    //     delivery_slot_id: coreSlotId,
    //     delivery_day_id: coreDayId,
    //     order_id: 'order-123',
    //   })
    // })
    
    // test('should redirect the user to the order summary page if it succeeds on saving new order', async function() {
    //   await orderActions.orderAssignToUser(orderAction)(dispatchSpy, getStateSpy)
    
    //   expect(redirectSpy.withArgs('/order/5678/summary?order_action=transaction').calledOnce).to.be.true
    // })
    
    // test('should redirect the user to the order summary page if it succeeds on updating existing order', async function() {
    //   const orderSaveErr = new Error('user already has an order for chosen delivery day')
    //   saveUserOrderSpy = () => new Promise((resolve, reject) => { reject(orderSaveErr) })
    //   orderActions = require('inject-loader?apis/orders&apis/user&utils/window&utils/basket&./status&./checkout!actions/order')({ // eslint-disable-line global-require
    //     'apis/orders': {
    //       saveOrder: saveOrderSpy,
    //     },
    //     'apis/user': {
    //       saveUserOrder: saveUserOrderSpy,
    //       updateUserOrder: () => new Promise(resolve => { resolve({ data: { id: '5678' } }) }),
    //     },
    //     'utils/window': {
    //       redirect: redirectSpy,
    //     },
    //     'utils/basket': {
    //       getOrderDetails: sandbox.stub().returns({
    //         recipe_choices: recipes.map(id => ({ id, type: 'Recipe', quantity: numPortions })),
    //         delivery_slot_id: coreSlotId,
    //         delivery_day_id: coreDayId,
    //       }),
    //     },
    //     './checkout': {
    //       checkoutErrorHandling,
    //     },
    //     './status': {
    //       pending: pendingSpy,
    //       error: errorSpy,
    //     },
    //   }).default
    //   await orderActions.orderAssignToUser(orderAction, 'order-123')(dispatchSpy, getStateSpy)
    
    //   expect(redirectSpy.withArgs('/order/5678/summary?order_action=transaction').calledOnce).to.be.true
    // })

  })
})
