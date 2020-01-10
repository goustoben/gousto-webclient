import queryString from 'query-string'
import Immutable from 'immutable'
import Cookies from 'utils/GoustoCookies'
import config from 'config/routes'
import { isOneOfPage } from 'utils/routes'
import { isActive, isSuspended, needsReactivating, isAdmin, validateEmail } from 'utils/auth'
import { push } from 'react-router-redux'
import windowUtils from 'utils/window'
import globals from 'config/globals'
import URL from 'url' //eslint-disable-line import/no-nodejs-modules
import userActions from './user'
import orderActions from './order'
import pricingActions from './pricing'
import statusActions from './status'

import authActions from './auth'
import actionTypes from './actionTypes'

const { pending, error } = statusActions
const { redirect, documentLocation } = windowUtils

const authorise = roles => {
  let err
  if (!isActive(roles)) {
    const msg = 'This account is does not exist. Please sign up or contact customer care.'
    err = new Error(msg)
  }
  if (isSuspended(roles)) {
    const msg = 'This account is suspended. Please contact customer care.'
    err = new Error(msg)
  }
  if (needsReactivating(roles)) {
    const msg = 'This account is deactivated. Please contact customer care to reactivate.'
    err = new Error(msg)
  }
  if (err) {
    throw err
  }

  return true
}

const loginVisibilityChange = visibility => ({
  type: actionTypes.LOGIN_VISIBILITY_CHANGE,
  visibility,
})

const logoutRedirect = () => (
  () => {
    redirect('/')
  }
)

const postLogoutSteps = () => (
  (dispatch) => {
    dispatch({ type: actionTypes.BASKET_RESET })
    dispatch({ type: actionTypes.USER_LOGGED_OUT }) // resets auth state
    if (globals.client) {
      dispatch(logoutRedirect())
    }
  }
)

const login = (email, password, rememberMe, orderId = '') => (
  async (dispatch, getState) => {
    dispatch(pending(actionTypes.USER_LOGIN, true))
    dispatch(error(actionTypes.USER_LOGIN, false))
    dispatch({ type: actionTypes.LOGIN_ATTEMPT })
    try {
      if (rememberMe) {
        dispatch({ type: actionTypes.LOGIN_REMEMBER_ME })
      }
      await dispatch(authActions.authAuthenticate(email, password, rememberMe))
      await dispatch(authActions.authIdentify())

      const userRoles = getState().auth.get('roles', Immutable.List([]))
      if (userRoles.size > 0 && authorise(userRoles)) {
        dispatch(authActions.userRememberMe(rememberMe))

        await postLoginSteps(isAdmin(userRoles), orderId, getState().features)(dispatch, getState)
      }
    } catch (err) {
      const errMsg = err.message ? err.message : 'Sorry, we were unable to log you in. Please contact customer care.'
      dispatch(error(actionTypes.USER_LOGIN, errMsg))
      dispatch({ type: actionTypes.LOGIN_FAILED })
    }

    dispatch(pending(actionTypes.USER_LOGIN, false))
  }
)

const logout = () => (
  async dispatch => {
    await dispatch(authActions.authClear())
    dispatch(postLogoutSteps())
  }
)

const cannotLogin = ({ email, password }) => (
  async (dispatch) => {
    let err
    if (!email) {
      err = 'Please enter an email address.'
    } else if (!password) {
      err = 'Please enter a password.'
    } else if (!validateEmail(email)) {
      err = 'The email address you\'ve entered is formatted incorrectly.'
    }
    if (err) {
      dispatch(error(actionTypes.USER_LOGIN, err))
      dispatch({ type: actionTypes.LOGIN_FAILED })
    }
  }
)

export const loginRedirect = (location, userIsAdmin, features) => {
  let destination
  const { pathname, search } = location

  if (userIsAdmin) {
    destination = `${config.client.menu}?features[]=browse`
  } else if (search) {
    const { target } = queryString.parse(search)

    if (target && typeof target === 'string') {
      let url
      try {
        url = URL.parse(target)

        const hostInfoList = url.host.split('.')
        const hostInfo = hostInfoList.slice(
          hostInfoList.indexOf('gousto'),
        )
        const globalsHostInfo = globals.domain.slice(
          globals.domain.indexOf('gousto'),
        )
        const isGoustoTarget = (
          hostInfo.join('.') === globalsHostInfo
        )

        if (isGoustoTarget) {
          destination = `${url.pathname}${url.search ? url.search : ''}`
        }
      } catch (err) {
        // do nothing
      }
    }
  }

  if (!destination && !isOneOfPage(pathname, ['menu', 'check-out'])) {
    const afterLoginPage = features ? features.getIn(['afterLogin', 'value']) : undefined

    destination = config.client[afterLoginPage] || config.client.myGousto
  }

  if (destination && destination !== config.client.myDeliveries2) {
    redirect(destination)
  }

  return destination
}

export const postLoginSteps = (userIsAdmin, orderId = '', features) => {
  const location = documentLocation()
  const onCheckout = location.pathname.includes('check-out')
  let destination = false
  if (!onCheckout) {
    destination = loginRedirect(location, userIsAdmin, features)
    if (destination && destination !== config.client.myDeliveries2) {
      redirect(destination)
    }

    if (Cookies.get('from_join')) {
      Cookies.expire('from_join')
    }
  }

  const windowObj = windowUtils.getWindow()
  if (globals.client && windowObj && typeof windowObj.__authRefresh__ === 'function' && windowObj.__store__) { // eslint-disable-line no-underscore-dangle
    windowObj.__authRefresh__(windowObj.__store__) // eslint-disable-line no-underscore-dangle
  }

  return async (dispatch, getState) => {
    dispatch(pricingActions.pricingRequest())
    if (onCheckout) {
      if (orderId) {
        dispatch(push(`${config.client.welcome}/${orderId}`))
      } else {
        dispatch(orderActions.orderAssignToUser(undefined, getState().basket.get('previewOrderId')))
      }
    } else {
      if (!userIsAdmin && getState().basket) {
        const promoCode = getState().basket.get('promoCode')
        if (promoCode) {
          await userActions.userPromoApplyCode(promoCode)(dispatch, getState)
        }
      }

      setTimeout(() => {
        dispatch(loginVisibilityChange(false))

        if (destination === config.client.myDeliveries2) {
          dispatch(push(config.client.myDeliveries2))
        }
      }, 1000)
    }
  }
}
export default {
  loginUser: login,
  logoutUser: logout,
  loginVisibilityChange,
  cannotLogin,
  loginRedirect,
}
