import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'

const version = routes.version.auth

export function getUserToken({ email, password, clientId, clientSecret }) {
	return fetch(null, `${endpoint('auth', version)}${routes.auth.userToken}`, { grant_type: 'password', username: email, password, client_id: clientId, client_secret: clientSecret }, 'POST', 'no-cache')
}

export function identifyUser(accessToken) {
	return fetch(accessToken, `${endpoint('auth', version)}${routes.auth.identifyUser}`, {}, 'GET', 'no-cache')
}

export function refreshUserToken(refreshToken, clientId, clientSecret) {
	return fetch(null, `${endpoint('auth', version)}${routes.auth.refreshToken}`, { grant_type: 'refresh_token', refresh_token: refreshToken, client_id: clientId, client_secret: clientSecret }, 'POST', 'no-cache', {}, false)
}

export function forgetUserToken(accessToken) {
	return fetch(accessToken, `${endpoint('auth', version)}${routes.auth.userToken}`, {}, 'DELETE', 'no-cache')
}

export function validateUserPassword(password) {
	return fetch(null, `${endpoint('auth', version)}${routes.auth.validateUserPassword}`, { password }, 'POST', 'no-cache')
}

export function resetUserPassword(password, passwordToken) {
	return fetch(null, `${endpoint('auth', version)}${routes.auth.resetUserPassword}`, {
		password,
		password_token: passwordToken,
	}, 'POST', 'no-cache')
}

export function serverAuthenticate(email, password, rememberMe) {
	return fetch(null, `${routes.auth.login}`, { grant_type: 'password', username: email, password, rememberMe }, 'POST', 'no-cache', {}, null, true, false)
}

export function serverLogout() {
	return fetch(null, `${routes.auth.logout}`, {}, 'POST', 'no-cache', {}, null, true, false)
}

export function serverRefresh(rememberMe) {
	return fetch(null, `${routes.auth.refresh}`, { rememberMe }, 'POST', 'no-cache', {}, null, true, false)
}

export function serverIdentify() {
	return fetch(null, `${routes.auth.identify}`, {}, 'POST', 'no-cache', {}, null, true, false)
}

export function serverForget(accessToken) {
	return fetch(null, `${routes.auth.forget}`, { accessToken }, 'POST', 'no-cache', {}, null, true, false)
}

export function serverValidatePassword(password) {
	return fetch(null, `${routes.auth.validate}`, { password }, 'POST', 'no-cache', {}, null, true, false)
}
