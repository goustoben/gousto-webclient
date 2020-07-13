import * as apis from 'apis/auth'
import { authenticateClient } from '../auth'
import { addClientSessionCookies } from '../utils'

apis.getClientToken = jest.fn()

jest.mock('utils/env', () => ({
  authClientId: 'mock-webclient-id',
  authClientSecret: 'mock-webclient-secret',
}))

jest.mock('../utils', () => ({
  addClientSessionCookies: jest.fn()
}))

describe('auth', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('authenticateClient', () => {
    describe('when authenticateClient is called', () => {
      const ctx = { response: {} }

      beforeEach(async () => {
        apis.getClientToken.mockImplementation(() => ({
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
          expiresIn: '123456789',
        }))

        await authenticateClient(ctx)
      })

      test('then getClientToken should be called with the correct params', () => {
        expect(apis.getClientToken).toHaveBeenCalledWith({
          authClientId: 'mock-webclient-id',
          authClientSecret: 'mock-webclient-secret',
        })
      })

      test('then addClientSessionCookies should be called with the correct params', () => {
        expect(addClientSessionCookies).toHaveBeenCalledWith(
          {
            response: {
              body: {
                accessToken: 'mock-access-token',
                refreshToken: 'mock-refresh-token',
                expiresIn: '123456789',
              }
            }
          },
          {
            accessToken: 'mock-access-token',
            refreshToken: 'mock-refresh-token',
            expiresIn: '123456789',
          },
        )
      })
    })

    describe('when authenticateClient is called and getClientToken fails', () => {
      const ctx = { response: {} }

      beforeEach(async () => {
        apis.getClientToken.mockImplementation(() => {
          throw new Error()
        })

        await authenticateClient(ctx)
      })

      test('then the ctx status should be set to 401', () => {
        expect(ctx).toEqual({
          response: {
            body: {
              error: 'client_authentication_failed',
            },
            status: 401,
          },
        })
      })
    })
  })
})
