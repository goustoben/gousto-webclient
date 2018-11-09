import config from 'config/routes'

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

/**
 * On Enter function, which prevent
 * access to not authenticated users
 * redirecting to the whished location
 *
 * @param store
 * @param redirectUrl
 * @returns {function(*, *, *)}
 */
export function checkValidSession(store, redirectUrl = '/', target = false) {
  return ({ location }, replace, next) => {
    const isAuthenticated = store.getState().auth.get('isAuthenticated')
    if (!isAuthenticated) {
      if (target) {
        const encodedUrl = encodeURIComponent(getOrigin() + location.pathname)
        redirectUrl += `#login?target=${encodedUrl}` // eslint-disable-line no-param-reassign
      }
      replace(redirectUrl)
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
