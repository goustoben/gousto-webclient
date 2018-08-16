import { routeMatches, addSessionCookies, removeSessionCookies, getCookieValue } from './utils'
import { identifyUser, getUserToken, refreshUserToken, forgetUserToken, validateUserPassword } from 'apis/auth'
import env from 'utils/env'
import routes from 'config/routes'

/**
 * Login Route
 * @param {*} ctx
 */
export async function login(ctx) { /* eslint-disable no-param-reassign */
	try {
		const { username, password, rememberMe } = ctx.request.body
		const authResponse = await getUserToken({ email: username, password })

		addSessionCookies(ctx, authResponse, rememberMe)
		ctx.response.body = authResponse
	} catch (e) {
		ctx.response.status = 401
		ctx.response.body = {
			error: 'invalid_credentials',
		}
	}
}

/**
 * Logout Route
 * @param {*} ctx
 */
export function logout(ctx) {
	removeSessionCookies(ctx)
	ctx.response.status = 200
	ctx.response.body = { status: 'ok' }
}

/**
 * Refresh Route
 * @param {*} ctx
 */
export async function refresh(ctx) {
	let refreshToken
	try {
		const { rememberMe } = ctx.request.body
		const { authClientId, authClientSecret } = env
		refreshToken = getCookieValue(ctx, 'oauth_refresh', 'refresh_token')

		if (refreshToken) {
			const refreshReponse = await refreshUserToken(refreshToken, authClientId, authClientSecret)
			addSessionCookies(ctx, refreshReponse, rememberMe)
			ctx.response.body = refreshReponse
		} else {
			throw new Error('Refresh token not present')
		}
	} catch (error) {
		ctx.response.status = 401
		ctx.response.body = {
			error,
		}
	}
}

/**
 * Identify Route
 * @param {*} ctx
 */
export async function identify(ctx) {
	let accessToken
	try {
		accessToken = getCookieValue(ctx, 'oauth_token', 'access_token')

		if (accessToken) {
			const identifyResponse = await identifyUser(accessToken)
			ctx.response.body = identifyResponse.data
		} else {
			throw new Error('Access token not present')
		}
	} catch (error) {
		ctx.response.status = 401
		ctx.response.body = {
			error,
		}
	}
}

/**
 * Forget Route
 * @param {*} ctx
 */
export async function forget(ctx) {
	const { accessToken } = ctx.request.body
	try {
		if (accessToken) {
			const forgetResponse = await forgetUserToken(accessToken)
			ctx.response.body = forgetResponse
		} else {
			throw new Error('Access token not present')
		}
	} catch (error) {
		ctx.response.status = 401
		ctx.response.body = {
			error,
		}
	}
}

/**
 * Validate User Password Route
 * @param {*} ctx
 */
export async function validate(ctx) {
	const { password } = ctx.request.body
	try {
		if (password) {
			const passwordResponse = await validateUserPassword(password)
			ctx.response.body = passwordResponse
		} else {
			throw new Error('Password not present')
		}
	} catch (error) {
		ctx.response.status = 406
		ctx.response.body = {
			error,
		}
	}
}

/* eslint-disable consistent-return */
export default function authRoutes(app) {
	app.use(async (ctx, next) => {
		if (routeMatches(ctx, routes.auth.login, 'POST')) {
			await login(ctx)
		} else if (routeMatches(ctx, routes.auth.logout, 'POST')) {
			logout(ctx)
		} else if (routeMatches(ctx, routes.auth.refresh, 'POST')) {
			await refresh(ctx)
		} else if (routeMatches(ctx, routes.auth.identify, 'POST')) {
			await identify(ctx)
		} else if (routeMatches(ctx, routes.auth.forget, 'POST')) {
			await forget(ctx)
		} else if (routeMatches(ctx, routes.auth.validate, 'POST')) {
			await validate(ctx)
		} else {
			return next()
		}
	})
}
