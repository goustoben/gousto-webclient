import fetch from 'utils/fetch'
import isomorphicFetch from 'isomorphic-fetch'
import {
  getUserToken,
  identifyUser,
  refreshUserToken,
  forgetUserToken,
  validateUserPassword,
  resetUserPassword,
  serverAuthenticate,
  serverLogout,
  serverRefresh,
  serverIdentify,
  serverForget,
  serverValidatePassword,
  getClientToken,
  validateRecaptchaUserToken,
} from '../auth'
const mockFetchResult = { data: [1, 2, 3] }
jest.mock('utils/fetch', () =>
  jest.fn().mockImplementation(() => {
    const getData = async () => ({ data: [1, 2, 3] })

    return getData()
  })
)

jest.mock('config/endpoint', () =>
  jest.fn().mockImplementation((service, version = '') => `endpoint-${service}${version}`)
)

jest.mock('isomorphic-fetch')

jest.mock('config/routes', () => ({
  version: {
    auth: 'v2',
  },
  auth: {
    userToken: '/userToken',
    refreshToken: '/refreshToken',
    identifyUser: '/identifyUser',
    validateUserPassword: '/validateUserPassword',
    resetUserPassword: '/resetUserPassword',
    login: '/login',
    logout: '/logout',
    refresh: '/refresh',
    identify: '/identify',
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
      expect(fetch).toHaveBeenCalledWith(null, 'endpoint-authv2/userToken', expectedReqData, 'POST', 'no-cache', headers)
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
      await identifyUser('token')
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', 'endpoint-authv2/identifyUser', {}, 'GET', 'no-cache')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await identifyUser('token')
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
      expect(fetch).toHaveBeenCalledWith(null, 'endpoint-authv2/refreshToken', expectedReqData, 'POST', 'no-cache', {}, false)
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
      expect(fetch).toHaveBeenCalledWith(null, 'endpoint-authv2/refreshToken', expectedReqData, 'POST', 'no-cache', {}, false)
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
      expect(fetch).toHaveBeenCalledWith('token', 'endpoint-authv2/userToken', {}, 'DELETE', 'no-cache')
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
      expect(fetch).toHaveBeenCalledWith(null, 'endpoint-authv2/validateUserPassword', { password }, 'POST', 'no-cache')
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

      await resetUserPassword(password, passwordToken)

      const expectedReqData = {
        password,
        password_token: passwordToken
      }

      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(null, 'endpoint-authv2/resetUserPassword', expectedReqData, 'POST', 'no-cache')
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
      expect(fetch).toHaveBeenCalledWith(null, '/refresh', { rememberMe }, 'POST', 'no-cache', {}, null, true)
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await serverRefresh(false)
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('serverIdentify', () => {
    test('should fetch the correct url', async () => {
      await serverIdentify()

      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(null, '/identify', { }, 'POST', 'no-cache', {}, null, true)
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await serverIdentify()
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

  describe('getClientToken', () => {
    describe('when the client token is requested', () => {
      const authClientId = 1
      const authClientSecret = '12345'
      let result

      beforeEach(async () => {
        result = await getClientToken({ authClientId, authClientSecret })
      })

      test('then the correct url should be fetched', async () => {
        const expectedReqData = {
          grant_type: 'client_credentials',
          client_id: authClientId,
          client_secret: authClientSecret
        }

        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(null, 'endpoint-authv2/userToken', expectedReqData, 'POST', 'no-cache')
      })

      test('then it should return the results of the fetch unchanged', async () => {
        expect(result).toEqual(mockFetchResult)
      })
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
