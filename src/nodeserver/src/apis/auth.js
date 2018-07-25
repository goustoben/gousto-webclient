import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'
import env from 'utils/env'
const version = routes.version.auth

export function getUserToken(reqData) {
	return fetch(null, `${endpoint('auth', version)}${routes.auth.userToken}`, { grant_type: 'password', username: reqData.email, password: reqData.password }, 'POST', 'no-cache', {}, false)
}

export function identifyUser(accessToken) {
	return fetch(accessToken, `${endpoint('auth', version)}${routes.auth.identifyUser}`, {}, 'GET', 'no-cache')
}

export function refreshUserToken(reqData) {
	const body = {
		grant_type: 'refresh_token',
		refresh_token: reqData.refresh,
	}
	if (__SERVER__ && env) {
		body.client_id = env.authClientId
		body.client_secret = env.authClientSecret
	}

	return fetch(null, `${endpoint('auth', version)}${routes.auth.refreshToken}`, body, 'POST', 'no-cache', {}, false)
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
