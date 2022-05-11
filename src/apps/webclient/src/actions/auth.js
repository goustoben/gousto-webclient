import { datadogLogs } from '@datadog/browser-logs'

import {
  serverAuthenticate,
  serverLogout,
  serverRefresh,
  identifyUserViaServer,
  serverForget,
  resetUserPassword,
  identifyUserUsingOAuth,
} from 'apis/auth'
import { isActive } from 'utils/auth'
import config from 'config/auth'
import configRoutes from 'config/routes'
import moment from 'moment'
import logger from 'utils/logger'
import { redirect, documentLocation } from 'utils/window'
import { getGoToMyGousto, getGoToMyDeliveries } from 'selectors/features'
import { trackUserLogin } from 'actions/loggingmanager'
import { isServer } from '../../server/utils/serverEnvironment'

import { canUseWindow } from '../utils/browserEnvironment'
import statusActions from './status'
import loginActions from './login'
import { fetchFeatures } from '../apis/fetchS3'
import { actionTypes } from './actionTypes'

/**
 * @param authResponse - API response from /login or /refresh
 * @returns object - a Redux action
 */
function userAuthenticatedViaAPI(authResponse) {
  const {
    accessToken,
    refreshToken,
    expiresIn,
  } = authResponse.data

  const expiresAt = moment().add(expiresIn, 'seconds').toISOString()

  // FEF-363: Refresh tokens are immediately flattened to 'hasRefreshCookie' to avoid exposing on `window.__store__`.
  // The actual refresh token exchange is handled via HTTP-only cookies.
  const hasRefreshCookie = typeof refreshToken === 'string' && refreshToken.length > 0

  return {
    type: actionTypes.USER_AUTHENTICATED,
    accessToken,
    hasRefreshCookie,
    expiresAt
  }
}

function userAuthenticatedViaCookies(accessToken, refreshToken, expiresAt) {
  // FEF-363: Refresh tokens are immediately flattened to 'hasRefreshCookie' to avoid exposing on `window.__store__`.
  // The actual refresh token exchange is handled via HTTP-only cookies.
  const hasRefreshCookie = typeof refreshToken === 'string' && refreshToken.length > 0

  return {
    type: actionTypes.USER_AUTHENTICATED,
    accessToken,
    hasRefreshCookie,
    expiresAt
  }
}

const userAuthFailed = () => ({
  type: actionTypes.USER_AUTH_FAILED
})

const userIdentified = user => ({
  type: actionTypes.USER_IDENTIFIED,
  user,
})

const userLoggedIn = () => ({
  type: actionTypes.USER_LOGGED_IN,
})

const userRememberMe = rememberMe => ({
  type: actionTypes.USER_REMEMBER_ME,
  rememberMe,
})

const redirectLoggedInUser = () => (
  async (dispatch, getState) => {
    const { auth } = getState()
    const isAuthenticated = auth.get('isAuthenticated')

    const { pathname } = documentLocation()

    if (pathname === '/' && isAuthenticated) {
      if (getGoToMyGousto(getState())) return redirect(configRoutes.client.myGousto)
      if (getGoToMyDeliveries(getState())) return redirect(configRoutes.client.myDeliveries)
    }
  }
)

/* auth */
const authenticate = (email, password, rememberMe, recaptchaToken) => (
  async (dispatch) => {
    try {
      const { data: authResponse } = await serverAuthenticate(email, password, rememberMe, recaptchaToken)
      dispatch(userAuthenticatedViaAPI(authResponse))
    } catch (err) {
      if (err.status === 401) {
        err.message = config.FAILED_LOGIN_TEXT
      } else {
        err.message = config.DEFAULT_ERROR
      }

      throw err
    }
  }
)

const refresh = () => (
  async (dispatch, getState) => {
    const rememberMe = getState().auth.get('rememberMe', false)
    try {
      const { data: refreshResponse = {} } = await serverRefresh(rememberMe)
      dispatch(userAuthenticatedViaAPI(refreshResponse))

      if (canUseWindow()) {
        datadogLogs.logger.info('src/actions/auth.js:refresh successfully exchanged refresh token')
      }
    } catch (err) {
      if (canUseWindow()) {
        datadogLogs.logger.warn('src/actions/auth.js:refresh failed to exchange refresh token', {
          err: (err || {}).message
        })

        dispatch(loginActions.logoutUser())
      }

      switch (err.status) {
      default:
        err.message = config.DEFAULT_ERROR
        break
      }
    }
  }
)

const identify = (accessToken) => (
  async (dispatch) => {
    let data = {}

    if (isServer()) {
      data = await identifyUserUsingOAuth(accessToken)
    } else {
      data = await identifyUserViaServer()
    }

    const user = data.data
    dispatch(userIdentified(user))

    if (isActive(user.roles)) {
      dispatch(trackUserLogin())
      dispatch(userLoggedIn())
    }
  }
)

const clear = () => (
  async (dispatch, getState) => {
    const accessToken = getState().auth.get('accessToken')

    await serverLogout()
    await serverForget(accessToken)
  }
)

const validate = (accessToken, hasRefreshCookie, expiresAt) => (
  async (dispatch, getState) => {
    try {
      if (expiresAt && moment(expiresAt).isBefore(moment())) {
        throw new Error('Token already expired')
      }
      await dispatch(identify(accessToken))
    } catch (err) {
      if (hasRefreshCookie && canUseWindow()) {
        await dispatch(refresh())
        const newAccessToken = getState().auth.get('accessToken')
        await dispatch(identify(newAccessToken))
      } else {
        throw err
      }
    }
  }
)

const authResetPassword = (password, passwordToken, recaptchaToken = '') => (
  async (dispatch) => {
    dispatch(statusActions.pending(actionTypes.AUTH_PASSWORD_RESET, true))
    dispatch(statusActions.error(actionTypes.AUTH_PASSWORD_RESET, null))

    try {
      const { data: { email } } = await resetUserPassword(password, passwordToken)
      await dispatch(loginActions.loginUser({ email, password, rememberMe: true, recaptchaToken }))
      redirect(configRoutes.client.myDeliveries)
    } catch (err) {
      dispatch(statusActions.error(actionTypes.AUTH_PASSWORD_RESET, err.errors))
      logger.error(err)
    } finally {
      dispatch(statusActions.pending(actionTypes.AUTH_PASSWORD_RESET, false))
    }
  }
)

export const changeRecaptcha = () => async (dispatch) => {
  try {
    const { data } = await fetchFeatures()
    if (data) {
      const { isRecaptchaEnabled } = data
      await dispatch({
        type: actionTypes.CHANGE_RECAPTCHA,
        isRecaptchaEnabled
      })
    }
  } catch (err) {
    logger.error({message: 'S3File fetch failed'})
  }
}

export const storeSignupRecaptchaToken = (token) => ({
  type: actionTypes.STORE_SIGNUP_RECAPTCHA_TOKEN,
  token,
})

const authActions = {
  authAuthenticate: authenticate,
  authRefresh: refresh,
  authIdentify: identify,
  authClear: clear,
  authValidate: validate,
  authResetPassword,
  redirectLoggedInUser,
  storeSignupRecaptchaToken,
  userRememberMe,
  userAuthenticatedViaAPI,
  userAuthenticatedViaCookies,
  userAuthFailed,
}

export default authActions
