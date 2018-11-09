import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

describe('orders', function() {
  describe('fetchOrder', function() {
    let fetchSpy

    function fetchOrder(order) {
      fetchSpy = sinon.stub().returns(new Promise(resolve => { resolve(order) }))

      const fetchOrderMocked = require('inject-loader?config/endpoint&utils/fetch!apis/orders')({ // eslint-disable-line global-require
        'utils/fetch': fetchSpy,
        'config/endpoint': sinon.stub().returns('gousto-endpoint'),
      }).fetchOrder

      return fetchOrderMocked('token', 'order-1', { 'includes[]': 'shipping_address' })
    }

    it('should call the correct URL', function() {
      fetchOrder({})

      expect(fetchSpy.args[0][0]).to.equal('token')
      expect(fetchSpy.args[0][1]).to.equal('gousto-endpoint/order/order-1')
    })

    it('should call with additonal data', function() {
      fetchOrder({})

      expect(fetchSpy.args[0][0]).to.equal('token')
      expect(fetchSpy.args[0][2]).to.deep.equal({ 'includes[]': 'shipping_address' })
      expect(fetchSpy.args[0][3]).to.equal('GET')
    })

    it('should return fecthed data', async function() {
      const response = await fetchOrder({ id: 'order-1', recipes: [1, 2] })

      expect(response).to.deep.equal({ id: 'order-1', recipes: [1, 2] })
    })
  })
  describe('saveOrder', function() {
    let fetchSpy
    let order
    let saveOrder
    let accessToken
    let orderId
    let savedOrder

    beforeEach(function() {
      order = {
        id: '12345',
      }
      savedOrder = {
        id: '56789',
      }
      accessToken = 'token'
      orderId = '4567'
      fetchSpy = sinon.stub().returns(new Promise(resolve => { resolve(savedOrder) }))
      saveOrder = require('inject-loader?config/endpoint&utils/fetch!apis/orders')({ // eslint-disable-line global-require
        'utils/fetch': fetchSpy,
        'config/endpoint': sinon.stub().returns('gousto-endpoint'),
      }).saveOrder
    })

    it('should call the correct URL', async function() {
      await saveOrder(accessToken, orderId)

      expect(fetchSpy.args[0][0]).to.equal('token')
      expect(fetchSpy.args[0][1]).to.equal('gousto-endpoint/order/4567')
      expect(fetchSpy.args[0][3]).to.equal('PUT')
    })

    it('should call with additional data', async function() {
      await saveOrder(accessToken, orderId, order)

      expect(fetchSpy.args[0][2]).to.deep.equal(order)
    })

    it('should return fetched data', async function() {
      const result = await saveOrder(accessToken, orderId, order)

      expect(result).to.deep.equal(savedOrder)
    })
  })
  describe('createPreviewOrder', function() {
    let orderDetails
    let createPreviewOrder
    let order
    let fetchSpy
    beforeEach(function() {
      orderDetails = {
        delivery_day_id: 123,
        delivery_slot_id: 1,
        recipe_choices: [
          {
            id: 1,
            quantity: 2,
            type: 'Recipe',
          },
          {
            id: 2,
            quantity: 2,
            type: 'Recipe',
          },
        ],
      }
      order = {
        id: 123,
      }

      fetchSpy = sinon.stub().returns(new Promise(resolve => { resolve(order) }))

      createPreviewOrder = require('inject-loader?config/endpoint&utils/fetch!apis/orders')({ // eslint-disable-line global-require
        'utils/fetch': fetchSpy,
        'config/endpoint': sinon.stub().returns(''),
      }).createPreviewOrder
    })
    it('should call the correct url with the order details', async function() {
      await createPreviewOrder(orderDetails)

      expect(fetchSpy.args[0][0]).to.be.null
      expect(fetchSpy.args[0][1]).to.equal('/order/preview')
      expect(fetchSpy.args[0][2]).to.deep.equal(orderDetails)
      expect(fetchSpy.args[0][3]).to.equal('POST')
    })

    it('should return data', async function() {
      const result = await createPreviewOrder(orderDetails)

      expect(result).to.deep.equal(order)
    })
  })
})
