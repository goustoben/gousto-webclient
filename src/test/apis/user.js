import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import * as userApi from 'apis/user'
import * as fetchUtils from 'utils/fetch'
import routes from 'config/routes'

describe('user', function() {
  describe('fetchUser', function() {
    let fetchSpy
    let fetchUser
    let accessToken

    beforeEach(function() {
      accessToken = 'token'
      fetchSpy = sinon.stub().returns(new Promise(resolve => { resolve({ data: { user: { id: '123', email: 'test@email.com' } } }) }))

      fetchUser = require('inject-loader?utils/fetch!apis/user')({
        'utils/fetch': fetchSpy,
      }).fetchUser
    })

    it('should call the user current endpoint', async function() {
      await fetchUser(accessToken)
      expect(fetchSpy.getCall(0).args[0]).to.equal(accessToken)
      expect(fetchSpy.getCall(0).args[1]).to.contain('user/current')
    })

    it('should respond with user data', async function() {
      const response = await fetchUser(accessToken)
      expect(response).to.deep.equal({ data: { user: { id: '123', email: 'test@email.com' } } })
    })
  })

  describe('getAddresses', function() {
    let userAddresses
    let fetchSpy
    let addresses
    let accessToken

    beforeEach(function() {
      accessToken = 'token'
      addresses = [{
        id: '321250',
        deleted: false,
        user_id: '77213',
        name: 'Home',
        companyname: '',
        line1: 'Flat 4',
        line2: '67 Cloister Road',
        line3: '',
        town: 'London',
        county: 'Greater London',
        postcode: 'W3 0DF',
        delivery_instructions: 'Front Porch',
        shipping_default: true,
        billing_default: false,
        state: 'valid',
        premium_delivery: true,
      }, {
        id: '325007',
        deleted: false,
        user_id: '77213',
        name: 'work',
        companyname: '',
        line1: 'Unit 2 Issigonis House',
        line2: 'Cowley Road',
        line3: '',
        town: 'London',
        county: 'Greater London',
        postcode: 'W3 7UN',
        delivery_instructions: 'Front Porch',
        shipping_default: false,
        billing_default: false,
        state: 'valid',
        premium_delivery: true,
      }]

      fetchSpy = sinon.stub().returns(new Promise(resolve => { resolve(addresses) }))

      userAddresses = require('inject-loader?utils/fetch!apis/user')({
        'utils/fetch': fetchSpy,
      }).fetchShippingAddresses
    })

    it('should call the endpoint with no arguments', async function() {
      await userAddresses(accessToken)
      expect(fetchSpy.getCall(0).args[0]).to.equal(accessToken)
      expect(fetchSpy.getCall(0).args[2]).to.deep.equal({ type: 'shipping' })
    })

    it('should return the results unchanged', async function() {
      const data = await userAddresses(accessToken)
      expect(data).to.deep.equal(addresses)
    })
  })

  describe('fetchUserOrders', function() {
    let fetchUserOrders
    let fetchSpy
    let accessToken

    beforeEach(function() {
      accessToken = 'token'
      fetchSpy = sinon.stub().returns(new Promise(resolve => { resolve([{ id: '1' }, { id: '2' }]) }))

      fetchUserOrders = require('inject-loader?utils/fetch!apis/user')({
        'utils/fetch': fetchSpy,
      }).fetchUserOrders
    })

    it('should call fetch with passed arguments & GET', async function() {
      await fetchUserOrders(accessToken, 'additional params')
      expect(fetchSpy.getCall(0).args[0]).to.equal(accessToken)
      expect(fetchSpy.getCall(0).args[2]).to.equal('additional params')
      expect(fetchSpy.getCall(0).args[3]).to.equal('GET')
    })

    it('should return the results unchanged', async function() {
      const data = await fetchUserOrders(accessToken)
      expect(data).to.deep.equal([{ id: '1' }, { id: '2' }])
    })
  })

  describe('fetchUserOrdersNew', function() {
    let fetchUserOrdersNew
    let fetchSpy
    let accessToken
    const additionalParams = { userID: 1 }

    beforeEach(function() {
      accessToken = 'token'
      fetchSpy = sinon.stub().returns(new Promise(resolve => { resolve([{ id: '1' }, { id: '2' }]) }))

      fetchUserOrdersNew = require('inject-loader?utils/fetch!apis/user')({
        'utils/fetch': fetchSpy,
      }).fetchUserOrders
    })

    it('should call fetch with passed arguments & GET', async function() {
      await fetchUserOrdersNew(accessToken, additionalParams)
      expect(fetchSpy.getCall(0).args[0]).to.equal(accessToken)
      expect(fetchSpy.getCall(0).args[2]).to.equal(additionalParams)
      expect(fetchSpy.getCall(0).args[3]).to.equal('GET')
    })

    it('should return the results unchanged', async function() {
      const data = await fetchUserOrdersNew(accessToken)
      expect(data).to.deep.equal([{ id: '1' }, { id: '2' }])
    })
  })

  describe('fetchUserProjectedDeliveries', function() {
    let sandbox
    let fetch
    const accessToken = 'token'

    beforeEach(function() {
      sandbox = sinon.sandbox.create()
      fetch = sandbox.stub(fetchUtils, 'fetch').returns(new Promise(resolve => { resolve([{ id: '1' }, { id: '2' }]) }))
    })

    afterEach(function() {
      sandbox.restore()
    })

    it('should call fetch with accessToken, URL containing configured "userProjectedDeliveries" path, {}, & "GET"', async function() {
      await userApi.fetchUserProjectedDeliveries(accessToken)

      expect(fetch.callCount).to.equal(1)
      expect(fetch.firstCall.args[0]).to.equal(accessToken)
      expect(fetch.firstCall.args[1]).to.contain(routes.core.userProjectedDeliveries)
      expect(fetch.firstCall.args[2]).to.deep.equal({})
      expect(fetch.firstCall.args[3]).to.equal('GET')
    })

    it('should return the results unchanged', async function() {
      const data = await userApi.fetchUserProjectedDeliveries(accessToken)
      expect(data).to.deep.equal([{ id: '1' }, { id: '2' }])
    })
  })

  describe('skipDelivery', function() {
    let sandbox
    let fetch
    const accessToken = 'token'

    beforeEach(function() {
      sandbox = sinon.sandbox.create()
      fetch = sandbox.stub(fetchUtils, 'fetch').returns(new Promise(resolve => resolve('response from api')))
    })

    afterEach(function() {
      sandbox.restore()
    })

    it('should call fetch with accessToken, URL containing configured "userDelivery" path, { delivery_day_id: <deliveryDayID> }, & "PUT"', async function() {
      await userApi.skipDelivery(accessToken, '1234')

      expect(fetch.callCount).to.equal(1)
      expect(fetch.firstCall.args[0]).to.equal(accessToken)
      expect(fetch.firstCall.args[1]).to.contain(routes.core.userDelivery)
      expect(fetch.firstCall.args[2]).to.deep.equal({ delivery_day_id: '1234' })
      expect(fetch.firstCall.args[3]).to.equal('PUT')
    })

    it('should return the results unchanged', async function() {
      const data = await userApi.skipDelivery(accessToken)
      expect(data).to.equal('response from api')
    })
  })

  describe('restoreDelivery', function() {
    let sandbox
    let fetch
    const accessToken = 'token'

    beforeEach(function() {
      sandbox = sinon.sandbox.create()
      fetch = sandbox.stub(fetchUtils, 'fetch').returns(new Promise(resolve => resolve('response from api')))
    })

    afterEach(function() {
      sandbox.restore()
    })

    it('should call fetch with accessToken, URL containing configured "user" path, { delivery_day_id: <deliveryDayID> }, & "PUT"', async function() {
      await userApi.restoreDelivery(accessToken, 'user-id', '1234')

      expect(fetch.callCount).to.equal(1)
      expect(fetch.firstCall.args[0]).to.equal(accessToken)
      expect(fetch.firstCall.args[1]).to.contain(routes.core.user)
      expect(fetch.firstCall.args[2]).to.deep.equal({ delivery_day_id: '1234' })
      expect(fetch.firstCall.args[3]).to.equal('PUT')
    })

    it('should return the results unchanged', async function() {
      const data = await userApi.restoreDelivery(accessToken)
      expect(data).to.equal('response from api')
    })
  })

  describe('verifyAge', function() {
    let verifyAge
    let fetchSpy
    let accessToken

    beforeEach(function() {
      accessToken = 'token'
      fetchSpy = sinon.stub().returns(new Promise(resolve => { resolve('response from fetch') }))

      verifyAge = require('inject-loader?utils/fetch!apis/user')({
        'utils/fetch': fetchSpy,
      }).verifyAge
    })

    it('should call fetch endpoint with accessToken, URL containing /current/<userId>, accessToken, age_verified option, & PUT', async function() {
      await verifyAge(accessToken, '123')
      expect(fetchSpy.getCall(0).args[0]).to.equal(accessToken)
      expect(fetchSpy.getCall(0).args[1]).to.contain('/user/123')
      expect(fetchSpy.getCall(0).args[2]).to.deep.equal({ age_verified: 1 })
      expect(fetchSpy.getCall(0).args[3]).to.equal('PUT')
    })

    it('should return the results unchanged', async function() {
      const data = await verifyAge(accessToken, '123')
      expect(data).to.equal('response from fetch')
    })
  })

  describe('userRateCount', function() {
    let fetchSpy
    let userRateCount
    let accessToken

    beforeEach(function() {
      accessToken = 'token'
      fetchSpy = sinon.stub().returns(new Promise(resolve => { resolve({ data: { count: 2 } }) }))

      userRateCount = require('inject-loader?utils/fetch!apis/user')({
        'utils/fetch': fetchSpy,
      }).userRateCount
    })

    it('should call the user current ratings endpoint', async function() {
      await userRateCount(accessToken)
      expect(fetchSpy.getCall(0).args[0]).to.equal(accessToken)
      expect(fetchSpy.getCall(0).args[1]).to.contain('user/current/ratings/count')
    })

    it('should return the results unchanged', async function() {
      const response = await userRateCount(accessToken)
      expect(response).to.deep.equal({ data: { count: 2 } })
    })
  })

  describe('updateUserOrder', function() {
    const accessToken = 'token'
    let sandbox
    let fetch

    beforeEach(function() {
      sandbox = sinon.sandbox.create()
      fetch = sandbox.stub(fetchUtils, 'fetch').returns({ id: 'order-123' })
    })

    afterEach(function() {
      sandbox.restore()
    })

    it('should call the user current order endpoint with passed in reqData & "PUT" method', async function() {
      await userApi.updateUserOrder(accessToken, {
        recipe_choices: [
          { id: 1, quantity: 2, type: 'Recipe' },
          { id: 2, quantity: 2, type: 'Recipe' },
        ],
      })

      expect(fetch.getCall(0).args[0]).to.equal('token')
      expect(fetch.getCall(0).args[1]).to.contain('user/current/order')
      expect(fetch.getCall(0).args[2]).to.deep.equal({
        recipe_choices: [
          { id: 1, quantity: 2, type: 'Recipe' },
          { id: 2, quantity: 2, type: 'Recipe' },
        ],
      })
      expect(fetch.getCall(0).args[3]).to.equal('PUT')
    })

    it('should respond with unchanged result of fetch', async function() {
      const response = await userApi.updateUserOrder(accessToken)
      expect(response).to.deep.equal({ id: 'order-123' })
    })
  })

  describe('addNewAddress', function() {
    let sandbox
    let fetch
    const accessToken = 'token'
    const userId = 666
    const reqData = {
      name: 'Home',
      type: 'shipping',
      line1: '2 Westfields road',
      town: 'London',
      postcode: 'W30AP',
      delivery_instructions: 'just like, leave it outside',
    }

    beforeEach(function() {
      sandbox = sinon.sandbox.create()
      fetch = sandbox.stub(fetchUtils, 'fetch').returns(new Promise(resolve => resolve('response from api')))
    })

    afterEach(function() {
      sandbox.restore()
    })

    it('should call fetch with accessToken, URL containing configured "userDelivery" path, userId, other data, & "PUT"', async function() {
      await userApi.addNewAddress(accessToken, userId, reqData)

      expect(fetch.callCount).to.equal(1)
      expect(fetch.firstCall.args[0]).to.equal(accessToken)
      expect(fetch.firstCall.args[1]).to.contain(`/customers/${userId}/addresses`)
      expect(fetch.firstCall.args[2]).to.deep.equal(reqData)
      expect(fetch.firstCall.args[3]).to.equal('POST')
    })

    it('should return the results unchanged', async function() {
      const data = await userApi.skipDelivery(accessToken)
      expect(data).to.equal('response from api')
    })
  })

  describe('addPaymentMethod', function() {
    let fetchSpy
    let userId
    let addPaymentMethod
    let accessToken
    let data

    beforeEach(function() {
      userId = '12345'
      accessToken = 'token'
      data = {
        payment_type: 'CARD',
        card_type: 'VISA',
        card_number: 293785629,
        card_cvv2: 123,
        card_holder: 'Mr Test',
        card_expires: '1218',
        force_no_finisher: true,
      }
      fetchSpy = sinon.stub().returns(new Promise(resolve => { resolve(userId) }))
      addPaymentMethod = require('inject-loader?config/endpoint&utils/fetch!apis/user')({ // eslint-disable-line global-require
        'utils/fetch': fetchSpy,
        'config/endpoint': sinon.stub().returns('gousto-endpoint'),
      }).addPaymentMethod
    })

    it('should call the correct URL', async function() {
      await addPaymentMethod(accessToken, data, userId)

      expect(fetchSpy.args[0][0]).to.equal('token')
      expect(fetchSpy.args[0][1]).to.equal('gousto-endpoint/user/12345/paymentMethod')
      expect(fetchSpy.args[0][3]).to.equal('PUT')
    })

    it('should call with additional data', async function() {
      await addPaymentMethod(accessToken, data, userId)

      expect(fetchSpy.args[0][2]).to.deep.equal(data)
    })
  })

  describe('deleteMarketingSubscription', function() {
    let sandbox
    let fetch

    beforeEach(function() {
      sandbox = sinon.sandbox.create()
      fetch = sandbox.stub(fetchUtils, 'fetch').returns('deleteMarketingSubscription fetch response')
    })

    afterEach(function() {
      sandbox.restore()
    })

    it('should call the endpoint with passed parameters', async function() {
      await userApi.deleteMarketingSubscription('user-id', 'marketing-type', 'marketing-unsubscribe-token')

      expect(fetch.getCall(0).args[0]).to.equal(null)
      expect(fetch.getCall(0).args[1]).to.contain('user/user-id/marketing/marketing-type')
      expect(fetch.getCall(0).args[1]).to.contain('marketing')
      expect(fetch.getCall(0).args[2]).to.deep.equal({
        marketing_unsubscribe_token: 'marketing-unsubscribe-token',
      })
      expect(fetch.getCall(0).args[3]).to.equal('DELETE')
    })

    it('should respond with unchanged result of fetch', async function() {
      const response = await userApi.deleteMarketingSubscription('user-id', 'marketing-type', 'marketing-unsubscribe-token')
      expect(response).to.equal('deleteMarketingSubscription fetch response')
    })
  })
})
