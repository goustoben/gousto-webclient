import { fetchFeatures } from 'apis/fetchS3'
import {
  getUserToken,
  identifyUserUsingOAuth,
  refreshUserToken,
  forgetUserToken,
  validateRecaptchaUserToken,
  validateUserPassword,
} from 'apis/auth'
import env from 'utils/env'
import routes from 'config/routes'
import logger from '../utils/logger'
import {
  routeMatches,
  addSessionCookies,
  removeSessionCookies,
  getCookieValue,
} from './utils'
import { RECAPTCHA_PRIVATE_KEY } from '../config/recaptcha'

const PINGDOM_USER = 'shaun.pearce+codetest@gmail.com'

/**
* Login Route
* @param {*} ctx
*/
export async function login(ctx) { /* eslint-disable no-param-reassign */
  try {
    const { username, password, rememberMe, recaptchaToken } = ctx.request.body
    const { authClientId, authClientSecret } = env
    const { data } = await fetchFeatures()
    const { isRecaptchaEnabled } = data

    if (isRecaptchaEnabled && username !== PINGDOM_USER) {
      const validateRecaptchaResponse = await validateRecaptchaUserToken(
        recaptchaToken,
        RECAPTCHA_PRIVATE_KEY
      )

      if (!validateRecaptchaResponse.success) {
        throw validateRecaptchaResponse
      }
    }
    const authResponse = await getUserToken({ email: username, password, clientId: authClientId, clientSecret: authClientSecret, headers: ctx.request.headers })

    addSessionCookies(ctx, authResponse, rememberMe)
    ctx.response.body = authResponse
  } catch (error) {
    logger.error({ message: `auth/login catch ${JSON.stringify(error)}` })

    ctx.response.status = 401
    ctx.response.body = {
      error: 'invalid_credentials',
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
  let refreshToken
  try {
    const { rememberMe } = ctx.request.body
    const { authClientId, authClientSecret } = env
    refreshToken = getCookieValue(ctx, 'oauth_refresh', 'refresh_token')

    if (refreshToken) {
      const refreshReponse = await refreshUserToken(refreshToken, authClientId, authClientSecret)
      addSessionCookies(ctx, refreshReponse, rememberMe)
      ctx.response.body = refreshReponse
    } else {
      throw new Error('Refresh token not present')
    }
  } catch (error) {
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
