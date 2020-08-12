import * as apis from 'apis/auth'
import { triggerLoggingManagerEvent } from 'apis/loggingManager'
import { v4 as uuidV4 } from 'uuid'
import { logEventWithClientAuth } from '../auth'
import { addClientSessionCookies, getCookieValue } from '../utils'

apis.getClientToken = jest.fn()

jest.mock('utils/env', () => ({
  authClientId: 'mock-webclient-id',
  authClientSecret: 'mock-webclient-secret',
}))

jest.mock('apis/loggingManager', () => ({
  triggerLoggingManagerEvent: jest.fn(),
}))

jest.mock('../utils', () => ({
  addClientSessionCookies: jest.fn(),
  getCookieValue: jest.fn().mockImplementation(() => undefined),
}))

jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('mock-uuid'),
}))

jest
  .spyOn(global, 'Date')
  .mockImplementation(() => ({
    toISOString: () => '2020-08-06T11:00:00.000Z'
  }))

describe('auth', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('logEventWithClientAuth', () => {
    describe('when logEventWithClientAuth is called with a non-existant cookie', () => {
      const ctx = { response: {}, request: { body: {} }, cookies: {} }

      beforeEach(async () => {
        apis.getClientToken.mockImplementation(() => ({
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
          expiresIn: '123456789',
        }))

        await logEventWithClientAuth(ctx)
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
            cookies: {},
            request: {
              body: {},
            },
            response: {
              body: 'Event logged successfully',
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

    describe('when logEventWithClientAuth is called with a valid cookie', () => {
      const datePlusOneHour = new Date('2020-08-06T12:00:00.000Z')

      const ctx = {
        response: {},
        request: {
          body: {
            eventName: 'mock-event-name',
            authUserId: '12345',
            data: {},
          },
        },
      }

      beforeEach(async () => {
        getCookieValue
          .mockReturnValueOnce(datePlusOneHour.toISOString())
          .mockReturnValueOnce('mock-access-token')

        await logEventWithClientAuth(ctx)
      })

      test('then getClientToken should NOT have been called', () => {
        expect(apis.getClientToken).not.toHaveBeenCalled()
      })

      test('then triggerLoggingManagerEvent should be called with the correct params', () => {
        expect(triggerLoggingManagerEvent).toHaveBeenCalledWith(
          {
            accessToken: 'mock-access-token',
            body: {
              name: 'mock-event-name',
              authUserId: '12345',
              occurredAt: '2020-08-06T11:00:00.000Z',
              id: uuidV4(),
              data: {},
            },
          },
        )
      })
    })

    describe('when logEventWithClientAuth is called and getClientToken fails', () => {
      const ctx = { response: {}, request: { body: {} }, cookies: {} }

      beforeEach(async () => {
        apis.getClientToken.mockImplementation(() => {
          throw new Error()
        })

        await logEventWithClientAuth(ctx)
      })

      test('then the ctx status should be set to 401', () => {
        expect(ctx).toEqual({
          cookies: {},
          request: {
            body: {},
          },
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
