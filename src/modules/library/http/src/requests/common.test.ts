import { getAuthToken, AuthToken } from '@library/auth'
import { browserEnvironment } from '@library/environment'

import { auth, setServiceUrl } from './common'
import { RequestConfig } from '../types'
import { httpWarning } from '../logger'

jest.mock('../logger', () => ({
  httpWarning: jest.fn()
}))

jest.mock('@library/auth', () => ({
  getAuthToken: jest.fn()
}))

jest.mock('@library/environment', () => ({
  browserEnvironment: {
    canUseWindow: jest.fn()
  }
}))

describe('Common middleware', () => {
  afterAll(() => {
    jest.clearAllMocks()
  })

  describe('auth middleware', () => {
    const req = {} as RequestConfig

    it('gets authorization headers from @library/auth:getAuthToken', async () => {
      jest.mocked(getAuthToken).mockImplementation(
        () => 'authToken' as AuthToken
      )
      const result = await auth(req)
      expect(result.headers).toStrictEqual({
        Authorization: 'Bearer authToken'
      })
    })

    it('if no auth token, sets header to "Bearer null"', async () => {
      // We don't want to ever get to this stage, but if we do, we want
      // - 401s to occur and therefore be captured by DataDog
      // - easy-to-diagnose HTTP logs
      jest.mocked(getAuthToken).mockImplementation(
        () => null
      )
      const result = await auth(req)
      expect(result.headers).toStrictEqual({
        Authorization: 'Bearer null'
      })
    })
  })

  describe('setServiceUrl middleware', () => {
    let req: RequestConfig
    beforeEach(() => {
      jest.resetAllMocks()
      req = {
        host: '',
        paths: [] as string[]
      } as RequestConfig
    })

    describe('config mutation', () => {
      it('Can set a service URL for the browser', async () => {
        jest.mocked(browserEnvironment.canUseWindow).mockReturnValue(true)
        const userServiceMiddleware = setServiceUrl('user', 1)
        const result = await userServiceMiddleware(req)

        expect(result.host).toBe('https://staging-api.gousto.info')
        expect(result.paths).toEqual(['user'])
      })

      it('Can set a service URL for the server', async () => {
        jest.mocked(browserEnvironment.canUseWindow).mockReturnValue(false)
        const userServiceMiddleware = setServiceUrl('user', 1)
        const result = await userServiceMiddleware(req)

        expect(result.host).toBe('http://staging-user.gousto.info')
        expect(result.paths).toEqual([])
      })
    })

    describe('config conflict', () => {
      /**
       * This middleware is only intended to be called once per composeFetch, as it
       * overwrites host and path properties. A conflict should dispatch a warning log
       */
      const testCases = [
        { host: '', paths: [], shouldLog: false },
        { host: 'foo', paths: [], shouldLog: true },
        { host: '', paths: ['foo'], shouldLog: true },
        { host: 'foo', paths: ['foo'], shouldLog: true }
      ]

      it.each(testCases)('when request host=$host and paths=$paths then logging = $shouldLog', async (testCase) => {
        req.host = testCase.host
        req.paths = testCase.paths
        const userServiceMiddleware = setServiceUrl('user', 1)
        await userServiceMiddleware(req)

        if (testCase.shouldLog) {
          expect(httpWarning).toHaveBeenCalled()
        } else {
          expect(httpWarning).not.toHaveBeenCalled()
        }
      })
    })
  })
})
