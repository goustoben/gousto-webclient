import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable'
import config from 'config/auth'
import statusActions from 'actions/status'
import loginActions from 'actions/login'

describe('auth actions', function() {
  let actions, dispatch, getState, getUserToken, identifyUser, refreshUserToken, forgetUserToken, isActive
  let clock

  beforeEach(function () {
    clock = sinon.useFakeTimers(new Date(2017, 0, 1).getTime())
  })

  afterEach(function(done) {
    done()
  })

  function prepTest(resolveIdentify, isActiveValue, resolveAuthenticate = true, errorCode = 0) {
    getUserToken = sinon.stub().returns(new Promise((resolve, reject) => {
      if (resolveAuthenticate) {
        resolve({ data: { accessToken: 'accessToken123', refreshToken: 'refreshToken123', expiresIn: '120' } })
      } else {
        let err
        if (errorCode === 401) {
          err = new Error(config.FAILED_LOGIN_TEXT)
          err.status = 401
        } else if (errorCode >= 500) {
          err = new Error(config.DEFAULT_ERROR)
          err.status = 500
        } else {
          err = new Error(config.DEFAULT_ERROR)
        }

        reject(err)
      }
    }))
    identifyUser = sinon.stub().returns(new Promise((resolve, reject) => {
      if (resolveIdentify) {
        resolve({ data: { roles: ['role1', 'role2'] } })
      } else {
        reject()
      }
    }))

    refreshUserToken = sinon.stub().returns(new Promise(resolve => { resolve({ data: { accessToken: 'new-accessToken123', refreshToken: 'new-refreshToken123', expiresIn: '120' } }) }))

    forgetUserToken = sinon.spy()
    isActive = sinon.stub().returns(isActiveValue)
    dispatch = sinon.spy()
    getState = sinon.stub().returns({ auth: Immutable.fromJS({ accessToken: 'accessToken123' }) })

    actions = require('inject-loader?apis/auth&utils/auth!actions/auth')({
      'apis/auth': { getUserToken, identifyUser, refreshUserToken, forgetUserToken },
      'utils/auth': { isActive },
    }).default
  }

  describe('authenticate', function() {
    it('should fetch user token and dispatch', async function() {
      try {
        prepTest()
      } catch (err) {
        expect(err).to.not.be(null)
      }
      await actions.authAuthenticate('user@email.com', 'userpassword')(dispatch)

      expect(getUserToken).to.have.been.calledOnce
      expect(getUserToken.getCall(0).args[0]).to.deep.equal({ email: 'user@email.com', password: 'userpassword' })

      expect(dispatch).to.have.been.calledOnce
      expect(dispatch.getCall(0).args[0]).to.deep.equal({
        type: actionTypes.USER_AUTHENTICATED,
        accessToken: 'accessToken123',
        refreshToken: 'refreshToken123',
        expiresAt: '2017-01-01T00:02:00.000Z',
      })
    })
    describe('error handling', function() {
      it('should throw "Incorrect email/password." if errors with 401', async function () {
        try {
          prepTest(false, false, false, 401)
        } catch (err) {
          expect(err).to.not.be(null)
        }
        try {
          await actions.authAuthenticate('invalid@email.com', 'incorrectPassword')(dispatch)
        } catch (err) {
          expect(err.message).to.equal('Incorrect email/password.')
        }
      })
      it('should throw "Sorry, we were unable to log you in. Please contact customer care." if errors with 500', async function() {
        try {
          prepTest(false, false, false, 500)
        } catch (err) {
          expect(err).to.not.be(null)
        }
        try {
          await actions.authAuthenticate('invalid@email.com', 'incorrectPassword')(dispatch)
        } catch (e) {
          expect(e.message).to.equal('Sorry, we were unable to log you in. Please contact customer care.')
        }
      })
      it('should throw "Sorry, we were unable to log you in. Please contact customer care." if errors', async function() {
        try {
          prepTest(false, false, false)
        } catch (err) {
          expect(err).to.not.be(null)
        }
        try {
          await actions.authAuthenticate('invalid@email.com', 'incorrectPassword')(dispatch)
        } catch (e) {
          expect(e.message).to.equal('Sorry, we were unable to log you in. Please contact customer care.')
        }
      })
    })
  })

  describe('refresh', function() {
    it('should call refreshUserToken and dispatch result', async function() {
      try {
        prepTest()
      } catch (err) {
        expect(err).to.not.be(null)
      }
      await actions.authRefresh('ref-token')(dispatch)

      expect(refreshUserToken).to.have.been.calledOnce
      expect(refreshUserToken.getCall(0).args[0]).to.deep.equal({ refresh: 'ref-token' })

      expect(dispatch).to.have.been.calledOnce
      expect(dispatch.getCall(0).args[0]).to.deep.equal({
        type: actionTypes.USER_AUTHENTICATED,
        accessToken: 'new-accessToken123',
        refreshToken: 'new-refreshToken123',
        expiresAt: '2017-01-01T00:02:00.000Z',
      })
    })
  })

  describe('identify', function() {
    it('should call identifyUser and dispatch result when successful', async function() {
      try {
        prepTest(true, true)
      } catch (err) {
        expect(err).to.not.be(null)
      }
      await actions.authIdentify('acc-token')(dispatch)

      expect(identifyUser).to.have.been.calledOnce
      expect(identifyUser.getCall(0).args[0]).to.deep.equal('acc-token')

      expect(dispatch).to.have.been.calledTwice

      expect(dispatch.getCall(0).args[0]).to.deep.equal({
        type: actionTypes.USER_IDENTIFIED,
        user: { roles: ['role1', 'role2'] },
      })

      expect(dispatch.getCall(1).args[0]).to.deep.equal({
        type: actionTypes.USER_LOGGED_IN,
      })
    })

    it('should throw if accessToken is missing', async function() {
      try {
        try {
          prepTest(false, true)
        } catch (err) {
          expect(err).to.not.be(null)
        }
        await actions.authIdentify()(dispatch)
      } catch (err) {
        expect(err.message).to.equal('Access token not present')
      }
    })
  })

  describe('clear', function() {
    it('should call forgetUserToken', async function() {
      try {
        prepTest(true, true)
      } catch (err) {
        expect(err).to.not.be(null)
      }
      await actions.authClear()(dispatch, getState)

      expect(forgetUserToken).to.have.been.calledOnce
      expect(forgetUserToken.getCall(0).args[0]).to.deep.equal('accessToken123')
    })
  })

  describe('validate', function() {
    it('should dispatch the result of identify and do nothing if successful', async function() {
      try {
        prepTest(true, true)
      } catch (err) {
        expect(err).to.not.be(null)
      }
      await actions.authValidate('accessToken123', 'refreshToken123')(dispatch, getState)

      expect(dispatch).to.have.been.calledOnce
    })

    it('should throw if identify fails and no refresh token', async function() {
      try {
        try {
          prepTest(true, true)
        } catch (err) {
          expect(err).to.not.be(null)
        }
        dispatch = sinon.stub().returns(new Promise((resolve, reject) => reject()))

        await actions.authValidate('accessToken123', '')(dispatch, getState)
      } catch (err) {
        expect(err).to.not.be.null
        expect(dispatch).to.have.been.calledOnce
      }
    })

    it('should refresh if identifyUser failed and refresh token is supplied', async function() {
      try {
        prepTest(true, true)
      } catch (err) {
        expect(err).to.not.be(null)
      }
      dispatch = sinon.stub()
      dispatch.onCall(0).returns(new Promise((resolve, reject) => { reject() }))
      dispatch.onCall(1).returns(new Promise(resolve => { resolve() }))
      dispatch.onCall(2).returns(new Promise(resolve => { resolve() }))
      await actions.authValidate('accessToken123', 'refreshToken123')(dispatch, getState)

      expect(dispatch).to.have.been.calledThrice
    })

    it('should refresh if expired based on expiresAt', async function() {
      try {
        prepTest(true, true)
      } catch (err) {
        expect(err).to.not.be(null)
      }
      dispatch = sinon.stub()
      dispatch.onCall(0).returns(new Promise(resolve => { resolve() }))
      dispatch.onCall(1).returns(new Promise(resolve => { resolve() }))
      await actions.authValidate('accessToken123', 'refreshToken123', '2016-01-01')(dispatch, getState)

      expect(dispatch).to.have.been.calledTwice
    })
  })

  describe('resetPassword', function() {
    const sandbox = sinon.sandbox.create()
    const password = 'a-password'
    const token = 'a-token'
    let authActions
    let authResetPasswordStub
    let dispatchSpy
    let pendingSpy
    let errorSpy
    let redirectSpy
    let loginUserStub

    beforeEach(function() {
      authResetPasswordStub = () => new Promise((resolve) => { resolve({ data: { email: 'an-email' } }) })
      dispatchSpy = sandbox.spy()
      pendingSpy = sandbox.spy(statusActions, 'pending')
      errorSpy = sandbox.spy(statusActions, 'error')
      redirectSpy = sandbox.spy()
      loginUserStub = sandbox.stub(loginActions, 'loginUser')
      loginUserStub.withArgs('an-email', 'a-password', true).returns('loginUserStub result')
      authActions = require('inject-loader?apis/auth&utils/window!actions/auth')({ // eslint-disable-line global-require
        'apis/auth': {
          resetUserPassword: authResetPasswordStub,
        },
        'utils/window': {
          redirect: redirectSpy,
        },
      }).default
    })

    afterEach(function() {
      sandbox.restore()
    })

    it('should mark AUTH_PASSWORD_RESET as pending', async function() {
      await authActions.authResetPassword(password, token)(dispatchSpy)

      expect(pendingSpy).to.have.been.calledTwice
      expect(pendingSpy.getCall(0).args[0]).to.equal('AUTH_PASSWORD_RESET')
      expect(pendingSpy.getCall(0).args[1]).to.be.true
      expect(pendingSpy.getCall(1).args[0]).to.equal('AUTH_PASSWORD_RESET')
      expect(pendingSpy.getCall(1).args[1]).to.be.false
    })

    it('should mark AUTH_PASSWORD_RESET as errored if it errors', async function() {
      const err = new Error('oops')
      authResetPasswordStub = () => new Promise((resolve, reject) => { reject(err) })
      authActions = require('inject-loader?apis/auth!actions/auth')({ // eslint-disable-line global-require
        'apis/auth': {
          authResetPassword: authResetPasswordStub,
        },
      }).default
      await authActions.authResetPassword(password, token)(dispatchSpy)

      expect(pendingSpy).to.have.been.calledTwice
      expect(pendingSpy.getCall(0).args[0]).to.equal('AUTH_PASSWORD_RESET')
      expect(pendingSpy.getCall(0).args[1]).to.be.true
      expect(pendingSpy.getCall(1).args[0]).to.equal('AUTH_PASSWORD_RESET')
      expect(pendingSpy.getCall(1).args[1]).to.be.false

      expect(errorSpy).to.have.been.calledTwice
      expect(errorSpy.getCall(0).args[0]).to.equal('AUTH_PASSWORD_RESET')
      expect(errorSpy.getCall(0).args[1]).to.be.null
      expect(errorSpy.getCall(1).args[0]).to.equal('AUTH_PASSWORD_RESET')
      expect(errorSpy.getCall(1).args[1]).to.deep.equal(err.code)
    })

    it('should dispatch login action and redirect to /my-deliveries', async function() {
      await authActions.authResetPassword(password, token)(dispatchSpy)

      expect(redirectSpy).to.have.been.calledOnce
      expect(dispatchSpy).to.have.been.calledWithExactly('loginUserStub result')
      expect(redirectSpy).to.have.been.calledWithExactly('/my-deliveries')
    })
  })

  afterEach(function () {
    clock.restore()
  })
})
