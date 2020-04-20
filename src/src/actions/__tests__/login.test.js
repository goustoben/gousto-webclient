import Immutable from 'immutable'
import globals from 'config/globals'
import { zendesk, client } from 'config/routes'
import { actionTypes } from 'actions/actionTypes'
import loginActions, { helpPreLoginVisibilityChange } from 'actions/login'
import { isActive, isAdmin } from 'utils/auth'
import { documentLocation, redirect } from 'utils/window'
import userActions from 'actions/user'
import pricingActions from '../pricing'
import statusActions from '../status'
import authActions from '../auth'

jest.mock('config/globals')

jest.mock('actions/user')

jest.mock('react-router-redux', () => ({
  push: (param) => `${JSON.stringify(param)} pushed`
}))

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
    const userState = Immutable.fromJS({
      id: '123',
    })

    beforeEach(() => {
      jest.clearAllMocks()

      globals.domain = HOST_PRODUCTION
      authActions.authAuthenticate.mockReturnValue(null)
      authActions.authIdentify.mockReturnValue(null)
      getState.mockReturnValue({
        auth: authState,
        user: userState
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
      expect(pricingActions.pricingRequest).toHaveBeenCalled()
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
      expect(pricingActions.pricingRequest).toHaveBeenCalled()
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
      expect(pricingActions.pricingRequest).toHaveBeenCalled()
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

    describe('when the redirect URL is zendesk', () => {
      beforeEach(() => {
        documentLocation.mockReturnValueOnce({
          pathname: '/',
          protocol: 'http:',
          search: '?target=https://gousto.zendesk.com/hc/en-gb',
          slashes: true,
        })

        globals.domain = HOST_PRODUCTION
      })

      describe('and the userId is passed', () => {
        beforeEach(async () => {
          getState.mockReturnValue({
            auth: authState,
            user: Immutable.fromJS({
              id: '123',
            })
          })
          await loginActions.loginUser('email', 'password', true)(dispatch, getState)
        })

        it('then should redirect user to zendesk with the userId appended to the url', async () => {
          expect(redirect).toHaveBeenCalledWith(`${zendesk.faqs}?user_id=123`)
        })
      })

      describe('and the userId is not passed', () => {
        beforeEach(async () => {
          getState.mockReturnValue({
            auth: authState,
            user: Immutable.fromJS({
              id: null,
            })
          })
          await loginActions.loginUser('email', 'password', true)(dispatch, getState)
        })

        it('then should redirect user to zendesk', async () => {
          expect(redirect).toHaveBeenCalledWith(zendesk.faqs)
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
  })

  describe('loginRedirect', () => {
    describe('when the current url contain no search query parameters', () => {
      test('should redirect the user to my-gousto by default', () => {
        const url = loginActions.loginRedirect({
          pathname: '/',
          search: '',
        }, false, Immutable.Map({}))
        expect(url).toEqual('/my-gousto')
      })
    })

    describe('when the current url contains a promo_code search query', () => {
      test('should preserve promo_code', () => {
        const url = loginActions.loginRedirect({
          pathname: '/',
          hash: '#login',
          search: '?promo_code=GOUT3S',
        }, false, Immutable.Map({}))
        expect(url).toEqual('/my-gousto?promo_code=GOUT3S')
      })

      test('should preserve path when it is menu', () => {
        const url = loginActions.loginRedirect({
          pathname: '/menu',
          hash: '#login',
          search: '?promo_code=GOUT3S',
        }, false, Immutable.Map({}))
        expect(url).toEqual('/menu?promo_code=GOUT3S')
      })

      test('should preserve path when it is check-out', () => {
        const url = loginActions.loginRedirect({
          pathname: '/check-out',
          hash: '#login',
          search: '?promo_code=GOUT3S',
        }, false, Immutable.Map({}))
        expect(url).toEqual('/check-out?promo_code=GOUT3S')
      })

      test('should my-gousto when path is not menu or check-out', () => {
        const url = loginActions.loginRedirect({
          pathname: '/box-prices',
          hash: '#login',
          search: '?promo_code=GOUT3S',
        }, false, Immutable.Map({}))
        expect(url).toEqual('/my-gousto?promo_code=GOUT3S')
      })
    })

    describe('when the current url only contains a target search query', () => {
      test('should strip this from the destination', () => {
        const url = loginActions.loginRedirect({
          pathname: '/home',
          hash: '#login',
          search: '?target=fake.gousto.co.uk',
        }, false, Immutable.Map({}))

        expect(url).toEqual('/my-gousto')
      })
    })

    describe('helpPreLoginVisibilityChange', () => {
      describe('Given the action is called with visibility true', () => {
        let dispatch

        beforeEach(() => {
          dispatch = jest.fn()
          helpPreLoginVisibilityChange(true)(dispatch)
        })

        test('the query parameter target is set to the eligibility check URL', () => {
          const { index, eligibilityCheck } = client.getHelp
          const search = `?target=${encodeURIComponent(`${__CLIENT_PROTOCOL__}://${__DOMAIN__}${index}/${eligibilityCheck}`)}`
          const serialisedQueryStringObject = JSON.stringify({ search })
          expect(dispatch).toHaveBeenCalledWith(`${serialisedQueryStringObject} pushed`)
        })
      })
    })
  })
})
