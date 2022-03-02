import Immutable from 'immutable'
import globals from 'config/globals'
import { client } from 'config/routes'
import { actionTypes } from 'actions/actionTypes'
import loginActions, { helpPreLoginVisibilityChange, loginRedirect } from 'actions/login'
import { isOptimizelyFeatureEnabledFactory } from 'containers/OptimizelyRollouts/optimizelyUtils'
import { isActive, isAdmin } from 'utils/auth'
import { documentLocation, redirect } from 'utils/window'
import { canUseWindow } from 'utils/browserEnvironment'
import statusActions from '../status'
import authActions from '../auth'

jest.mock('utils/browserEnvironment')
jest.mock('config/globals')
jest.mock('containers/OptimizelyRollouts/optimizelyUtils')

jest.mock('actions/user')

jest.mock('react-router-redux', () => ({
  push: (param) => `${JSON.stringify(param)} pushed`
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
  beforeEach(() => {
    canUseWindow.mockReturnValue(false)
  })

  describe('login', () => {
    redirect.mockReturnValue(true)
    const dispatch = jest.fn()
    const getState = jest.fn()
    const authState = Immutable.fromJS({
      accessToken: 'acc-token',
      roles: ['user']
    })
    const userState = Immutable.fromJS({
      id: '123',
    })
    const requestState = Immutable.fromJS({ browser: 'mobile' })

    beforeEach(() => {
      jest.clearAllMocks()

      globals.domain = HOST_PRODUCTION
      authActions.authAuthenticate.mockReturnValue(null)
      authActions.authIdentify.mockReturnValue(null)
      getState.mockReturnValue({
        auth: authState,
        user: userState,
        request: requestState
      })
      isActive.mockReturnValue(true)
    })

    it('should call userRememberMe and postLoginSteps - non admin, rememeber me, /menu, no redirect', async () => {
      getState.mockReturnValue({
        auth: authState,
        user: userState,
        routing: { locationBeforeTransitions: { pathname: '/menu' } },
      })
      documentLocation.mockReturnValueOnce({ pathname: '/menu' })

      await loginActions.loginUser({ email: 'email', password: 'password', rememberMe: true })(dispatch, getState)

      expect(statusActions.pending).toHaveBeenCalledTimes(2)
      expect(statusActions.error).toHaveBeenCalledTimes(1)
      expect(dispatch.mock.calls[3][0]).toEqual({
        type: actionTypes.LOGIN_REMEMBER_ME,
      })
      expect(authActions.authAuthenticate).toHaveBeenCalledWith('email', 'password', true, null)
      expect(authActions.authIdentify).toHaveBeenCalled()
      expect(isActive).toHaveBeenCalledWith(Immutable.fromJS(['user']))
      expect(isAdmin).toHaveBeenCalledWith(Immutable.fromJS(['user']))
      expect(authActions.userRememberMe).toHaveBeenCalledWith(true)
      expect(redirect).not.toHaveBeenCalled()
    })

    it('should call authAuthenticate action with correct recaptchaToken', async () => {
      const recaptchaToken = '1234'

      await loginActions.loginUser({ email: 'email', password: 'password', rememberMe: true, recaptchaToken })(dispatch, getState)

      expect(authActions.authAuthenticate).toHaveBeenCalledWith('email', 'password', true, recaptchaToken)
    })

    it('should call userRememberMe and postLoginSteps - non admin, rememeber me, /home, no redirect', async () => {
      documentLocation.mockReturnValueOnce({ pathname: '/home' })
      await loginActions.loginUser({ email: 'email', password: 'password', rememberMe: true })(dispatch, getState)
      expect(statusActions.pending).toHaveBeenCalledTimes(2)
      expect(statusActions.error).toHaveBeenCalledTimes(1)
      expect(authActions.authAuthenticate).toHaveBeenCalledWith('email', 'password', true, null)
      expect(authActions.authIdentify).toHaveBeenCalled()
      expect(isActive).toHaveBeenCalledWith(Immutable.fromJS(['user']))
      expect(isAdmin).toHaveBeenCalledWith(Immutable.fromJS(['user']))
      expect(authActions.userRememberMe).toHaveBeenCalledWith(true)
      expect(redirect).toHaveBeenCalledWith('/my-gousto')
    })

    it('should call userRememberMe and postLoginSteps - admin, /home, no redirect', async () => {
      isAdmin.mockReturnValueOnce(true)
      documentLocation.mockReturnValue({ pathname: '/home' })
      await loginActions.loginUser({ email: 'email', password: 'password', rememberMe: true })(dispatch, getState)
      expect(statusActions.pending).toHaveBeenCalledTimes(2)
      expect(statusActions.error).toHaveBeenCalledTimes(1)
      expect(authActions.authAuthenticate).toHaveBeenCalledWith('email', 'password', true, null)
      expect(authActions.authIdentify).toHaveBeenCalled()
      expect(isActive).toHaveBeenCalledWith(Immutable.fromJS(['user']))
      expect(isAdmin).toHaveBeenCalledWith(Immutable.fromJS(['user']))
      expect(authActions.userRememberMe).toHaveBeenCalledWith(true)
      expect(redirect).toHaveBeenCalledWith('/menu')
    })

    it('should call userRememberMe and postLoginSteps - user, /home, redirect', async () => {
      documentLocation.mockReturnValue({
        pathname: '/home',
        protocol: 'http:',
        search: '?target=http://www.gousto.co.uk/my-details',
        slashes: true,
      })

      await loginActions.loginUser({ email: 'email', password: 'password', rememberMe: true })(dispatch, getState)

      expect(statusActions.pending).toHaveBeenCalledTimes(2)
      expect(statusActions.error).toHaveBeenCalledTimes(1)
      expect(authActions.authAuthenticate).toHaveBeenCalledWith('email', 'password', true, null)
      expect(authActions.authIdentify).toHaveBeenCalled()
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

        it('should redirect user to the targeted URL', async () => {
          await loginActions.loginUser({ email: 'email', password: 'password', rememberMe: true })(dispatch, getState)
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

        it('should redirect user to the targeted URL', async () => {
          await loginActions.loginUser({ email: 'email', password: 'password', rememberMe: true })(dispatch, getState)
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

        it('should not redirect user to the targeted URL and should redirect to /menu', async () => {
          await loginActions.loginUser({ email: 'email', password: 'password', rememberMe: true })(dispatch, getState)
          expect(redirect).not.toHaveBeenCalledWith(`${HOST_PRODUCTION}.evil.me`)
          expect(redirect).toHaveBeenCalledWith('/menu')
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

        it('should redirect user without target in the URL', async () => {
          await loginActions.loginUser({ email: 'email', password: 'password', rememberMe: true })(dispatch, getState)
          expect(redirect).toHaveBeenCalledWith('/my-gousto')
        })
      })
    })

    describe('when user is on mobile web browser', () => {
      test('then should redirect to /taste-profile if user is in the experiment variant', async () => {
        const orderId = 'order-1'
        documentLocation.mockReturnValue({
          pathname: '/check-out',
          protocol: 'http:',
          search: '?target=http://www.gousto.co.uk/whatever',
          slashes: true
        })
        const mockIsTasteProfileEnabled = jest.fn()
        isOptimizelyFeatureEnabledFactory.mockImplementation((feature) => {
          if (feature === 'turnips_taste_profile_web_phased_rollout') {
            return mockIsTasteProfileEnabled
          }
        })
        mockIsTasteProfileEnabled.mockResolvedValue(true)

        await loginActions.loginUser({ email: 'email', password: 'password', rememberMe: true }, orderId)(dispatch, getState)

        expect(statusActions.pending).toHaveBeenCalledTimes(2)
        expect(statusActions.error).toHaveBeenCalledTimes(1)
        expect(authActions.authAuthenticate).toHaveBeenCalledWith('email', 'password', true, null)
        expect(authActions.authIdentify).toHaveBeenCalled()
        expect(isActive).toHaveBeenCalledWith(Immutable.fromJS(['user']))
        expect(isAdmin).toHaveBeenCalledWith(Immutable.fromJS(['user']))
        expect(redirect).toHaveBeenCalledWith(`/taste-profile/${orderId}`)
      })

      test('then should redirect to /welcome-to-gousto if user is NOT in the experiment variant', async () => {
        const orderId = 'order-1'
        documentLocation.mockReturnValue({
          pathname: '/check-out',
          protocol: 'http:',
          search: '?target=http://www.gousto.co.uk/welcome-to-gousto',
          slashes: true
        })
        const mockIsTasteProfileEnabled = jest.fn()
        isOptimizelyFeatureEnabledFactory.mockImplementation((feature) => {
          if (feature === 'turnips_taste_profile_web_phased_rollout') {
            return mockIsTasteProfileEnabled
          }
        })
        mockIsTasteProfileEnabled.mockResolvedValue(false)

        await loginActions.loginUser({ email: 'email', password: 'password', rememberMe: true }, orderId)(dispatch, getState)

        expect(statusActions.pending).toHaveBeenCalledTimes(2)
        expect(statusActions.error).toHaveBeenCalledTimes(1)
        expect(authActions.authAuthenticate).toHaveBeenCalledWith('email', 'password', true, null)
        expect(authActions.authIdentify).toHaveBeenCalled()
        expect(isActive).toHaveBeenCalledWith(Immutable.fromJS(['user']))
        expect(isAdmin).toHaveBeenCalledWith(Immutable.fromJS(['user']))
        expect(dispatch).toHaveBeenCalledWith('"/welcome-to-gousto/order-1" pushed')
      })
    })
  })

  describe('loginRedirect', () => {
    describe('when the current url contain no search query parameters', () => {
      test('should redirect the user to my-gousto by default', () => {
        const url = loginRedirect({
          pathname: '/',
          search: '',
        }, false, Immutable.Map({}))
        expect(url).toEqual('/my-gousto')
      })
    })

    describe('when the current url contains a promo_code search query', () => {
      test('should preserve promo_code', () => {
        const url = loginRedirect({
          pathname: '/',
          hash: '#login',
          search: '?promo_code=GOUT3S',
        }, false, Immutable.Map({}))
        expect(url).toEqual('/my-gousto?promo_code=GOUT3S')
      })

      test('should preserve path when it is menu', () => {
        const url = loginRedirect({
          pathname: '/menu',
          hash: '#login',
          search: '?promo_code=GOUT3S',
        }, false, Immutable.Map({}))
        expect(url).toEqual('/menu?promo_code=GOUT3S')
      })

      test('should preserve path when it is check-out', () => {
        const url = loginRedirect({
          pathname: '/check-out',
          hash: '#login',
          search: '?promo_code=GOUT3S',
        }, false, Immutable.Map({}))
        expect(url).toEqual('/check-out?promo_code=GOUT3S')
      })

      test('should my-gousto when path is not menu or check-out', () => {
        const url = loginRedirect({
          pathname: '/box-prices',
          hash: '#login',
          search: '?promo_code=GOUT3S',
        }, false, Immutable.Map({}))
        expect(url).toEqual('/my-gousto?promo_code=GOUT3S')
      })
    })

    describe('when the current url only contains a target search query', () => {
      test('should strip this from the destination', () => {
        const url = loginRedirect({
          pathname: '/home',
          hash: '#login',
          search: '?target=fake.gousto.co.uk',
        }, false, Immutable.Map({}))

        expect(url).toEqual('/my-gousto')
      })
    })

    describe('helpPreLoginVisibilityChange', () => {
      let dispatch

      beforeEach(() => {
        dispatch = jest.fn()
      })

      describe('Given the action is called with visibility true', () => {
        beforeEach(() => {
          helpPreLoginVisibilityChange(true)(dispatch)
        })

        test('the query parameter target is set to the Help Centre URL', () => {
          const { helpCentre } = client
          const helpCentreURL = `${__CLIENT_PROTOCOL__}://${__DOMAIN__}${helpCentre}`
          const search = `?target=${encodeURIComponent(helpCentreURL)}`
          const serialisedQueryStringObject = JSON.stringify({ search })
          expect(dispatch).toHaveBeenCalledWith(`${serialisedQueryStringObject} pushed`)
        })
      })
    })
  })
})
