import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
import Immutable from 'immutable' /* eslint-disable new-cap */
import actionTypes from 'actions/actionTypes'
import userActions from 'actions/user'

describe('order actions', function() {
  let sandbox
  let orderActions
  let redirectSpy
  let pendingSpy
  let errorSpy
  let saveOrderSpy
  let skipDeliverySpy
  let restoreDeliverySpy
  let fetchDeliveryDaysSpy
  let orderCancelSpy
  let getStateSpy
  let dispatchSpy
  let saveUserOrderSpy
  let checkoutErrorHandling
  let updateOrderAddressSpy

  beforeEach(function() {
    sandbox = sinon.sandbox.create()
    redirectSpy = sandbox.spy()
    pendingSpy = sandbox.spy()
    errorSpy = sandbox.spy()
    saveOrderSpy = sandbox.stub().returns(new Promise(resolve => { resolve({}) }))
    orderCancelSpy = sandbox.stub().returns(new Promise(resolve => { resolve({}) }))
    skipDeliverySpy = sandbox.stub().returns(new Promise(resolve => { resolve({}) }))
    restoreDeliverySpy = sandbox.stub().returns(new Promise(resolve => { resolve({}) }))
    fetchDeliveryDaysSpy = sandbox.stub().returns(new Promise(resolve => { resolve({}) }))
    saveUserOrderSpy = sandbox.spy()
    getStateSpy = sandbox.stub().returns({
      auth: Immutable.Map({ accessToken: 'access-token' }),
    })
    dispatchSpy = sandbox.spy()
    checkoutErrorHandling = sandbox.spy()
    updateOrderAddressSpy = sandbox.stub().returns(new Promise(resolve => { resolve({}) }))

    orderActions = require('inject-loader?apis/orders&apis/user&apis/deliveries&utils/window&utils/basket&./status&./checkout!actions/order')({ // eslint-disable-line global-require
      'apis/orders': {
        saveOrder: saveOrderSpy,
        cancelOrder: orderCancelSpy,
        updateOrderAddress: updateOrderAddressSpy,
      },
      'apis/user': {
        saveUserOrder: saveUserOrderSpy,
        skipDelivery: skipDeliverySpy,
        restoreDelivery: restoreDeliverySpy,
      },
      'apis/deliveries': {
        fetchDeliveryDays: fetchDeliveryDaysSpy,
      },
      'utils/window': {
        redirect: redirectSpy,
      },
      './checkout': {
        checkoutErrorHandling,
      },
      './status': {
        pending: pendingSpy,
        error: errorSpy,
      },
    }).default
  })

  afterEach(function() {
    sandbox.restore()
  })

  describe('orderAssignToUser', function() {
    let recipes
    let coreDayId
    let coreSlotId
    let numPortions
    let orderAction

    beforeEach(function() {
      recipes = [1, 2, 3, 4, 5]
      coreDayId = 3
      coreSlotId = 8
      numPortions = 3
      orderAction = 'transaction'
      saveUserOrderSpy = sandbox.stub().returns({ data: { id: '5678' } })
      orderActions = require('inject-loader?apis/orders&apis/user&utils/window&utils/basket&./status&./checkout!actions/order')({ // eslint-disable-line global-require
        'apis/orders': {
          saveOrder: saveOrderSpy,
        },
        'apis/user': {
          saveUserOrder: saveUserOrderSpy,
        },
        'utils/window': {
          redirect: redirectSpy,
        },
        'utils/basket': {
          getOrderDetails: sandbox.stub().returns({
            recipe_choices: recipes.map(id => ({ id, type: 'Recipe', quantity: numPortions })),
            delivery_slot_id: coreSlotId,
            delivery_day_id: coreDayId,
          }),
        },
        './checkout': {
          checkoutErrorHandling,
        },
        './status': {
          pending: pendingSpy,
          error: errorSpy,
        },
      }).default
    })

    it('should mark ORDER_SAVE as pending', async function(){
      await orderActions.orderAssignToUser(orderAction)(dispatchSpy, getStateSpy)

      expect(pendingSpy.calledTwice).to.be.true
      expect(pendingSpy.getCall(0).args[0]).to.equal('ORDER_SAVE')
      expect(pendingSpy.getCall(0).args[1]).to.be.true
      expect(pendingSpy.getCall(1).args[0]).to.equal('ORDER_SAVE')
      expect(pendingSpy.getCall(1).args[1]).to.be.false
      expect(dispatchSpy.calledThrice).to.be.true
    })

    it('should mark ORDER_SAVE as errored with "save-order-fail" if it fails on saving order', async function() {
      const err = new Error('oops')
      saveUserOrderSpy = () => new Promise((resolve, reject) => { reject(err) })
      orderActions = require('inject-loader?apis/orders&apis/user&utils/window&utils/basket&./status&./checkout!actions/order')({ // eslint-disable-line global-require
        'apis/orders': {
          saveOrder: saveOrderSpy,
        },
        'apis/user': {
          saveUserOrder: saveUserOrderSpy,
        },
        'utils/window': {
          redirect: redirectSpy,
        },
        'utils/basket': {
          getOrderDetails: sandbox.stub().returns({
            recipe_choices: recipes.map(id => ({ id, type: 'Recipe', quantity: numPortions })),
            delivery_slot_id: coreSlotId,
            delivery_day_id: coreDayId,
          }),
        },
        './checkout': {
          checkoutErrorHandling,
        },
        './status': {
          pending: pendingSpy,
          error: errorSpy,
        },
      }).default
      await orderActions.orderAssignToUser(orderAction)(dispatchSpy, getStateSpy)

      expect(pendingSpy.calledThrice).to.be.true
      expect(pendingSpy.getCall(0).args[0]).to.equal('ORDER_SAVE')
      expect(pendingSpy.getCall(0).args[1]).to.be.true
      expect(pendingSpy.getCall(1).args[0]).to.equal('BASKET_CHECKOUT')
      expect(pendingSpy.getCall(1).args[1]).to.be.false
      expect(pendingSpy.getCall(2).args[0]).to.equal('ORDER_SAVE')
      expect(pendingSpy.getCall(2).args[1]).to.be.false

      expect(errorSpy.calledTwice).to.be.true
      expect(errorSpy.getCall(0).args[0]).to.equal('ORDER_SAVE')
      expect(errorSpy.getCall(0).args[1]).to.be.null
      expect(errorSpy.getCall(1).args[0]).to.equal('ORDER_SAVE')
      expect(errorSpy.getCall(1).args[1]).to.equal('save-order-fail')
    })

    it('should mark ORDER_SAVE as errored with "update-order-fail" if it fails on updating order', async function() {
      const orderSaveErr = new Error('user already has an order for chosen delivery day')
      const orderUpdateErr = new Error('user already has an order for chosen delivery day')
      saveUserOrderSpy = () => new Promise((resolve, reject) => { reject(orderSaveErr) })
      const updateUserOrderSpy = () => new Promise((resolve, reject) => { reject(orderUpdateErr) })
      orderActions = require('inject-loader?apis/orders&apis/user&utils/window&utils/basket&./status&./checkout!actions/order')({ // eslint-disable-line global-require
        'apis/orders': {
          saveOrder: saveOrderSpy,
        },
        'apis/user': {
          saveUserOrder: saveUserOrderSpy,
          updateUserOrder: updateUserOrderSpy,
        },
        'utils/window': {
          redirect: redirectSpy,
        },
        'utils/basket': {
          getOrderDetails: sandbox.stub().returns({
            recipe_choices: recipes.map(id => ({ id, type: 'Recipe', quantity: numPortions })),
            delivery_slot_id: coreSlotId,
            delivery_day_id: coreDayId,
          }),
        },
        './checkout': {
          checkoutErrorHandling,
        },
        './status': {
          pending: pendingSpy,
          error: errorSpy,
        },
      }).default
      await orderActions.orderAssignToUser(orderAction, 'order-123')(dispatchSpy, getStateSpy)

      expect(errorSpy).to.have.been.calledWithExactly(actionTypes.ORDER_SAVE, 'update-order-fail')
    })

    it('should call updateUserOrder with orderDetails & existingOrderId if saving order fails due to an order already existing on given day & existingOrderId is provided', async function() {
      const orderSaveErr = new Error('user already has an order for chosen delivery day')
      saveUserOrderSpy = () => new Promise((resolve, reject) => { reject(orderSaveErr) })
      const updateUserOrderSpy = sandbox.spy()
      orderActions = require('inject-loader?apis/orders&apis/user&utils/window&utils/basket&./status&./checkout!actions/order')({ // eslint-disable-line global-require
        'apis/orders': {
          saveOrder: saveOrderSpy,
        },
        'apis/user': {
          saveUserOrder: saveUserOrderSpy,
          updateUserOrder: updateUserOrderSpy,
        },
        'utils/window': {
          redirect: redirectSpy,
        },
        'utils/basket': {
          getOrderDetails: sandbox.stub().returns({
            recipe_choices: recipes.map(id => ({ id, type: 'Recipe', quantity: numPortions })),
            delivery_slot_id: coreSlotId,
            delivery_day_id: coreDayId,
          }),
        },
        './checkout': {
          checkoutErrorHandling,
        },
        './status': {
          pending: pendingSpy,
          error: errorSpy,
        },
      }).default
      await orderActions.orderAssignToUser(orderAction, 'order-123')(dispatchSpy, getStateSpy)

      expect(updateUserOrderSpy).to.have.been.calledWithExactly('access-token', {
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

    it('should redirect the user to the order summary page if it succeeds on saving new order', async function() {
      await orderActions.orderAssignToUser(orderAction)(dispatchSpy, getStateSpy)

      expect(redirectSpy.withArgs('/order/5678/summary?order_action=transaction').calledOnce).to.be.true
    })

    it('should redirect the user to the order summary page if it succeeds on updating existing order', async function() {
      const orderSaveErr = new Error('user already has an order for chosen delivery day')
      saveUserOrderSpy = () => new Promise((resolve, reject) => { reject(orderSaveErr) })
      orderActions = require('inject-loader?apis/orders&apis/user&utils/window&utils/basket&./status&./checkout!actions/order')({ // eslint-disable-line global-require
        'apis/orders': {
          saveOrder: saveOrderSpy,
        },
        'apis/user': {
          saveUserOrder: saveUserOrderSpy,
          updateUserOrder: () => new Promise(resolve => { resolve({ data: { id: '5678' } }) }),
        },
        'utils/window': {
          redirect: redirectSpy,
        },
        'utils/basket': {
          getOrderDetails: sandbox.stub().returns({
            recipe_choices: recipes.map(id => ({ id, type: 'Recipe', quantity: numPortions })),
            delivery_slot_id: coreSlotId,
            delivery_day_id: coreDayId,
          }),
        },
        './checkout': {
          checkoutErrorHandling,
        },
        './status': {
          pending: pendingSpy,
          error: errorSpy,
        },
      }).default
      await orderActions.orderAssignToUser(orderAction, 'order-123')(dispatchSpy, getStateSpy)

      expect(redirectSpy.withArgs('/order/5678/summary?order_action=transaction').calledOnce).to.be.true
    })
  })

  describe('orderCheckPossibleDuplicate', function() {
    let orderActions
    let userLoadOrdersSpy
    let tempSpy
    beforeEach(function() {
      userLoadOrdersSpy = sandbox.spy()
      tempSpy = sandbox.spy()
      orderActions = require('inject-loader!actions/order')({ // eslint-disable-line global-require
        './user': {
          userLoadOrders: userLoadOrdersSpy,
        },
        './temp': {
          temp: tempSpy,
        },
      }).default
      getStateSpy = sandbox.stub().returns({
        user: Immutable.Map({}),
      })
    })

    it('should get the users last 5 orders in any state', async function() {
      await orderActions.orderCheckPossibleDuplicate('order id')(dispatchSpy, getStateSpy)
      expect(userLoadOrdersSpy).to.have.been.calledOnce
      expect(userLoadOrdersSpy.getCall(0).args).to.deep.equal([true, 'any', 5])
    })

    describe('with orders', function() {
      beforeEach(function() {
        getStateSpy = sandbox.stub().returns({
          user: Immutable.fromJS({
            orders: [
              {
                id: '123',
                deliveryDate: '2017-01-01',
              },
              {
                id: '234',
                deliveryDate: '2017-01-02',
              },
              {
                id: '345',
                deliveryDate: '2016-12-30',
              },
            ],
          }),
        })
      })

      it('should dispatch a temp action with key closeOrderIds and value Immutable List of orderIds which are +- 6 days of the order with given orderId', async function() {
        await orderActions.orderCheckPossibleDuplicate('123')(dispatchSpy, getStateSpy)
        expect(dispatchSpy).to.have.been.calledTwice
        expect(tempSpy).to.have.been.calledOnce
        expect(tempSpy.getCall(0).args[0]).to.equal('closeOrderIds')
        expect(tempSpy.getCall(0).args[1].toJS()).to.deep.equal(['123', '234', '345'])
      })

      it('should not dispatch a temp action if the order id given cant be found', async function() {
        await orderActions.orderCheckPossibleDuplicate('junk')(dispatchSpy, getStateSpy)
        expect(dispatchSpy).to.have.been.calledOnce
        expect(tempSpy).not.to.have.been.called
      })
    })
  })

  describe('projectedOrderCancel', function() {
    let orderId

    beforeEach(function() {
      orderId = '12345'
    })

    it('should mark PROJECTED_ORDER_CANCEL as pending', async function() {
      await orderActions.projectedOrderCancel(orderId)(dispatchSpy, getStateSpy)

      expect(pendingSpy.calledTwice).to.be.true
      expect(pendingSpy.getCall(0).args[0]).to.equal(actionTypes.PROJECTED_ORDER_CANCEL)
      expect(pendingSpy.getCall(0).args[1]).to.be.true
      expect(pendingSpy.getCall(1).args[0]).to.equal(actionTypes.PROJECTED_ORDER_CANCEL)
      expect(pendingSpy.getCall(1).args[1]).to.be.false
    })

    it('should mark PROJECTED_ORDER_CANCEL as errored if it errors and include the order id', async function() {
      const err = new Error('oops')
      skipDeliverySpy = () => new Promise((resolve, reject) => { reject(err) })
      orderActions = require('inject-loader?apis/user&./status!actions/order')({ // eslint-disable-line global-require
        'apis/user': {
          skipDelivery: skipDeliverySpy,
        },
        './status': {
          pending: pendingSpy,
          error: errorSpy,
        },
      }).default
      await orderActions.projectedOrderCancel(orderId)(dispatchSpy, getStateSpy)

      expect(errorSpy.calledTwice).to.be.true
      expect(errorSpy.getCall(0).args[0]).to.equal(actionTypes.PROJECTED_ORDER_CANCEL)
      expect(errorSpy.getCall(0).args[1]).to.be.null
      expect(errorSpy.getCall(1).args[0]).to.equal(actionTypes.PROJECTED_ORDER_CANCEL)
      expect(errorSpy.getCall(1).args[1]).to.deep.equal({ error: 'oops', orderId: '12345' })
    })

    it('should cancel the order and dispatch PROJECTED_ORDER_CANCEL action with the order', async function() {
      await orderActions.projectedOrderCancel(orderId)(dispatchSpy, getStateSpy)

      expect(skipDeliverySpy).to.have.been.calledOnce
      expect(dispatchSpy).to.have.been.calledWithExactly({
        type: actionTypes.PROJECTED_ORDER_CANCEL,
        orderId,
      })
    })

    it('should scroll to the order card', async function() {
      await orderActions.projectedOrderCancel(orderId)(dispatchSpy, getStateSpy)

      expect(location.hash).to.equal('#order-12345')
    })

    it('should call the close card action', async function() {
      const userOpenCloseOrderCardStub = sandbox.stub(userActions, 'userOpenCloseOrderCard')
      userOpenCloseOrderCardStub.withArgs('12345', true).returns('aaabbb')
      await orderActions.projectedOrderCancel(orderId)(dispatchSpy, getStateSpy)

      expect(dispatchSpy).to.have.been.calledWithExactly(userOpenCloseOrderCardStub('12345', true))
    })

    describe('All boxes cancelled modal', function() {
      it('should dispatch CANCELLED_ALL_BOXES_MODAL_VISIBILITY_CHANGE with the pending orders dates if cancelling the last scheduled order', async function() {
        getStateSpy = sandbox.stub().returns({
          auth: Immutable.Map({ accessToken: 'access-token' }),
          user: Immutable.fromJS({
            newOrders: {
              111: { orderState: 'cancelled' },
              222: { orderState: 'confirmed', deliveryDay: '2000-01-03' },
              333: { orderState: 'dispatched', deliveryDay: '2000-01-02' },
            },
          }),
          subscription: Immutable.fromJS({ subscription: { state: 'active' } }),
        })
        await orderActions.projectedOrderCancel(orderId)(dispatchSpy, getStateSpy)

        expect(dispatchSpy).to.have.been.calledWithExactly({
          type: actionTypes.CANCELLED_ALL_BOXES_MODAL_VISIBILITY_CHANGE,
          visibility: true,
          pendingOrdersDates: Immutable.Map({ 222: '2000-01-03', 333: '2000-01-02' }),
        })
      })

      it('should NOT dispatch CANCELLED_ALL_BOXES_MODAL_VISIBILITY_CHANGE if there are still scheduled orders', async function() {
        getStateSpy = sandbox.stub().returns({
          auth: Immutable.Map({ accessToken: 'access-token' }),
          user: Immutable.fromJS({
            newOrders: {
              111: { orderState: 'scheduled' },
              222: { orderState: 'confirmed', deliveryDay: '2000-01-03' },
              333: { orderState: 'dispatched', deliveryDay: '2000-01-02' },
            },
          }),
          subscription: Immutable.fromJS({ subscription: { state: 'active' } }),
        })
        await orderActions.projectedOrderCancel(orderId)(dispatchSpy, getStateSpy)

        expect(dispatchSpy.neverCalledWithMatch({
          type: actionTypes.CANCELLED_ALL_BOXES_MODAL_VISIBILITY_CHANGE,
        })).to.equal(true)
      })

      it('should NOT dispatch CANCELLED_ALL_BOXES_MODAL_VISIBILITY_CHANGE if the subscription is not active', async function() {
        getStateSpy = sandbox.stub().returns({
          auth: Immutable.Map({ accessToken: 'access-token' }),
          user: Immutable.fromJS({
            newOrders: {
              111: { orderState: 'cancelled' },
              222: { orderState: 'confirmed', deliveryDay: '2000-01-03' },
              333: { orderState: 'dispatched', deliveryDay: '2000-01-02' },
            },
          }),
          subscription: Immutable.fromJS({ subscription: { state: 'inactive' } }),
        })
        await orderActions.projectedOrderCancel(orderId)(dispatchSpy, getStateSpy)

        expect(dispatchSpy.neverCalledWithMatch({
          type: actionTypes.CANCELLED_ALL_BOXES_MODAL_VISIBILITY_CHANGE,
        })).to.equal(true)
      })
    })
  })

  describe('orderCancel', function() {
    const orderId = '12345'

    it('should mark ORDER_CANCEL as pending', async function() {
      await orderActions.orderCancel(orderId)(dispatchSpy, getStateSpy)

      expect(pendingSpy.calledTwice).to.be.true
      expect(pendingSpy.getCall(0).args[0]).to.equal(actionTypes.ORDER_CANCEL)
      expect(pendingSpy.getCall(0).args[1]).to.be.true
      expect(pendingSpy.getCall(1).args[0]).to.equal(actionTypes.ORDER_CANCEL)
      expect(pendingSpy.getCall(1).args[1]).to.be.false
      expect(dispatchSpy.callCount).to.equal(4)
    })

    it('should mark ORDER_CANCEL as errored if it errors', async function() {
      const err = new Error('oops')
      orderCancelSpy = () => new Promise((resolve, reject) => { reject(err) })
      orderActions = require('inject-loader?apis/orders&./status!actions/order')({ // eslint-disable-line global-require
        'apis/orders': {
          cancelOrder: orderCancelSpy,
        },
        './status': {
          pending: pendingSpy,
          error: errorSpy,
        },
      }).default
      try {
        await orderActions.orderCancel(orderId)(dispatchSpy, getStateSpy)
      } catch (error) {
        expect(error).to.equal(err)
      } finally {
        expect(errorSpy.calledTwice).to.be.true
        expect(errorSpy.getCall(0).args[0]).to.equal(actionTypes.ORDER_CANCEL)
        expect(errorSpy.getCall(0).args[1]).to.be.null
        expect(errorSpy.getCall(1).args[0]).to.equal(actionTypes.ORDER_CANCEL)
        expect(errorSpy.getCall(1).args[1]).to.deep.equal({ error: 'oops', orderId: '12345' })
      }
    })

    it('should cancel the order and dispatch ORDER_CANCEL action with the order', async function() {
      await orderActions.orderCancel(orderId)(dispatchSpy, getStateSpy)

      expect(orderCancelSpy).to.have.been.calledOnce
      expect(dispatchSpy.callCount).to.equal(4)
      expect(dispatchSpy).to.have.been.calledWithExactly({
        type: actionTypes.ORDER_CANCEL,
        orderId,
      })
    })
  })

  describe('projectedOrderRestore', function() {
    const orderId = '12345'
    const userId = '777'
    const deliveryDayId = '888'

    it('should mark PROJECTED_ORDER_RESTORE as pending during the operation', async function() {
      await orderActions.projectedOrderRestore(orderId, userId, deliveryDayId)(dispatchSpy, getStateSpy)

      expect(pendingSpy.calledTwice).to.be.true
      expect(pendingSpy.getCall(0).args[0]).to.equal(actionTypes.PROJECTED_ORDER_RESTORE)
      expect(pendingSpy.getCall(0).args[1]).to.be.true
      expect(pendingSpy.getCall(1).args[0]).to.equal(actionTypes.PROJECTED_ORDER_RESTORE)
      expect(pendingSpy.getCall(1).args[1]).to.be.false
      expect(dispatchSpy.callCount).to.equal(4)
    })

    it('should mark PROJECTED_ORDER_RESTORE as errored if it errors', async function() {
      const err = new Error('oops')
      restoreDeliverySpy = () => new Promise((resolve, reject) => { reject(err) })
      orderActions = require('inject-loader?apis/user&./status!actions/order')({ // eslint-disable-line global-require
        'apis/user': {
          restoreDelivery: restoreDeliverySpy,
        },
        './status': {
          pending: pendingSpy,
          error: errorSpy,
        },
      }).default
      await orderActions.projectedOrderRestore(orderId, userId, deliveryDayId)(dispatchSpy, getStateSpy)

      expect(errorSpy.calledTwice).to.be.true
      expect(errorSpy.getCall(0).args[0]).to.equal(actionTypes.PROJECTED_ORDER_RESTORE)
      expect(errorSpy.getCall(0).args[1]).to.be.null
      expect(errorSpy.getCall(1).args[0]).to.equal(actionTypes.PROJECTED_ORDER_RESTORE)
      expect(errorSpy.getCall(1).args[1]).to.deep.equal({ error: 'oops', orderId: '12345' })
    })

    it('should restore the order and dispatch PROJECTED_ORDER_RESTORE action with the order', async function() {
      await orderActions.projectedOrderRestore(orderId, userId, deliveryDayId)(dispatchSpy, getStateSpy)

      expect(restoreDeliverySpy).to.have.been.calledOnce
      expect(dispatchSpy.callCount).to.equal(4)
      expect(dispatchSpy).to.have.been.calledWithExactly({
        type: actionTypes.PROJECTED_ORDER_RESTORE,
        orderId,
      })
    })
  })

  describe('orderAddressChange', function() {
    const orderId = '12345'
    const addressId = 4

    it('should mark ORDER_ADDRESS_CHANGE as pending', async function() {
      await orderActions.orderAddressChange(orderId, addressId)(dispatchSpy, getStateSpy)

      expect(pendingSpy.calledTwice).to.be.true
      expect(pendingSpy.getCall(0).args[0]).to.equal('ORDER_ADDRESS_CHANGE')
      expect(pendingSpy.getCall(0).args[1]).to.be.true
      expect(pendingSpy.getCall(1).args[0]).to.equal('ORDER_ADDRESS_CHANGE')
      expect(pendingSpy.getCall(1).args[1]).to.be.false
      expect(dispatchSpy.callCount).to.equal(4)
    })

    it('should mark ORDER_ADDRESS_CHANGE as errored if it errors', async function() {
      const err = new Error('oops')
      updateOrderAddressSpy = () => new Promise((resolve, reject) => { reject(err) })
      orderActions = require('inject-loader?apis/orders&utils/window&./status!actions/order')({ // eslint-disable-line global-require
        'apis/orders': {
          updateOrderAddress: updateOrderAddressSpy,
        },
        'utils/window': {
          redirect: redirectSpy,
        },
        './status': {
          pending: pendingSpy,
          error: errorSpy,
        },
      }).default
      await orderActions.orderAddressChange(orderId, addressId)(dispatchSpy, getStateSpy)

      expect(pendingSpy.calledTwice).to.be.true
      expect(pendingSpy.getCall(0).args[0]).to.equal('ORDER_ADDRESS_CHANGE')

      expect(errorSpy.calledTwice).to.be.true
      expect(errorSpy.getCall(0).args[0]).to.equal('ORDER_ADDRESS_CHANGE')
      expect(errorSpy.getCall(0).args[1]).to.be.null
      expect(errorSpy.getCall(1).args[0]).to.equal('ORDER_ADDRESS_CHANGE')
      expect(errorSpy.getCall(1).args[1]).to.deep.equal(err.message)
      expect(dispatchSpy.callCount).to.equal(4)
    })

    it('should call orderAddressChange and map the arguments through to orderAddressChange correctly', async function() {
      await orderActions.orderAddressChange(orderId, addressId)(dispatchSpy, getStateSpy)

      expect(updateOrderAddressSpy.calledOnce).to.be.true
      expect(updateOrderAddressSpy.getCall(0).args[0]).to.equal('access-token')
      expect(updateOrderAddressSpy.getCall(0).args[1]).to.equal('12345')
      expect(updateOrderAddressSpy.getCall(0).args[2]).to.equal(4)
    })
  })

  describe('orderGetDeliveryDays', function() {
    let orderId
    let cutoffDatetimeFrom
    let cutoffDatetimeUntil

    beforeEach(function() {
      orderId = '123'
      cutoffDatetimeFrom = '01-01-2017 10:00:01'
      cutoffDatetimeUntil = '02-02-2017 14:23:34'
      getStateSpy = sandbox.stub().returns({
        user: Immutable.fromJS({
          addresses: { 789: { postcode: 'AA11 2BB' } },
        }),
      })
    })

    it('should mark ORDER_DELIVERY_DAYS_RECEIVE as pending', async function() {
      await orderActions.orderGetDeliveryDays(cutoffDatetimeFrom, cutoffDatetimeUntil, '789', orderId)(dispatchSpy, getStateSpy)

      expect(pendingSpy).to.have.been.calledTwice
      expect(pendingSpy.getCall(0).args[0]).to.equal('ORDER_DELIVERY_DAYS_RECEIVE')
      expect(pendingSpy.getCall(0).args[1]).to.be.true
      expect(pendingSpy.getCall(1).args[0]).to.equal('ORDER_DELIVERY_DAYS_RECEIVE')
      expect(pendingSpy.getCall(1).args[1]).to.be.false
      expect(dispatchSpy.callCount).to.equal(4)
    })

    it('should mark ORDER_DELIVERY_DAYS_RECEIVE as errored if it errors', async function() {
      const err = new Error('oops')
      fetchDeliveryDaysSpy = () => new Promise((resolve, reject) => { reject(err) })
      orderActions = require('inject-loader?apis/deliveries&./status!actions/order')({ // eslint-disable-line global-require
        'apis/deliveries': {
          fetchDeliveryDays: fetchDeliveryDaysSpy,
        },
        './status': {
          pending: pendingSpy,
          error: errorSpy,
        },
      }).default
      await orderActions.orderGetDeliveryDays(cutoffDatetimeFrom, cutoffDatetimeUntil, '789', orderId)(dispatchSpy, getStateSpy)

      expect(pendingSpy).to.have.been.calledTwice
      expect(pendingSpy.getCall(0).args[0]).to.equal('ORDER_DELIVERY_DAYS_RECEIVE')
      expect(pendingSpy.getCall(0).args[1]).to.be.true
      expect(pendingSpy.getCall(1).args[0]).to.equal('ORDER_DELIVERY_DAYS_RECEIVE')
      expect(pendingSpy.getCall(1).args[1]).to.be.false

      expect(errorSpy.calledTwice).to.be.true
      expect(errorSpy.getCall(0).args[0]).to.equal('ORDER_DELIVERY_DAYS_RECEIVE')
      expect(errorSpy.getCall(0).args[1]).to.be.null
      expect(errorSpy.getCall(1).args[0]).to.equal('ORDER_DELIVERY_DAYS_RECEIVE')
      expect(errorSpy.getCall(1).args[1]).to.deep.equal(err.message)
      expect(dispatchSpy.callCount).to.equal(4)
    })

    it('should map the arguments through to fetchDeliveryDays and dispatch the action with the correct arguments', async function() {
      const fetchedDays = { data: [{ id: '4' }, { id: '5' }, { id: '6' }] }
      fetchDeliveryDaysSpy = sandbox.stub().returns(new Promise(resolve => { resolve(fetchedDays) }))
      const getAvailableDeliveryDaysSpy = sandbox.stub().returns([{ id: '5' }, { id: '6' }])
      orderActions = require('inject-loader?utils/deliveries&apis/deliveries&./status!actions/order')({ // eslint-disable-line global-require
        'utils/deliveries': {
          getAvailableDeliveryDays: getAvailableDeliveryDaysSpy,
        },
        'apis/deliveries': {
          fetchDeliveryDays: fetchDeliveryDaysSpy,
        },
        './status': {
          pending: pendingSpy,
          error: errorSpy,
        },
      }).default
      await orderActions.orderGetDeliveryDays(cutoffDatetimeFrom, cutoffDatetimeUntil, '789', orderId)(dispatchSpy, getStateSpy)

      expect(fetchDeliveryDaysSpy).to.have.been.calledOnce
      const expectedReqData = {
        'filters[cutoff_datetime_from]': '01-01-2017 10:00:01',
        'filters[cutoff_datetime_until]': '02-02-2017 14:23:34',
        sort: 'date',
        direction: 'asc',
        postcode: 'AA11 2BB',
      }
      expect(fetchDeliveryDaysSpy.getCall(0).args[0]).to.be.null
      expect(fetchDeliveryDaysSpy.getCall(0).args[1]).to.deep.equal(expectedReqData)

      expect(getAvailableDeliveryDaysSpy).to.have.been.calledWithExactly([{ id: '4' }, { id: '5' }, { id: '6' }])
      expect(dispatchSpy.callCount).to.equal(4)
      expect(dispatchSpy).to.have.been.calledWithExactly({
        type: actionTypes.ORDER_DELIVERY_DAYS_RECEIVE,
        orderId: '123',
        availableDays: [{ id: '5' }, { id: '6' }],
      })
    })
  })

  describe('cancelOrderModalToggleVisibility', function() {
    it('should return a ORDER_CANCELLED_MODAL_VISIBILITY_CHANGE action with the args mapped through into a data object', function() {
      orderActions.cancelOrderModalToggleVisibility('visibility', 'orderId')(dispatchSpy, getStateSpy)
      expect(dispatchSpy).to.have.been.calledWithExactly({
        type: 'ORDER_CANCELLED_MODAL_VISIBILITY_CHANGE',
        data: {
          visibility: 'visibility',
          orderId: 'orderId',
        },
      })
    })

    it('should reset the modal errors when the modal is closed', function() {
      orderActions.cancelOrderModalToggleVisibility(false, 'orderId')(dispatchSpy, getStateSpy)
      expect(errorSpy).to.have.been.calledWithExactly(actionTypes.ORDER_CANCEL, null)
    })
  })
})
