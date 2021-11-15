import fetch from 'utils/fetch'
import isomorphicFetch from 'isomorphic-fetch'
import { getUserToken } from "apis/auth/getUserToken"
import { identifyUserUsingOAuth } from "apis/auth/identifyUserUsingOAuth"
import { refreshUserToken } from "apis/auth/refreshUserToken"
import { forgetUserToken } from "apis/auth/forgetUserToken"
import { validateUserPassword } from "apis/auth/validateUserPassword"
import { resetUserPassword } from "apis/auth/resetUserPassword"
import { serverAuthenticate } from "apis/auth/serverAuthenticate"
import { serverLogout } from "apis/auth/serverLogout"
import { serverRefresh } from "apis/auth/serverRefresh"
import { identifyUserViaServer } from "apis/auth/identifyUserViaServer"
import { serverForget } from "apis/auth/serverForget"
import { serverValidatePassword } from "apis/auth/serverValidatePassword"
import { validateRecaptchaUserToken } from "apis/auth/validateRecaptchaUserToken"
const mockFetchResult = { data: [1, 2, 3] }
jest.mock('utils/fetch', () =>
  jest.fn().mockImplementation(() => {
    const getData = async () => ({ data: [1, 2, 3] })

    return getData()
  })
)

jest.mock('isomorphic-fetch')

jest.mock('config/routes', () => ({
  auth: {
    userToken: '/userToken',
    refreshToken: '/refreshToken',
    identifyUser: '/identifyUser',
    validateUserPassword: '/validateUserPassword',
    resetUserPassword: '/resetUserPassword',
    login: '/login',
    logout: '/logout',
    refresh: '/authRefresh',
    identify: '/authIdentify',
    forget: '/forget',
    validate: '/validate',
  },
  recaptcha: {
    verify: 'https://www.google.com/recaptcha/api/siteverify',
  },
}))

describe('auth api', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  describe('getUserToken', () => {
    test('should fetch the correct url', async () => {
      const email = 'foo@example.com'
      const password = 'blabla'
      const clientId = 'abcdef'
      const clientSecret = '987654'
      const headers = {
        'x-forwarded-for': '192.192.192',
        'user-agent': 'test',
      }

      const expectedReqData = {
        grant_type: 'password',
        username: email,
        password,
        client_id: clientId,
        client_secret: clientSecret
      }

      await getUserToken({ email, password, clientId, clientSecret, headers })
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(null, 'https://production-api.gousto.co.uk/auth/v1.0.0/userToken', expectedReqData, 'POST', 'no-cache', headers)
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await getUserToken(
        {
          email: '',
          password: '',
          clientId: '',
          clientSecret: '',
          headers: {
            'x-forwarded-for': '192.192.192',
            'user-agent': 'test',
          }
        })
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('identifyUser', () => {
    test('should fetch the correct url', async () => {
      await identifyUserUsingOAuth('token')
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', 'https://production-api.gousto.co.uk/auth/v1.0.0/identifyUser', {}, 'GET', 'no-cache')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await identifyUserUsingOAuth('token')
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('refreshUserToken', () => {
    test('should fetch the correct url', async () => {
      const refreshToken = 'refreshToken'
      const clientId = 'clientId'
      const clientSecret = 'clientSecret'

      await refreshUserToken(refreshToken, clientId, clientSecret)

      const expectedReqData = {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret
      }

      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(null, 'https://production-api.gousto.co.uk/auth/v1.0.0/refreshToken', expectedReqData, 'POST', 'no-cache', {}, false)
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await refreshUserToken('refreshToken', 'clientId', 'clientSecret')
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('refreshUserToken', () => {
    test('should fetch the correct url', async () => {
      const refreshToken = 'refreshToken'
      const clientId = 'clientId'
      const clientSecret = 'clientSecret'

      await refreshUserToken(refreshToken, clientId, clientSecret)

      const expectedReqData = {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret
      }

      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(null, 'https://production-api.gousto.co.uk/auth/v1.0.0/refreshToken', expectedReqData, 'POST', 'no-cache', {}, false)
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await refreshUserToken('refreshToken', 'clientId', 'clientSecret')
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('forgetUserToken', () => {
    test('should fetch the correct url', async () => {
      await forgetUserToken('token')
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', 'https://production-api.gousto.co.uk/auth/v1.0.0/userToken', {}, 'DELETE', 'no-cache')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await forgetUserToken('token')
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('validateUserPassword', () => {
    test('should fetch the correct url', async () => {
      const password = 'password'
      await validateUserPassword(password)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(null, 'https://production-api.gousto.co.uk/auth/v1.0.0/validateUserPassword', { password }, 'POST', 'no-cache')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await validateUserPassword('password')
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('resetUserPassword', () => {
    test('should fetch the correct url', async () => {
      const password = 'password'
      const passwordToken = 'passwordToken'
      const version = 2

      await resetUserPassword(password, passwordToken, version)

      const expectedReqData = {
        password,
        password_token: passwordToken,
      }

      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(null, `https://production-api.gousto.co.uk/auth/v${version}/resetUserPassword`, expectedReqData, 'POST', 'no-cache')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await resetUserPassword('password', 'passwordToken')
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('serverAuthenticate', () => {
    test('should fetch the correct url', async () => {
      const email = 'foo@example.com'
      const password = 'password'
      const rememberMe = false

      await serverAuthenticate(email, password, rememberMe)

      const expectedReqData = {
        grant_type: 'password',
        username: email,
        password,
        rememberMe
      }

      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(null, '/login', expectedReqData, 'POST', 'no-cache', {}, null, true)
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await serverAuthenticate('email', 'password', false)
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('serverLogout', () => {
    test('should fetch the correct url', async () => {
      await serverLogout()

      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(null, '/logout', {}, 'POST', 'no-cache', {}, null, true)
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await serverAuthenticate('email', 'password', false)
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('serverRefresh', () => {
    test('should fetch the correct url', async () => {
      const rememberMe = false
      await serverRefresh(rememberMe)

      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(null, '/authRefresh', { rememberMe }, 'POST', 'no-cache', {}, null, true)
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await serverRefresh(false)
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('serverIdentify', () => {
    test('should fetch the correct url', async () => {
      await identifyUserViaServer()

      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(null, '/authIdentify', { }, 'POST', 'no-cache', {}, null, true)
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await identifyUserViaServer()
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('serverForget', () => {
    test('should fetch the correct url', async () => {
      const accessToken = 'token'
      await serverForget(accessToken)

      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(null, '/forget', { accessToken }, 'POST', 'no-cache', {}, null, true)
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await serverForget('token')
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('serverValidatePassword', () => {
    test('should fetch the correct url', async () => {
      const password = 'password'
      await serverValidatePassword(password)

      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(null, '/validate', { password }, 'POST', 'no-cache', {}, null, true)
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await serverValidatePassword('password')
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('validateRecaptchaUserToken', () => {
    describe('when validateRecaptchaUserToken call succeeds', () => {
      let expected

      beforeEach(async () => {
        isomorphicFetch.mockResolvedValue({ json: () => (
          Promise.resolve({ data: [] })
        ) })

        expected = await validateRecaptchaUserToken('test-token', 'test-key')
      })

      test('data is returned', () => {
        expect(expected).toEqual({data: []})
      })
    })

    describe('when validateRecaptchaUserToken call errors', () => {
      let expected

      beforeEach(async () => {
        isomorphicFetch.mockResolvedValue({ json: () => (
          Promise.reject(Error('error'))
        ) })

        try {
          expected = await validateRecaptchaUserToken('test-token', 'test-key')
        } catch (error) {
          expected = error
        }
      })

      test('error is returned', () => {
        expect(expected).toEqual(Error('error'))
      })
    })
  })
})
