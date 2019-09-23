import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import actionTypes from 'actions/actionTypes'

chai.use(sinonChai)

import Immutable from 'immutable'

describe('login actions', function() {
  let actions, dispatch, getState, pending, error, authAuthenticate, authIdentify, auth, isActive, isSuspended, needsReactivating, isAdmin, userRememberMe, authClear, redirect, documentLocation, orderAssignToUser, validateEmail, getWindow

  describe('login', function() {
    beforeEach(function() {
      pending = sinon.spy()
      error = sinon.spy()
      authAuthenticate = sinon.spy()
      authIdentify = sinon.spy()
      userRememberMe = sinon.spy()
      auth = { authAuthenticate, authIdentify, userRememberMe, authClear }
      isActive = sinon.stub().returns(false)
      isSuspended = sinon.stub().returns(false)
      needsReactivating = sinon.stub().returns(false)
      isAdmin = sinon.stub().returns(false)
      redirect = sinon.stub().returns(true)
      authClear = sinon.spy()
      getWindow = sinon.spy()
      dispatch = sinon.stub()
      getState = sinon.stub()
    })

    it('should dispatch an error if authAuthenticate fails', async function() {
      dispatch.onCall(3).returns(new Promise((resolve, reject) => { reject(new Error('error message')) }))
      getState.returns({ checkout: Immutable.fromJS({ onCheckout: false }) })
      actions = require('inject-loader?./status&./auth&utils/window!actions/login')({
        './status': { pending, error },
        './auth': auth,
        'utils/window': {
          getWindow,
        },
      }).default
      await actions.loginUser('email', 'password', false)(dispatch, getState)
      expect(pending).to.have.been.calledTwice
      expect(error).to.have.been.calledTwice
      expect(authAuthenticate).to.have.been.calledWith('email', 'password')
      expect(authIdentify).to.have.not.been.called
    })

    it('should dispatch an error if authIdentify fails', async function() {
      dispatch.onCall(3).returns(new Promise((resolve, reject) => { resolve() }))
      dispatch.onCall(4).returns(new Promise((resolve, reject) => { reject(new Error('error message')) }))
      getState.returns({ auth: Immutable.fromJS({ accessToken: 'acc-token' }) })
      actions = require('inject-loader?./status&./auth!actions/login')({
        './status': { pending, error },
        './auth': auth,
        'utils/window': {
          getWindow,
        },
      }).default
      await actions.loginUser('email', 'password', false)(dispatch, getState)
      expect(pending).to.have.been.calledTwice
      expect(error).to.have.been.calledTwice
      expect(authAuthenticate).to.have.been.calledWith('email', 'password')
      expect(dispatch.getCall(2).args[0]).to.deep.equal({
        type: actionTypes.LOGIN_ATTEMPT,
      })
      expect(authIdentify.getCall(0).args[0]).to.equal('acc-token')
    })

    it('should dispatch an error if user is not active', async function() {
      dispatch.onCall(3).returns(new Promise((resolve, reject) => { resolve() }))
      dispatch.onCall(4).returns(new Promise((resolve, reject) => { resolve() }))
      getState = sinon.stub().returns({ auth: Immutable.fromJS({ accessToken: 'acc-token', roles: ['user'] }) })
      isActive = sinon.stub().returns(false)
      actions = require('inject-loader?./status&./auth&utils/auth!actions/login')({
        './status': { pending, error },
        './auth': auth,
        'utils/auth': { isActive, isSuspended, needsReactivating, isAdmin },
        'utils/window': {
          getWindow,
        },
      }).default
      await actions.loginUser('email', 'password', false)(dispatch, getState)
      expect(pending).to.have.been.calledTwice
      expect(error).to.have.been.calledTwice
      expect(authAuthenticate).to.have.been.calledWith('email', 'password')
      expect(authIdentify.getCall(0).args[0]).to.equal('acc-token')
      expect(isActive.getCall(0).args[0]).to.deep.equal(Immutable.fromJS(['user']))
    })

    it('should dispatch a userPromoApplyCode with the promo code in the basket if exists and user is not an admin', async function() {
      getState = sinon.stub().returns({
        auth: Immutable.fromJS({ accessToken: 'acc-token', roles: ['user'] }),
        basket: Immutable.fromJS({
          promoCode: '10off',
        }),
      })

      const userPromoApplyCode = sinon.stub().returns(new Promise((resolve, reject) => { resolve() }))
      isActive = sinon.stub().returns(true)
      documentLocation = sinon.stub().returns({ pathname: '/home', search: '?target=http://gousto.co.uk/my-details' })

      actions = require('inject-loader?./user&./status&./auth&utils/auth&utils/window!actions/login')({
        './status': { pending, error },
        './auth': auth,
        './user': {
          userPromoApplyCode,
        },
        'utils/auth': { isActive, isSuspended, needsReactivating, isAdmin },
        'utils/window': { redirect, documentLocation, getWindow },
      }).default

      await actions.loginUser('email', 'password', true)(dispatch, getState)
      expect(userPromoApplyCode).to.have.been.calledOnce
    })

    it('should dispatch authClear and postLogoutSteps', async function() {
      actions = require('inject-loader?./status&./auth&utils/auth&utils/window!actions/login')({
        './status': { pending, error },
        './auth': auth,
        'utils/window': {
          getWindow,
        },
      }).default
      await actions.logoutUser()(dispatch)
      expect(dispatch).to.have.been.calledTwice
    })
  })

  describe('loginRedirect', function() {
    let loginRedirect
    let redirectSpy

    beforeEach(function() {
      redirectSpy = sinon.spy()

      loginRedirect = require('inject-loader?utils/window!actions/login')({
        'utils/window': { redirect: redirectSpy },
      }).default.loginRedirect
    })

    it('should redirect to target page if target is found in url search & is a valid URL', function() {
      loginRedirect({
        pathname: '/any',
        search: '?target=http://gousto.co.uk/my-deliveries',
      }, false)
      expect(redirectSpy).to.have.been.calledOnce
      expect(redirectSpy.getCall(0).args[0]).to.equal('/my-deliveries')
    })

    it('should redirect to menu in browse mode if user is admin', function() {
      loginRedirect({
        pathname: '/any',
      }, true)
      expect(redirectSpy).to.have.been.calledOnce
      expect(redirectSpy.getCall(0).args[0]).to.equal('/menu?features[]=browse')
    })

    it('should redirect to my-gousto by default if not admin & not on menu or checkout', function() {
      loginRedirect({
        pathname: '//any-aside-from-menu-or-check-out',
      }, false)
      expect(redirectSpy).to.have.been.calledOnce
      expect(redirectSpy.getCall(0).args[0]).to.equal('/my-gousto')
    })

    it('should redirect to afterLogin page if not admin & not on menu or checkout & afterLogin feature is set to one of configured pages', function() {
      loginRedirect({
        pathname: '/any-aside-from-menu-or-check-out',
      }, false, Immutable.fromJS({ afterLogin: { value: 'myDeliveries' } }))
      expect(redirectSpy).to.have.been.calledOnce
      expect(redirectSpy.getCall(0).args[0]).to.equal('/my-deliveries')
    })

    it('should redirect to fallback my-gousto page if not admin & not on menu or checkout & afterLogin feature is set, but NOT to one of configured pages', function() {
      loginRedirect({
        pathname: '/any-aside-from-menu-or-check-out',
      }, false, Immutable.fromJS({ afterLogin: { value: 'somethingFake' } }))
      expect(redirectSpy).to.have.been.calledOnce
      expect(redirectSpy.getCall(0).args[0]).to.equal('/my-gousto')
    })

    it('should NOT redirect if no valid target, not admin, & on menu or checkout', function() {
      loginRedirect({
        pathname: '/menu',
      }, false)
      loginRedirect({
        pathname: '/check-out',
      }, false)
      expect(redirectSpy).to.have.not.been.called
    })
  })

  describe('cannotLogin', function() {
    beforeEach(function() {
      dispatch = sinon.spy()
      error = sinon.spy()
      validateEmail = sinon.stub().returns(false)
      actions = require('inject-loader?./status&./auth&utils/auth!actions/login')({
        './status': { pending, error },
        './auth': auth,
        'utils/auth': { isActive, isSuspended, needsReactivating, isAdmin, validateEmail },
      }).default
    })

    it('should dispatch with "Please enter an email address." when no email address is provided', async function() {
      await actions.cannotLogin({ email: undefined, password: 'password' })(dispatch)
      expect(dispatch).to.have.been.called
      expect(error).to.have.been.calledWith(actionTypes.USER_LOGIN)
    })

    it('should dispatch with "The email address you\'ve entered is formatted incorrectly." when a poorly formatted email is provided', async function() {
      await actions.cannotLogin({ email: 'aliceexample.com', password: 'password' })(dispatch)
      expect(dispatch).to.have.been.called
      expect(error).to.have.been.calledWith(actionTypes.USER_LOGIN, 'The email address you\'ve entered is formatted incorrectly.')
    })

    it('should dispatch with "Please enter a password" when no password is provided', async function() {
      validateEmail = sinon.stub().returns(true)
      await actions.cannotLogin({ email: 'test@test.com', password: undefined })(dispatch)
      expect(dispatch).to.have.been.called
      expect(error).to.have.been.calledWith(actionTypes.USER_LOGIN, 'Please enter a password.')
    })

    it('should not dispatch when a valid email/password combo is provided', async function() {
      validateEmail = sinon.stub().returns(true)
      actions = require('inject-loader?./status&./auth&utils/auth!actions/login')({
        './status': { pending, error },
        './auth': auth,
        'utils/auth': { isActive, isSuspended, needsReactivating, isAdmin, validateEmail },
      }).default
      await actions.cannotLogin({ email: 'alice@example.com', password: 'password' })(dispatch)
      expect(error).to.have.not.been.called
      expect(dispatch).to.have.not.been.called
    })
  })
})
