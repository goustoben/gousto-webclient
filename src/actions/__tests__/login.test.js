import Immutable from 'immutable'
import globals from 'config/globals'
import actionTypes from 'actions/actionTypes'
import loginActions from 'actions/login'
import { isActive, isAdmin } from 'utils/auth'
import { documentLocation, redirect } from 'utils/window'
import pricingActions from '../pricing'
import statusActions from '../status'
import authActions from '../auth'

jest.mock('config/globals')

jest.mock('../pricing', () => ({
  pricingRequest: jest.fn()
}))

jest.mock('../status', () => ({
  pending: jest.fn(),
  error: jest.fn()
}))

jest.mock('../auth', () => ({
  authAuthenticate: jest.fn(),
  authIdentify: jest.fn(),
  userRememberMe: jest.fn(),
  authClear: jest.fn()
}))

jest.mock('utils/auth', () => ({
  isActive: jest.fn(),
  isAdmin: jest.fn(),
  isSuspended: jest.fn(),
  needsReactivating: jest.fn(),
}))

jest.mock('utils/window', () => ({
  documentLocation: jest.fn(),
  getWindow: jest.fn(),
  redirect: jest.fn(),
}))

const HOST_LOCAL = 'frontend.gousto.local'
const HOST_STAGING = 'staging-frontend.gousto.info'
const HOST_PRODUCTION = 'gousto.co.uk'

describe('login actions', () => {
  describe('login', () => {
    redirect.mockReturnValue(true)
    const dispatch = jest.fn()
    const getState = jest.fn()
    const authState = Immutable.fromJS({
      accessToken: 'acc-token',
      roles: ['user']
    })

    beforeEach(function() {
      jest.clearAllMocks()

      globals.domain = HOST_PRODUCTION
      authActions.authAuthenticate.mockReturnValue(null)
      authActions.authIdentify.mockReturnValue(null)
      getState.mockReturnValue({
        auth: authState,
      })
      isActive.mockReturnValue(true)
    })

    it('should call userRememberMe and postLoginSteps - non admin, rememeber me, /menu, no redirect', async function() {
      getState.mockReturnValue({
        auth: authState,
        routing: { locationBeforeTransitions: { pathname: '/menu' } },
      })
      documentLocation.mockReturnValueOnce({ pathname: '/menu' })

      await loginActions.loginUser('email', 'password', true)(dispatch, getState)

      expect(statusActions.pending).toHaveBeenCalledTimes(2)
      expect(statusActions.error).toHaveBeenCalledTimes(1)
      expect(dispatch.mock.calls[3][0]).toEqual({
        type: actionTypes.LOGIN_REMEMBER_ME,
      })
      expect(authActions.authAuthenticate).toHaveBeenCalledWith('email', 'password', true)
      expect(authActions.authIdentify).toHaveBeenCalled()
      expect(pricingActions.pricingRequest).toHaveBeenCalled()
      expect(isActive).toHaveBeenCalledWith(Immutable.fromJS(['user']))
      expect(isAdmin).toHaveBeenCalledWith(Immutable.fromJS(['user']))
      expect(authActions.userRememberMe).toHaveBeenCalledWith(true)
      expect(redirect).not.toHaveBeenCalled()
    })

    it('should call userRememberMe and postLoginSteps - non admin, rememeber me, /home, no redirect', async function() {
      documentLocation.mockReturnValueOnce({ pathname: '/home' })
      await loginActions.loginUser('email', 'password', true)(dispatch, getState)
      expect(statusActions.pending).toHaveBeenCalledTimes(2)
      expect(statusActions.error).toHaveBeenCalledTimes(1)
      expect(authActions.authAuthenticate).toHaveBeenCalledWith('email', 'password', true)
      expect(authActions.authIdentify).toHaveBeenCalled()
      expect(pricingActions.pricingRequest).toHaveBeenCalled()
      expect(isActive).toHaveBeenCalledWith(Immutable.fromJS(['user']))
      expect(isAdmin).toHaveBeenCalledWith(Immutable.fromJS(['user']))
      expect(authActions.userRememberMe).toHaveBeenCalledWith(true)
      expect(redirect).toHaveBeenCalledWith('/my-gousto')
    })

    it('should call userRememberMe and postLoginSteps - admin, /home, no redirect', async function() {
      isAdmin.mockReturnValueOnce(true)
      documentLocation.mockReturnValue({ pathname: '/home' })
      await loginActions.loginUser('email', 'password', true)(dispatch, getState)
      expect(statusActions.pending).toHaveBeenCalledTimes(2)
      expect(statusActions.error).toHaveBeenCalledTimes(1)
      expect(authActions.authAuthenticate).toHaveBeenCalledWith('email', 'password', true)
      expect(authActions.authIdentify).toHaveBeenCalled()
      expect(pricingActions.pricingRequest).toHaveBeenCalled()
      expect(isActive).toHaveBeenCalledWith(Immutable.fromJS(['user']))
      expect(isAdmin).toHaveBeenCalledWith(Immutable.fromJS(['user']))
      expect(authActions.userRememberMe).toHaveBeenCalledWith(true)
      expect(redirect).toHaveBeenCalledWith('/menu?features[]=browse')
    })

    it('should call userRememberMe and postLoginSteps - user, /home, redirect', async function() {
      documentLocation.mockReturnValue({
        pathname: '/home',
        protocol: 'http:',
        search: '?target=http://www.gousto.co.uk/my-details',
        slashes: true,
      })

      await loginActions.loginUser('email', 'password', true)(dispatch, getState)

      expect(statusActions.pending).toHaveBeenCalledTimes(2)
      expect(statusActions.error).toHaveBeenCalledTimes(1)
      expect(authActions.authAuthenticate).toHaveBeenCalledWith('email', 'password', true)
      expect(authActions.authIdentify).toHaveBeenCalled()
      expect(pricingActions.pricingRequest).toHaveBeenCalled()
      expect(isActive).toHaveBeenCalledWith(Immutable.fromJS(['user']))
      expect(isAdmin).toHaveBeenCalledWith(Immutable.fromJS(['user']))
      expect(authActions.userRememberMe).toHaveBeenCalledWith(true)
      expect(redirect).toHaveBeenCalledWith('/my-details')
    })

    describe('and redirect url matches with global __DOMAIN__', () => {
      describe('user is on local', () => {
        beforeEach(() => {
          documentLocation.mockReturnValueOnce({
            pathname: '/menu',
            protocol: 'http:',
            search: `?target=http://${HOST_LOCAL}/my-gousto`,
            slashes: true,
          })

          globals.domain = HOST_LOCAL
        })

        it ('should redirect user to the targeted URL', async () => {
          await loginActions.loginUser('email', 'password', true)(dispatch, getState)
          expect(redirect).toHaveBeenCalledWith('/my-gousto')
        })
      })

      describe('user is on staging', () => {
        beforeEach(() => {
          documentLocation.mockReturnValueOnce({
            pathname: '/menu',
            protocol: 'http:',
            search: `?target=http://${HOST_STAGING}/my-gousto`,
            slashes: true,
          })

          globals.domain = HOST_STAGING
        })

        it ('should redirect user to the targeted URL', async () => {
          await loginActions.loginUser('email', 'password', true)(dispatch, getState)
          expect(redirect).toHaveBeenCalledWith('/my-gousto')
        })
      })
    })

    describe('and redirect url does not match with global __DOMAIN__', () => {
      beforeEach(() => {
        globals.domain = HOST_PRODUCTION
      })

      describe('user is under /menu', () => {
        beforeEach(() => {
          documentLocation.mockReturnValueOnce({
            pathname: '/menu',
            protocol: 'http:',
            search: `?target=${HOST_PRODUCTION}.evil.me/`,
            slashes: true,
          })
        })

        it ('should not redirect user to the targeted URL', async () => {
          await loginActions.loginUser('email', 'password', true)(dispatch, getState)
          expect(redirect).toHaveBeenCalledTimes(0)
        })
      })

      describe('user is under /home', () => {
        beforeEach(() => {
          documentLocation.mockReturnValueOnce({
            pathname: '/home',
            protocol: 'http:',
            search: `?target=${HOST_PRODUCTION}.evil.me/`,
            slashes: true,
          })
        })

        it ('should redirect user without target in the URL', async () => {
          await loginActions.loginUser('email', 'password', true)(dispatch, getState)
          expect(redirect).toHaveBeenCalledWith('/my-gousto')
        })
      })
    })
  })
})
