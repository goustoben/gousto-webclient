import { fetchFeatures } from 'apis/fetchS3'
import { referAFriend as handleReferalRequest, user, userController } from 'server/routes/user'
import { referAFriend as sendReferalToCore } from 'apis/user'
import { validateRecaptchaUserToken } from 'apis/auth'
import { getCookieValue, routeMatches } from 'server/routes/utils'

jest.mock('utils/logger', () => ({
  logger: {
    error: jest.fn(),
    notice: jest.fn(),
  }
}))

jest.mock('apis/user', () => ({
  referAFriend: jest.fn(() => ({ status: 'ok' })),
}))

jest.mock('apis/auth', () => ({
  validateRecaptchaUserToken: jest.fn(() => ({ success: false })),
}))

jest.mock('server/routes/utils', () => ({
  getCookieValue: jest.fn().mockName('getCookieValue'),
  routeMatches: jest.fn(),
}))

jest.mock('apis/fetchS3', () => ({
  fetchFeatures: jest
    .fn()
    .mockReturnValue(new Promise((resolve) => resolve({ data: { isRecaptchaEnabled: false } }))),
}))

jest.mock('utils/env', () => ({
  recaptchaReferralPrivateKey: '',
}))

const app = {
  use: jest.fn(),
}

const getCtx = () => ({
  request: {},
  response: {},
})

describe('user', () => {
  let ctx
  let accessToken

  describe('user controller', () => {
    const getMiddlewareCtx = (path) =>
      Object.assign(getCtx(), {
        path,
      })
    const next = jest.fn()

    test('should apply middleware to app corretly', async () => {
      user(app)
      expect(app.use).toBeCalled()
    })

    test('should call referAFriend if path matches', async () => {
      routeMatches.mockImplementationOnce((routerCtx) => {
        if (routerCtx.path === '/test-refer-a-friend') {
          return true
        }

        return false
      })
      await userController(getMiddlewareCtx('/test-refer-a-friend'), next)
      expect(routeMatches).toHaveBeenCalled()
      expect(routeMatches.mock.results[0].value).toBe(true)
    })

    test('should call next if no path matches', async () => {
      routeMatches.mockImplementationOnce((routerCtx) => {
        if (routerCtx.path === '/no-matches') {
          return true
        }

        return false
      })
      await userController(getMiddlewareCtx('/test-refer-a-friend'), next)
      expect(next).toHaveBeenCalled()
    })
  })

  describe('referAFriend', () => {
    afterEach(() => {
      getCookieValue.mockReset()
      sendReferalToCore.mockReset()
    })

    const getReferalCtx = () =>
      Object.assign(getCtx(), {
        request: {
          body: {
            email: 'test@mail.net',
          },
        },
      })

    test('should call removeSessionCookies and return ok response', async () => {
      accessToken = 'eed4b4f4a3ed0091cb4b7af9c581350bdf9ea806'
      getCookieValue.mockReturnValueOnce(accessToken)

      ctx = getReferalCtx()
      await handleReferalRequest(ctx)

      expect(fetchFeatures).toHaveBeenCalled()
      expect(getCookieValue).toHaveBeenCalledWith(ctx, 'oauth_token', 'access_token')
      expect(sendReferalToCore).toHaveBeenCalledWith(accessToken, 'test@mail.net')
      expect(ctx.response).toEqual({
        status: 200,
        body: {
          status: 'ok',
        },
      })
    })

    test('should throw error if no auth token present', async () => {
      ctx = getReferalCtx()
      await handleReferalRequest(ctx)

      expect(fetchFeatures).toHaveBeenCalled()
      expect(sendReferalToCore).not.toBeCalled()
      expect(ctx.response).toEqual({
        status: 500,
        body: {
          error: 'Access token not present',
        },
      })
    })

    test('should throw error if no recaptcha token is not valid', async () => {
      accessToken = 'eed4b4f4a3ed0091cb4b7af9c581350bdf9ea806'
      getCookieValue.mockReturnValueOnce(accessToken)

      fetchFeatures.mockResolvedValue({ data: { isRecaptchaEnabled: true } })
      validateRecaptchaUserToken.mockImplementationOnce(() => ({
        success: false,
      }))

      ctx = getReferalCtx()
      await handleReferalRequest(ctx)

      expect(fetchFeatures).toHaveBeenCalled()
      expect(getCookieValue).toHaveBeenCalledWith(ctx, 'oauth_token', 'access_token')
      expect(ctx.response).toMatchObject({
        status: 500,
      })
    })
  })
})
