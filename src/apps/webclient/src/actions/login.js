import queryString from 'query-string'
import Immutable from 'immutable'
import Cookies from 'utils/GoustoCookies'
import { client } from 'config/routes'
import { isOneOfPage } from 'utils/routes'
import { isActive, isSuspended, needsReactivating, isAdmin, validateEmail } from 'utils/auth'
import { push } from 'react-router-redux'
import { redirect, documentLocation, getWindow } from 'utils/window'
import { canUseWindow } from 'utils/browserEnvironment'
import URL from 'url' // eslint-disable-line import/no-nodejs-modules
import { getUserId } from 'selectors/user'
import { getIsGoustoOnDemandEnabled } from 'selectors/features'
import { isOptimizelyFeatureEnabledFactory } from 'containers/OptimizelyRollouts/index'
import { getProtocol, getDomain } from 'utils/isomorphicEnvironment'
import { orderAssignToUser } from '../routes/Menu/actions/order'
import statusActions from './status'
import authActions from './auth'
import { actionTypes } from './actionTypes'
import { isMobile } from '../utils/view'
import { getBrowserType } from '../selectors/browser'

const { pending, error } = statusActions

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

export const helpPreLoginVisibilityChange = visibility => (
  (dispatch) => {
    if (visibility === true) {
      const helpCentreUrl = `?target=${encodeURIComponent(`${getProtocol()}//${getDomain()}${client.helpCentre}`)}`
      dispatch(push({ search: helpCentreUrl }))
    }
    dispatch({
      type: actionTypes.HELP_PRELOGIN_VISIBILITY_CHANGE,
      payload: {
        visibility,
      },
    })
  }
)

export const logoutRedirect = () => (
  () => {
    redirect('/')
  }
)

const postLogoutSteps = () => (
  (dispatch) => {
    dispatch({ type: actionTypes.BASKET_RESET })
    dispatch({ type: actionTypes.USER_LOGGED_OUT }) // resets auth state
    if (canUseWindow()) {
      dispatch(logoutRedirect())
    }
  }
)

const login = ({ email, password, rememberMe, recaptchaToken = null }, orderId = '') => (
  async (dispatch, getState) => {
    dispatch(pending(actionTypes.USER_LOGIN, true))
    dispatch(error(actionTypes.USER_LOGIN, false))
    dispatch({ type: actionTypes.LOGIN_ATTEMPT })
    try {
      if (rememberMe) {
        dispatch({ type: actionTypes.LOGIN_REMEMBER_ME })
      }
      await dispatch(authActions.authAuthenticate(email, password, rememberMe, recaptchaToken))
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
    destination = client.menu
  } else if (search) {
    const { target } = queryString.parse(search)

    if (target && typeof target === 'string') {
      let url
      try {
        url = URL.parse(target)

        const checkHostIsGousto = (path) => (path.split('.').some((host) => host === 'gousto'))

        if (checkHostIsGousto(url.host) && checkHostIsGousto(getDomain())) {
          destination = `${url.pathname}${url.search ? url.search : ''}`
        }
      } catch (err) {
        // do nothing
      }
    }
  }

  if (!destination && !isOneOfPage(pathname, ['menu', 'check-out'])) {
    const afterLoginPage = features ? features.getIn(['afterLogin', 'value']) : undefined

    destination = client[afterLoginPage] || client.myGousto
  }

  if (search) {
    const { promo_code: promoCode } = queryString.parse(search)
    destination = destination || pathname || ''
    destination = promoCode ? `${destination}?promo_code=${promoCode}` : destination
  }

  return destination
}

export const postLoginSteps = (userIsAdmin, orderId = '', features) => (
  async (dispatch, getState) => {
    const state = getState()
    const userId = getUserId(state)
    const location = documentLocation()
    const onCheckout = location.pathname.includes('check-out')
    let destination = false

    const isGoustoOnDemandJourneyEnabled = getIsGoustoOnDemandEnabled(state) && location.pathname.includes(`${client.signup}/start`)
    if (isGoustoOnDemandJourneyEnabled) {
      redirect(`${client.signup}/apply-voucher`)

      return
    }

    if (!onCheckout) {
      destination = loginRedirect(location, userIsAdmin, features, userId)
      if (destination && destination !== client.myDeliveries) {
        redirect(destination)
      }
      if (Cookies.get('from_join')) {
        Cookies.expire('from_join')
      }
    }

    const windowObj = getWindow()
    if (canUseWindow() && typeof windowObj.__authRefresh__ === 'function' && windowObj.__store__) { // eslint-disable-line no-underscore-dangle
      windowObj.__authRefresh__(windowObj.__store__) // eslint-disable-line no-underscore-dangle
    }

    if (onCheckout) {
      if (orderId) {
        const isTasteProfileEnabled = isOptimizelyFeatureEnabledFactory('turnips_taste_profile_web_phased_rollout')

        if (isMobile(getBrowserType(getState())) && await isTasteProfileEnabled(dispatch, getState)) {
          redirect(`/taste-profile/${orderId}`)

          return
        }

        const welcomePage = client.welcome
        dispatch(push(`${welcomePage}/${orderId}`))
      } else {
        dispatch(loginVisibilityChange(false))
        dispatch(orderAssignToUser(undefined, getState().basket.get('previewOrderId')))
        dispatch(push(client.myGousto))
      }
    } else {
      setTimeout(() => {
        dispatch(loginVisibilityChange(false))
        if (destination === client.myDeliveries) {
          dispatch(push(client.myDeliveries))
        }
      }, 1000)
    }
  }
)

export default {
  loginUser: login,
  logoutUser: logout,
  loginVisibilityChange,
  cannotLogin,
  loginRedirect,
}
