import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import { getUserToken, identifyUser, refreshUserToken, forgetUserToken, validateUserPassword, resetUserPassword } from 'apis/auth'
import * as fetch from 'utils/fetch'
import * as endpoint from 'config/endpoint'

describe('auth', () => {
  const sandbox = sinon.sandbox.create()
  const returnData = 'fetch-return-data'
  let fetchStub
  sinon.stub(endpoint, 'default').returns('auth-path')

  beforeEach(() => {
    fetchStub = sandbox.stub(fetch, 'default').returns(new Promise(resolve => resolve(returnData)))
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('getUserToken', function() {
    const reqData = { email: 'an-email', password: 'a-password' }

    it('should call the correct url with specific data', async function() {
      await getUserToken(reqData)

      expect(fetchStub).to.have.been.calledOnce
      expect(fetchStub).to.have.been.calledWithExactly(
        null,
        'auth-path/oauth/access-token',
        { grant_type: 'password', password: 'a-password', username: 'an-email' },
        'POST',
        'no-cache',
        {},
        false
      )
    })

    it('should return the results unchanged', async function() {
      const returnVal = await getUserToken(reqData)

      expect(returnVal).to.equal(returnData)
    })
  })

  describe('identifyUser', function() {
    const accessToken = 'access-token'

    it('should call the correct url with specific data', async function() {
      await identifyUser(accessToken)

      expect(fetchStub).to.have.been.calledOnce
      expect(fetchStub).to.have.been.calledWithExactly(
        'access-token',
        'auth-path/oauth/identify',
        {},
        'GET',
        'no-cache'
      )
    })

    it('should return the results unchanged', async function() {
      const returnVal = await identifyUser(accessToken)

      expect(returnVal).to.equal(returnData)
    })
  })

  describe('refreshUserToken', function() {
    const reqData = { refresh: 'refresh' }

    it('should call the correct url with specific data', async function() {
      await refreshUserToken(reqData)

      expect(fetchStub).to.have.been.calledOnce
      expect(fetchStub).to.have.been.calledWithExactly(
        null,
        'auth-path/oauth/refresh-token',
        { grant_type: 'refresh_token', refresh_token: 'refresh' },
        'POST',
        'no-cache',
        {},
        false
      )
    })

    it('should return the results unchanged', async function() {
      const returnVal = await refreshUserToken(reqData)

      expect(returnVal).to.equal(returnData)
    })
  })

  describe('forgetUserToken', function() {
    const accessToken = 'access-token'

    it('should call the correct url with specific data', async function() {
      await forgetUserToken(accessToken)

      expect(fetchStub).to.have.been.calledOnce
      expect(fetchStub).to.have.been.calledWithExactly(
        'access-token',
        'auth-path/oauth/access-token',
        {},
        'DELETE',
        'no-cache',
      )
    })

    it('should return the results unchanged', async function() {
      const returnVal = await forgetUserToken(accessToken)

      expect(returnVal).to.equal(returnData)
    })
  })

  describe('validateUserPassword', function() {
    const password = 'another-password'

    it('should call the correct url with specific data', async function() {
      await validateUserPassword(password)

      expect(fetchStub).to.have.been.calledOnce
      expect(fetchStub).to.have.been.calledWithExactly(
        null,
        'auth-path/passwords/validate',
        { password: 'another-password' },
        'POST',
        'no-cache'
      )
    })

    it('should return the results unchanged', async function() {
      const returnVal = await validateUserPassword(password)

      expect(returnVal).to.equal(returnData)
    })
  })

  describe('resetUserPassword', function() {
    const password = 'a-password'
    const token = 'a-token'

    it('should call the correct url with specific data', async function() {
      await resetUserPassword(password, token)

      expect(fetchStub).to.have.been.calledOnce
      expect(fetchStub).to.have.been.calledWithExactly(
        null,
        'auth-path/passwords',
        { password: 'a-password', password_token: 'a-token' },
        'POST',
        'no-cache'
      )
    })

    it('should return the received data', async function() {
      const returnVal = await validateUserPassword(password, token)

      expect(returnVal).to.equal(returnData)
    })
  })
})
