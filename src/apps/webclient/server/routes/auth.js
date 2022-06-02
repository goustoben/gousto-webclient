import { fetchFeatures } from 'apis/fetchS3'
import {
  getUserToken,
  identifyUserUsingOAuth,
  refreshUserToken,
  forgetUserToken,
  validateRecaptchaUserToken,
  validateUserPassword,
} from 'apis/auth'
import { getEnvConfig } from 'utils/processEnv'
import routes from 'config/routes'
import logger from '../utils/logger'
import {
  routeMatches,
  addSessionCookies,
  removeSessionCookies,
  getCookieValue,
} from './utils'

const PINGDOM_USER = 'shaun.pearce+codetest@gmail.com'

/**
* Login Route
* @param {*} ctx
*/
export async function login(ctx) { /* eslint-disable no-param-reassign */
  try {
    const { username, password, rememberMe, recaptchaToken } = ctx.request.body
    const { data } = await fetchFeatures()
    const { isRecaptchaEnabled } = data

    const { AUTH_CLIENT_ID, AUTH_CLIENT_SECRET, RECAPTCHA_PVTK } = getEnvConfig()

    if (isRecaptchaEnabled && username !== PINGDOM_USER) {
      const validateRecaptchaResponse = await validateRecaptchaUserToken(
        recaptchaToken,
        RECAPTCHA_PVTK
      )

      if (!validateRecaptchaResponse.success) {
        throw validateRecaptchaResponse
      }
    }

    const authResponse = await getUserToken({
      email: username,
      password,
      clientId: AUTH_CLIENT_ID,
      clientSecret: AUTH_CLIENT_SECRET,
      headers: ctx.request.headers,
    })

    addSessionCookies(ctx, authResponse, rememberMe)
    ctx.response.body = authResponse
  } catch (error) {
    logger.error({ message: `auth/login catch ${JSON.stringify(error)}` })

    ctx.response.status = 401
    ctx.response.body = {
      error: 'invalid_credentials',
    }

    // investigate issues with recaptcha TG-6550
    if ('error-codes' in error && error['error-codes'] === ['invalid-input-response']) {
      const { recaptchaToken } = ctx.request.body
      const { RECAPTCHA_PVTK } = getEnvConfig()
      logger.error({
        message: 'login captcha invalid input response',
        recaptchaToken,
        isPrivateTokenEmpty: !RECAPTCHA_PVTK
      })
    }
  }
}

/**
* Logout Route
* @param {*} ctx
*/
export function logout(ctx) {
  removeSessionCookies(ctx)
  ctx.response.status = 200
  ctx.response.body = { status: 'ok' }
}

/**
* Refresh Route
* @param {*} ctx
*/
export async function refresh(ctx) {
  try {
    const { rememberMe } = ctx.request.body
    const { AUTH_CLIENT_ID, AUTH_CLIENT_SECRET } = getEnvConfig()

    const refreshToken = getCookieValue(ctx, 'oauth_refresh', 'refresh_token')

    if (refreshToken) {
      const refreshReponse = await refreshUserToken(refreshToken, AUTH_CLIENT_ID, AUTH_CLIENT_SECRET)
      addSessionCookies(ctx, refreshReponse, rememberMe)
      ctx.response.body = refreshReponse
    } else {
      throw new Error('Refresh token not present')
    }
  } catch (error) {
    logger.warning({
      message: 'server/routes/auth.js:refresh could not refresh oauth token',
      extra: {
        error: {
          message: (error || {}).message,
          status: (error || {}).status
        }
      }
    })
    ctx.response.status = 401
    ctx.response.body = {
      error,
    }
  }
}

/**
* Identify Route
* @param {*} ctx
*/
export async function identify(ctx) {
  let accessToken
  try {
    accessToken = getCookieValue(ctx, 'oauth_token', 'access_token')

    if (accessToken) {
      const identifyResponse = await identifyUserUsingOAuth(accessToken)
      ctx.response.body = identifyResponse.data
    } else {
      throw new Error('Access token not present')
    }
  } catch (error) {
    ctx.response.status = 401
    ctx.response.body = {
      error,
    }
  }
}

/**
* Forget Route
* @param {*} ctx
*/
export async function forget(ctx) {
  const { accessToken } = ctx.request.body
  try {
    if (accessToken) {
      const forgetResponse = await forgetUserToken(accessToken)
      ctx.response.body = forgetResponse
    } else {
      throw new Error('Access token not present')
    }
  } catch (error) {
    ctx.response.status = 401
    ctx.response.body = {
      error,
    }
  }
}

/**
* Validate User Password Route
* @param {*} ctx
*/
export async function validate(ctx) {
  const { password } = ctx.request.body
  try {
    if (password) {
      const passwordResponse = await validateUserPassword(password)
      ctx.response.body = passwordResponse
    } else {
      throw new Error('Password not present')
    }
  } catch (error) {
    ctx.response.status = 406
    ctx.response.body = {
      error,
    }
  }
}

/* eslint-disable consistent-return */
const auth = (app) => {
  app.use(async (ctx, next) => {
    if (routeMatches(ctx, routes.auth.login, 'POST')) {
      await login(ctx)
    } else if (routeMatches(ctx, routes.auth.logout, 'POST')) {
      logout(ctx)
    } else if (routeMatches(ctx, routes.auth.refresh, 'POST')) {
      await refresh(ctx)
    } else if (routeMatches(ctx, routes.auth.identify, 'POST')) {
      await identify(ctx)
    } else if (routeMatches(ctx, routes.auth.forget, 'POST')) {
      await forget(ctx)
    } else if (routeMatches(ctx, routes.auth.validate, 'POST')) {
      await validate(ctx)
    } else {
      return next()
    }
  })
}

export {
  auth,
}
