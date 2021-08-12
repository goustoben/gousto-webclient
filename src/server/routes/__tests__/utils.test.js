import { set } from 'utils/cookieHelper2'

import { addSessionCookies } from '../utils'

jest.mock('utils/cookieHelper2', () => ({
  set: jest.fn(),
}))

jest.mock('moment', () => {
  const momentMethods = {
    add: jest.fn(() => ({
      toISOString: jest.fn().mockReturnValue('mock-expires-response')
    })),
  }

  return jest.fn(() => momentMethods)
})

describe('utils', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('addSessionCookies', () => {
    describe('given an authenticated session request', () => {
      const ctx = { cookies: {} }
      const response = {
        data: {
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
          expiresAt: '123456789',
        }
      }

      describe('when addSessionCookies is called and rememberMe is true', () => {
        beforeEach(() => {
          addSessionCookies(ctx, response, true)
        })

        test('then set should be called with the correct params', () => {
          expect(set.mock.calls).toEqual([
            [{}, 'oauth_token', { access_token: 'mock-access-token' }, 0.4166666666666667, true, true, true],
            [{}, 'oauth_recipe_feedback_token', { access_token: 'mock-access-token' }, 0.4166666666666667, true, false, true, '/rate-my-recipes'],
            [{}, 'oauth_help_centre_token', { access_token: 'mock-access-token' }, 0.4166666666666667, true, false, true, '/help-centre'],
            [{}, 'oauth_taste_profile_token', { access_token: 'mock-access-token' }, 0.4166666666666667, true, false, true, '/taste-profile'],
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
            [{}, 'oauth_token', { access_token: 'mock-access-token' }, null, true, true, true],
            [{}, 'oauth_recipe_feedback_token', { access_token: 'mock-access-token' }, null, true, false, true, '/rate-my-recipes'],
            [{}, 'oauth_help_centre_token', { access_token: 'mock-access-token' }, null, true, false, true, '/help-centre'],
            [{}, 'oauth_taste_profile_token', { access_token: 'mock-access-token' }, null, true, false, true, '/taste-profile'],
            [{}, 'oauth_expiry', { expires_at: 'mock-expires-response' }, null],
            [{}, 'oauth_refresh', { refresh_token: 'mock-refresh-token' }, null, true, true, true],
            [{}, 'oauth_remember', { remember_me: false }, null],
          ])
        })
      })
    })
  })
})
