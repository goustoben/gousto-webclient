import actionTypes from './actionTypes'
import { serverAuthenticate, serverLogout, serverRefresh, serverIdentify, serverForget, resetUserPassword, identifyUser } from 'apis/auth'
import { isActive } from 'utils/auth'
import config from 'config/auth'
import configRoutes from 'config/routes'
import moment from 'moment'
import statusActions from './status'
import logger from 'utils/logger'
import loginActions from './login'
import { redirect } from 'utils/window'

/* action creators */
const userAuthenticated = (accessToken, refreshToken, expiresAt) => ({
  type: actionTypes.USER_AUTHENTICATED,
  accessToken,
  refreshToken,
  expiresAt,
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

/* auth */
const authenticate = (email, password, rememberMe) => (
  async (dispatch) => {
    try {
      const { data: authResponse } = await serverAuthenticate(email, password, rememberMe)
      const {
        accessToken,
        refreshToken,
        expiresIn,
      } = authResponse.data
      const expiresAt = moment().add(expiresIn, 'seconds').toISOString()
      dispatch(userAuthenticated(accessToken, refreshToken, expiresAt))
    } catch (err) {
      if (err.status === 401) {
        err.message = config.FAILED_LOGIN_TEXT
      } else if (err.status >= 500) {
        err.message = config.DEFAULT_ERROR
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
      const {
        accessToken,
        refreshToken,
        expiresIn,
      } = refreshResponse.data
      const expiresAt = moment().add(expiresIn, 'seconds').toISOString()
      dispatch(userAuthenticated(accessToken, refreshToken, expiresAt))
    } catch (err) {
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
    if (__SERVER__) {
      data = await identifyUser(accessToken)
    } else {
      data = await serverIdentify()
    }

    const user = data.data
    dispatch(userIdentified(user))
    if (isActive(user.roles)) {
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

const validate = (accessToken, refreshToken, expiresAt) => (
  async (dispatch, getState) => {
    try {
      if (expiresAt && moment(expiresAt).isBefore(moment())) {
        throw new Error('Token already expired')
      }
      await dispatch(identify(accessToken))
    } catch (err) {
      if (refreshToken) {
        await dispatch(refresh(refreshToken))
        const newAccessToken = getState().auth.get('accessToken')
        await dispatch(identify(newAccessToken))
      } else {
        throw err
      }
    }
  }
)

const resetPassword = (password, passwordToken) => (
  async (dispatch) => {
    dispatch(statusActions.pending(actionTypes.AUTH_PASSWORD_RESET, true))
    dispatch(statusActions.error(actionTypes.AUTH_PASSWORD_RESET, null))

    try {
      const { data: { email } } = await resetUserPassword(password, passwordToken)
      await dispatch(loginActions.loginUser(email, password, true))
      redirect(configRoutes.client.myDeliveries)
    } catch (err) {
      dispatch(statusActions.error(actionTypes.AUTH_PASSWORD_RESET, err.code))
      logger.error(err.message)
    } finally {
      dispatch(statusActions.pending(actionTypes.AUTH_PASSWORD_RESET, false))
    }
  }
)

export default {
  authAuthenticate: authenticate,
  authRefresh: refresh,
  authIdentify: identify,
  authClear: clear,
  authValidate: validate,
  authResetPassword: resetPassword,
  userRememberMe,
  userAuthenticated,
}
