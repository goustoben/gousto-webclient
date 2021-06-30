import isomorphicFetch from 'isomorphic-fetch'
import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'

export function getUserToken({ email, password, clientId, clientSecret, headers }) {
  return fetch(null, `${endpoint('auth')}${routes.auth.userToken}`, { grant_type: 'password', username: email, password, client_id: clientId, client_secret: clientSecret }, 'POST', 'no-cache', {
    'x-forwarded-for': headers['x-forwarded-for'],
    'user-agent': headers['user-agent']
  })
}

export function identifyUserUsingOAuth(accessToken) {
  return fetch(accessToken, `${endpoint('auth')}${routes.auth.identifyUser}`, {}, 'GET', 'no-cache')
}

export function refreshUserToken(refreshToken, clientId, clientSecret) {
  return fetch(null, `${endpoint('auth')}${routes.auth.refreshToken}`, { grant_type: 'refresh_token', refresh_token: refreshToken, client_id: clientId, client_secret: clientSecret }, 'POST', 'no-cache', {}, false)
}

export function forgetUserToken(accessToken) {
  return fetch(accessToken, `${endpoint('auth')}${routes.auth.userToken}`, {}, 'DELETE', 'no-cache')
}

export function validateUserPassword(password, version) {
  return fetch(null, `${endpoint('auth', version)}${routes.auth.validateUserPassword}`, { password }, 'POST', 'no-cache')
}

export function resetUserPassword(password, passwordToken) {
  return fetch(null, `${endpoint('auth')}${routes.auth.resetUserPassword}`, {
    password,
    password_token: passwordToken,
  }, 'POST', 'no-cache')
}

export function serverAuthenticate(email, password, rememberMe, recaptchaToken) {
  return fetch(null, `${routes.auth.login}`, { grant_type: 'password', username: email, password, rememberMe, recaptchaToken }, 'POST', 'no-cache', {}, null, true)
}

export function serverLogout() {
  return fetch(null, `${routes.auth.logout}`, {}, 'POST', 'no-cache', {}, null, true)
}

export function serverRefresh(rememberMe) {
  return fetch(null, `${routes.auth.refresh}`, { rememberMe }, 'POST', 'no-cache', {}, null, true)
}

export function identifyUserViaServer() {
  return fetch(null, `${routes.auth.identify}`, {}, 'POST', 'no-cache', {}, null, true)
}

export function serverForget(accessToken) {
  return fetch(null, `${routes.auth.forget}`, { accessToken }, 'POST', 'no-cache', {}, null, true)
}

export function serverValidatePassword(password) {
  return fetch(null, `${routes.auth.validate}`, { password }, 'POST', 'no-cache', {}, null, true)
}

export function validateRecaptchaUserToken(token, secret) {
  return new Promise((resolve, reject) => {
    isomorphicFetch(routes.recaptcha.verify, { method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secret}&response=${token}`,
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
