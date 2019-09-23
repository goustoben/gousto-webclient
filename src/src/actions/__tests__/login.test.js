import Immutable from 'immutable'

import actionTypes from 'actions/actionTypes'
import loginActions from 'actions/login'
import { isActive, isAdmin } from 'utils/auth'
import { documentLocation, redirect } from 'utils/window'
import statusActions from '../status'
import authActions from '../auth'

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

describe('login actions', () => {
  describe('login', () => {
    redirect.mockReturnValue(true)
    const dispatch = jest.fn()
    const getState = jest.fn()

    beforeEach(function() {
      jest.clearAllMocks()
    })

    it('should call userRememberMe and postLoginSteps - non admin, rememeber me, /menu, no redirect', async function() {
      authActions.authAuthenticate.mockReturnValue(new Promise((resolve) => { resolve() }))
      authActions.authIdentify.mockReturnValue(new Promise((resolve) => { resolve() }))
      getState.mockReturnValue({
        auth: Immutable.fromJS({ accessToken: 'acc-token', roles: ['user'] }),
        routing: { locationBeforeTransitions: { pathname: '/menu' } },
      })
      isActive.mockReturnValue(true)
      documentLocation.mockReturnValue({ pathname: '/menu' })

      await loginActions.loginUser('email', 'password', true)(dispatch, getState)

      expect(statusActions.pending).toHaveBeenCalledTimes(2)
      expect(statusActions.error).toHaveBeenCalledTimes(1)
      expect(dispatch.mock.calls[3][0]).toEqual({
        type: actionTypes.LOGIN_REMEMBER_ME,
      })
      expect(authActions.authAuthenticate).toHaveBeenCalledWith('email', 'password', true)
      expect(authActions.authIdentify).toHaveBeenCalled()
      expect(isActive).toHaveBeenCalledWith(Immutable.fromJS(['user']))
      expect(isAdmin).toHaveBeenCalledWith(Immutable.fromJS(['user']))
      expect(authActions.userRememberMe).toHaveBeenCalledWith(true)
      expect(redirect).not.toHaveBeenCalled()
    })

    it('should call userRememberMe and postLoginSteps - non admin, rememeber me, /home, no redirect', async function() {
      authActions.authAuthenticate.mockReturnValue(new Promise((resolve) => { resolve() }))
      authActions.authIdentify.mockReturnValue(new Promise((resolve) => { resolve() }))
      getState.mockReturnValue({ auth: Immutable.fromJS({ accessToken: 'acc-token', roles: ['user'] }) })
      isActive.mockReturnValue(true)
      documentLocation.mockReturnValue({ pathname: '/home' })
      await loginActions.loginUser('email', 'password', true)(dispatch, getState)
      expect(statusActions.pending).toHaveBeenCalledTimes(2)
      expect(statusActions.error).toHaveBeenCalledTimes(1)
      expect(authActions.authAuthenticate).toHaveBeenCalledWith('email', 'password', true)
      expect(authActions.authIdentify).toHaveBeenCalled()
      expect(isActive).toHaveBeenCalledWith(Immutable.fromJS(['user']))
      expect(isAdmin).toHaveBeenCalledWith(Immutable.fromJS(['user']))
      expect(authActions.userRememberMe).toHaveBeenCalledWith(true)
      expect(redirect).toHaveBeenCalledWith('/my-gousto')
    })

    it('should call userRememberMe and postLoginSteps - admin, /home, no redirect', async function() {
      authActions.authAuthenticate.mockReturnValue(new Promise((resolve) => { resolve() }))
      authActions.authIdentify.mockReturnValue(new Promise((resolve) => { resolve() }))
      getState.mockReturnValue({ auth: Immutable.fromJS({ accessToken: 'acc-token', roles: ['user'] }) })
      isActive.mockReturnValueOnce(true)
      isAdmin.mockReturnValueOnce(true)
      documentLocation.mockReturnValue({ pathname: '/home' })
      await loginActions.loginUser('email', 'password', true)(dispatch, getState)
      expect(statusActions.pending).toHaveBeenCalledTimes(2)
      expect(statusActions.error).toHaveBeenCalledTimes(1)
      expect(authActions.authAuthenticate).toHaveBeenCalledWith('email', 'password', true)
      expect(authActions.authIdentify).toHaveBeenCalled()
      expect(isActive).toHaveBeenCalledWith(Immutable.fromJS(['user']))
      expect(isAdmin).toHaveBeenCalledWith(Immutable.fromJS(['user']))
      expect(authActions.userRememberMe).toHaveBeenCalledWith(true)
      expect(redirect).toHaveBeenCalledWith('/menu?features[]=browse')
    })

    it('should call userRememberMe and postLoginSteps - user, /home, redirect', async function() {
      authActions.authAuthenticate.mockReturnValue(new Promise((resolve) => { resolve() }))
      authActions.authIdentify.mockReturnValue(new Promise((resolve) => { resolve() }))
      getState.mockReturnValue({ auth: Immutable.fromJS({ accessToken: 'acc-token', roles: ['user'] }) })
      isActive.mockReturnValueOnce(true)
      documentLocation.mockReturnValue({ pathname: '/home', search: '?target=http://gousto.co.uk/my-details' })
      await loginActions.loginUser('email', 'password', true)(dispatch, getState)
      expect(statusActions.pending).toHaveBeenCalledTimes(2)
      expect(statusActions.error).toHaveBeenCalledTimes(1)
      expect(authActions.authAuthenticate).toHaveBeenCalledWith('email', 'password', true)
      expect(isActive).toHaveBeenCalledWith(Immutable.fromJS(['user']))
      expect(isAdmin).toHaveBeenCalledWith(Immutable.fromJS(['user']))
      expect(authActions.userRememberMe).toHaveBeenCalledWith(true)
      expect(redirect).toHaveBeenCalledWith('/my-details')
    })
  })
})
