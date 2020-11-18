import config from 'config/routes'
import authActions from 'actions/auth'
import { getIsAuthenticated, getAccessToken, getRefreshToken, getExpiresAt } from 'selectors/auth'

/**
 * Get origin url on the client
 * @returns {*}
 * @private
 */
function getOrigin() {
  if (__CLIENT__) {
    return (window.location.origin)
      ? `${window.location.origin}/`
      : ''
  }

  return ''
}

export const addTargetToRedirect = ({target = false, location, redirectUrl = '/'}) => {
  let redirectWithTarget

  if (target) {
    const encodedUrl = encodeURIComponent(getOrigin() + location.pathname)
    redirectWithTarget = `${redirectUrl}#login?target=${encodedUrl}`
  }

  return redirectWithTarget || redirectUrl
}

/**
 * On Enter function, which prevent
 * access to not authenticated users
 * redirecting to the wished location
 *
 * @param store
 * @param redirectUrl
 * @returns {function(*, *, *)}
 */
export function checkValidSession(store, redirectUrl, target) {
  return ({ location }, replace, next) => {
    const state = store.getState()
    const isAuthenticated = getIsAuthenticated(state)
    if (!isAuthenticated) {
      const accessToken = getAccessToken(state)
      const refreshToken = getRefreshToken(state)
      const expiresAt = getExpiresAt(state)

      if (!accessToken && !refreshToken) {
        replace(addTargetToRedirect({target, location, redirectUrl}))
      }

      try {
        store.dispatch(authActions.authValidate(accessToken, refreshToken, expiresAt))
      } catch (e) {
        replace(addTargetToRedirect({target, location, redirectUrl}))
      }
    }

    next()
  }
}

/**
 * Check guest
 * @param store
 * @param redirectUrl
 * @returns {function({location: *}, *, *)}
 */
export function checkGuest(store, redirectUrl = '/') {
  return (_, replace, next) => {
    const isAuthenticated = store.getState().auth.get('isAuthenticated')
    if (isAuthenticated) {
      replace(redirectUrl)
    }
    next()
  }
}

export function isPage(pathName, pageKey) {
  return pathName === config.client[pageKey]
}

export function isOneOfPage(pathName, pageKeys) {
  return pageKeys.some(pageKey => isPage(pathName, pageKey))
}
