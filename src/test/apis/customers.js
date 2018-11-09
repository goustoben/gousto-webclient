import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

describe('customers', function() {
  describe('fetchPauseReasons', function() {
    let customers
    let fetch

    beforeEach(function() {
      const prices = {
        2: '1.99',
        4: '2.99',
      }

      fetch = sinon.stub().returns(new Promise(resolve => { resolve(prices) }))

      customers = require('inject-loader?utils/fetch!apis/customers')({
        'utils/fetch': fetch,
      }).fetchPauseReasons
    })

    it('should call the subscription/pause-reasons endpoint', async function() {
      await customers('token', 'testuser')

      expect(fetch.args[0][1]).to.contain('subscription/pause-reasons')
    })

    it('should call the endpoint with passed arguments', async function() {
      await customers('token', 'testuser')

      expect(fetch.args[0][0]).to.equal('token')
      expect(fetch.args[0][1]).to.contain('testuser')
    })

    it('should call the endpoint with includes[]=steps', async function() {
      await customers('token', 'testuser')

      expect(fetch.args[0][2]).to.deep.equal({ includes: ['steps'] })
    })

    it('should return the results unchanged', async function() {
      const returnVal = await customers('token', { promocode: 'hello', tariff: '4' })

      expect(returnVal).to.deep.equal({ 2: '1.99', 4: '2.99' })
    })
  })

  describe('userSubscribe', function() {
    let customerSignup
    let fetchSpy
    let accessToken
    let reqData

    beforeEach(function() {
      accessToken = 'token'
      reqData = { data: 1 }
      fetchSpy = sinon.stub().returns(new Promise(resolve => { resolve({ id: '1', email: 'test@example.com' }) }))

      customerSignup = require('inject-loader?utils/fetch!apis/customers')({
        'utils/fetch': fetchSpy,
      }).customerSignup
    })

    it('should call fetch endpoint with accessToken, URL containing /signup, accessToken, POST', async function() {
      await customerSignup(accessToken, reqData)
      expect(fetchSpy.getCall(0).args[0]).to.equal(accessToken)
      expect(fetchSpy.getCall(0).args[1]).to.contain('/signup')
      expect(fetchSpy.getCall(0).args[2]).to.deep.equal(reqData)
      expect(fetchSpy.getCall(0).args[3]).to.equal('POST')
    })

    it('should return the results unchanged', async function() {
      const data = await customerSignup(accessToken, reqData)
      expect(data).to.deep.equal({ id: '1', email: 'test@example.com' })
    })
  })
})
