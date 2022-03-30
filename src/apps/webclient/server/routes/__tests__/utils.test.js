import { get, set } from 'utils/cookieHelper2'

import { routeMatches, addSessionCookies, removeSessionCookies, getCookieValue } from '../utils'
import { withMockEnvironmentAndDomain } from '../../../src/_testing/isomorphic-environment-test-utils'

jest.mock('utils/cookieHelper2', () => ({
  set: jest.fn(),
  get: jest.fn(),
}))

jest.mock('moment', () => {
  const momentMethods = {
    add: jest.fn(() => ({
      toISOString: jest.fn().mockReturnValue('mock-expires-response')
    })),
  }

  return jest.fn(() => momentMethods)
})

const getRoutingCtx = ({ path, method }) => ({
  path,
  method,
})

describe('utils', () => {
  // mock the environment and domain config used by these tests to generate endpoints
  withMockEnvironmentAndDomain('local', 'gousto.local')

  let ctx

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('addSessionCookies', () => {
    describe('given an authenticated session request', () => {
      const response = {
        data: {
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
          expiresAt: '123456789',
        }
      }

      beforeEach(() => {
        ctx = { cookies: {} }
      })

      describe('when addSessionCookies is called and rememberMe is true', () => {
        beforeEach(() => {
          addSessionCookies(ctx, response, true)
        })

        test('then set should be called with the correct params', () => {
          expect(set.mock.calls).toEqual([
            [{}, 'oauth_token', { access_token: 'mock-access-token' }, 0.4166666666666667, true, true, true, undefined, undefined, '.gousto.local'],
            [{}, 'oauth_help_centre_token', { access_token: 'mock-access-token' }, 0.4166666666666667, true, false, true, '/help-centre'],
            [{}, 'oauth_expiry', { expires_at: 'mock-expires-response' }, 0.4166666666666667],
            [{}, 'oauth_refresh', { refresh_token: 'mock-refresh-token' }, 90, true, true, true],
            [{}, 'oauth_remember', { remember_me: true }, 90],
          ])
        })
      })

      describe('when addSessionCookies is called and rememberMe is false', () => {
        beforeEach(() => {
          addSessionCookies(ctx, response, false)
        })

        test('then set should be called with the correct params', () => {
          expect(set.mock.calls).toEqual([
            [{}, 'oauth_token', { access_token: 'mock-access-token' }, null, true, true, true, undefined, undefined, '.gousto.local'],
            [{}, 'oauth_help_centre_token', { access_token: 'mock-access-token' }, null, true, false, true, '/help-centre'],
            [{}, 'oauth_expiry', { expires_at: 'mock-expires-response' }, null],
            [{}, 'oauth_refresh', { refresh_token: 'mock-refresh-token' }, null, true, true, true],
            [{}, 'oauth_remember', { remember_me: false }, null],
          ])
        })
      })
    })
  })

  describe('removeSessionCookies', () => {
    beforeEach(() => {
      ctx = { cookies: {} }
    })

    test('should reset session cookies', () => {
      removeSessionCookies(ctx)

      expect(set.mock.calls).toEqual([
        [{}, 'oauth_token', { access_token: '' }, null, true, true, true, undefined, undefined, '.gousto.local'],
        [{}, 'oauth_help_centre_token', { access_token: '' }, null, true, true, true, '/help-centre'],
        [{}, 'oauth_expiry', { expires_at: '' }],
        [{}, 'oauth_refresh', { refresh_token: '' }, null, true, true, true],
        [{}, 'oauth_remember', { remember_me: false }],
      ])
    })
  })

  describe('routeMatches', () => {
    test('should return false if ctx does not match given method and path', () => {
      ctx = getRoutingCtx({ path: '/refresh', method: 'GET' })

      expect(routeMatches(ctx, '/login', 'POST')).toBeFalsy()
    })

    test('should return false if ctx matches given path, not method', () => {
      ctx = getRoutingCtx({ path: '/login', method: 'GET' })

      expect(routeMatches(ctx, '/login', 'POST')).toBeFalsy()
    })

    test('should return false if ctx matches given method, not path', () => {
      ctx = getRoutingCtx({ path: '/refresh', method: 'POST' })

      expect(routeMatches(ctx, '/login', 'POST')).toBeFalsy()
    })

    test('should return true if ctx matches given path and method', () => {
      ctx = getRoutingCtx({ path: '/login', method: 'POST' })

      expect(routeMatches(ctx, '/login', 'POST')).toBeTruthy()
    })
  })

  describe('getCookieValue', () => {
    const testValue = 'test_value'

    beforeEach(() => {
      ctx = {
        cookies: {
          valid_cookie: { valid_property: testValue }
        }
      }

      get.mockImplementation((cookies, key) => cookies[key])
    })

    test('should return undefined for a non-existent cookie', () => {
      expect(getCookieValue(ctx, 'invalid_cookie', 'invalid_property')).toBeUndefined()
    })

    test('should return undefined for an existing cookie with wrong property', () => {
      expect(getCookieValue(ctx, 'valid_cookie', 'invalid_property')).toBeUndefined()
    })

    test('should return the value for an existing cookie with property', () => {
      expect(getCookieValue(ctx, 'valid_cookie', 'valid_property')).toEqual(testValue)
    })
  })
})
