import { set, unset } from './cookieHelper2'

const persistAuth = (state, cookies) => {
	if (!state.auth.get('isAuthenticated')) {
		unset(cookies, 'oauth_refresh')
		unset(cookies, 'oauth_token')
	} else {
		const refreshToken = state.auth.get('refreshToken')
		const rememberMe = state.auth.get('rememberMe')
		const accessToken = state.auth.get('accessToken')
		const expiresAt = state.auth.get('expiresAt')
		set(cookies, 'oauth_token', { access_token: accessToken, expires_at: expiresAt }, rememberMe ? (10 / 24) : null)
		if (refreshToken) {
			set(cookies, 'oauth_refresh', { refresh_token: refreshToken, remember_me: rememberMe }, rememberMe ? 90 : null)
		} else {
			unset(cookies, 'oauth_refresh')
		}
	}
}

export default persistAuth
