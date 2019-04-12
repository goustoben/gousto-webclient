import Cookies from 'cookies-js'
import { login, logout, refresh, identify, forget, validate } from 'server/routes/auth'
import { getUserToken, refreshUserToken, validateUserPassword, identifyUser, forgetUserToken } from 'apis/auth'
import { addSessionCookies, removeSessionCookies, getCookieValue } from 'server/routes/utils'

jest.mock('apis/auth', () => ({
  getUserToken: jest.fn(),
  refreshUserToken: jest.fn(),
  validateUserPassword: jest.fn(),
  forgetUserToken: jest.fn(),
  identifyUser: jest.fn(),
}))

jest.mock('server/routes/utils', () => ({
  addSessionCookies: jest.fn(),
  removeSessionCookies: jest.fn(),
  getCookieValue: jest.fn(),
}))

jest.mock('utils/env', () => ({
  authClientId: 'authClientId',
  authClientSecret: 'authClientSecret',
}))

const getCtx = () => ({
  request: {},
  response: {},
})

describe('auth', () => {
  let ctx
  let username
  let password
  let rememberMe

  afterEach(() => {
    addSessionCookies.mockReset()
    removeSessionCookies.mockReset()
  })

  describe('login', () => {
    const getLoginCtx = ({ username, password, rememberMe }) => (
      Object.assign(getCtx(), {
        request: {
          body: {
            username,
            password,
            rememberMe,
          },
        },
      },
      ))

    describe('when given an invalid request context', () => {
      test('should return a 401', async () => {
        ctx = getCtx()
        await login(ctx)
        expect(ctx.response).toEqual({
          status: 401,
          body: {
            error: 'invalid_credentials',
          },
        })
      })
    })

    describe('when given a valid request context', () => {
      beforeEach(() => {
        [username, password, rememberMe] = ['test@test.com', 'pass1234', true]
        ctx = getLoginCtx({ username, password, rememberMe })
      })

      test('should request a user token using the request body variables', async () => {
        await login(ctx)

        expect(getUserToken).toHaveBeenCalledWith({
          email: username,
          password,
          clientId: 'authClientId',
          clientSecret: 'authClientSecret',
        })
      })

      describe('and a successful getUserToken response', () => {
        test('should add the session cookies from the getUserToken response', async () => {
          const getUserTokenResult = {
            auth_token: 'b6dfe98fea05e43e211895e17dd1b1b804acda0a',
          }
          getUserToken.mockReturnValueOnce(getUserTokenResult)
          await login(ctx)

          expect(addSessionCookies).toHaveBeenCalledWith(ctx, getUserTokenResult, rememberMe)
          expect(ctx.response.body).toBe(getUserTokenResult)
        })
      })

      describe('and an unsuccessful getUserToken response', () => {
        test('should return a 401', async () => {
          getUserToken.mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error()))
          )
          await login(ctx)
          expect(ctx.response).toEqual({
            status: 401,
            body: {
              error: 'invalid_credentials',
            },
          })
        })
      })
    })
  })

  describe('logout', () => {
    test('should call removeSessionCookies and return ok response', () => {
      ctx = getCtx()
      logout(ctx)

      expect(removeSessionCookies).toHaveBeenCalledWith(ctx)
      expect(ctx.response).toEqual({
        status: 200,
        body: {
          status: 'ok',
        },
      })
    })
  })

  describe('refresh', () => {
    const getRefreshCtx = ({ username, password, rememberMe }) => (
      Object.assign(getCtx(), {
        request: {
          body: {
            username,
            password,
            rememberMe,
          },
        },
      },
      ))

    describe('when given an invalid request context', () => {
      test('should return a 401', async () => {
        ctx = getCtx()
        await refresh(ctx)

        expect(ctx.response).toEqual(expect.objectContaining({
          status: 401,
        }))
      })
    })

    describe('when given a valid request context', () => {
      let refreshToken

      beforeEach(() => {
        ctx = getRefreshCtx({ rememberMe })
        refreshToken = 'cd589f49672eb5846fdc0ea01814c1ff28ad4660'
        getCookieValue.mockReturnValueOnce(refreshToken)
      })

      test('should get the request\'s refresh token cookie value and fire a refreshUserToken call', async () => {
        await refresh(ctx)

        expect(getCookieValue).toHaveBeenCalled()
        expect(refreshUserToken).toHaveBeenCalledWith(
          refreshToken,
          'authClientId',
          'authClientSecret',
        )
      })

      describe('and a successful refreshUserToken response', () => {
        test('should add the session cookies from the refresheUserToken response', async () => {
          const refreshUserTokenResult = {
            auth_token: 'df53a07160706483b6f0622f6b210a64935e4c75',
          }
          refreshUserToken.mockReturnValueOnce(refreshUserTokenResult)
          await refresh(ctx)

          expect(addSessionCookies).toHaveBeenCalledWith(ctx, refreshUserTokenResult, rememberMe)
          expect(ctx.response.body).toBe(refreshUserTokenResult)
        })
      })

      describe('and an unsuccessful refreshUserToken response', () => {
        test('should return a 401', async () => {
          refreshUserToken.mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error()))
          )
          await refresh(ctx)
          expect(ctx.response).toEqual(expect.objectContaining({
            status: 401,
          }))
        })
      })
    })
  })

  describe('identify', () => {
    afterEach(() => {
      identifyUser.mockReset()
    })

    test('should identify the user based on the token', async () => {
      ctx = getCtx()
      const accessToken = 'eed4b4f4a3ed0091cb4b7af9c581350bdf9ea806'
      identifyUser.mockReturnValueOnce({ data: 'test' })
      getCookieValue.mockReturnValueOnce(accessToken)
      await identify(ctx)
      expect(ctx.response.body).toEqual('test')
    })

    test('should return error message if access_token not present', async () => {
      ctx = getCtx()
      const accessToken = ''
      identifyUser.mockReturnValueOnce({ data: 'test' })
      getCookieValue.mockReturnValueOnce(accessToken)
      await identify(ctx)
      expect(ctx.response.body.error).toEqual(Error('Access token not present'))
    })

    test('should return 401 if not autorize', async () => {
      identifyUser.mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error('error message!')))
      )
      ctx = getCtx()
      getCookieValue.mockReturnValueOnce('access')
      await identify(ctx)
      expect(ctx.response.status).toEqual(401)
      expect(ctx.response.body.error).toEqual(Error('error message!'))
    })
  })
  describe('forget', () => {
    const getForgetCtx = (accessToken) => (
      Object.assign(getCtx(), {
        request: {
          body: {
            accessToken,
          },
        },
      },
      ))
    // afterEach(() => {
    //   forgetUserToken.mockReset()
    // })
    describe('when given an invalid request context', () => {
      test('should return a 401 and a access token not present error', async () => {
        ctx = getForgetCtx('')
        await forget(ctx)
        expect(ctx.response.status).toEqual(401)
        expect(ctx.response.body.error).toEqual(Error('Access token not present'))
      })
    })

    describe('when given a valid request context', () => {
      test('should request a forgetUserToken request with request body variables', async () => {
        ctx = getForgetCtx('test')
        await forget(ctx)
        expect(forgetUserToken).toHaveBeenCalledWith('test')
      })

      test('should respond with a body containing the forget response', async () => {
        ctx = getForgetCtx('test')
        forgetUserToken.mockReturnValueOnce('successful forget response!')
        await forget(ctx)
        expect(ctx.response.body).toEqual('successful forget response!')
      })

      describe('and an unsuccessful forgetUserToken response', () => {
        test('should return a 401 and the error message', async () => {
          ctx = getForgetCtx('test')
          forgetUserToken.mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error('error message!')))
          )
          await forget(ctx)
          expect(ctx.response.status).toEqual(401)
          expect(ctx.response.body.error).toEqual(Error('error message!'))
        })
      })
    })
  })

  describe('validate', () => {
    const getValidateCtx = ({ password }) => (
      Object.assign(getCtx(), {
        request: {
          body: {
            password,
          },
        },
      })
    )

    describe('when given an invalid request context', () => {
      test('should return a 406 and a password not present error', async () => {
        ctx = getValidateCtx({ password: '' })
        await validate(ctx)

        expect(ctx.response).toEqual(expect.objectContaining({
          status: 406,
          body: {
            error: Error('Password not present'),
          },
        }))
      })
    })

    describe('when given a valid request context', () => {
      test('should request a validateUserPassword request with request body variables', async () => {
        ctx = getValidateCtx({ password: 'test' })
        await validate(ctx)
        expect(validateUserPassword).toHaveBeenCalledWith('test')
      })

      test('should respond with a body containing the password response', async () => {
        validateUserPassword.mockReturnValueOnce('successful response!')
        ctx = getValidateCtx({ password: 'test' })
        await validate(ctx)

        expect(ctx.response.body).toEqual('successful response!')
      })

      describe('and an unsuccessful validateUserPassword response', () => {
        test('should return a 406 and the error message', async () => {
          validateUserPassword.mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error('error message!')))
          )
          ctx = getValidateCtx({ password: 'test' })
          await validate(ctx)

          expect(ctx.response).toEqual(expect.objectContaining({
            status: 406,
            body: {
              error: Error('error message!'),
            },
          }))
        })
      })
    })
  })
})
