import Cookies from 'cookies-js'
import { get, set } from 'utils/cookieHelper2'

import { routeMatches, addSessionCookies, removeSessionCookies } from 'server/routes/utils'
import { getCookieValue } from '../../../server/routes/utils';

const getRoutingCtx = ({ path, method }) => ({
	path,
	method,
})

const getResponse = ({ expiresIn, accessToken, refreshToken }) => ({
	data: {
		expiresIn,
		accessToken,
		refreshToken,
	},
})

describe('utils', () => {
	let ctx

	describe('routeMatches', () => {
		test('should return false if ctx does not match given method and path', () => {
			ctx = getRoutingCtx({ path: '/refresh', method: 'GET' })

			expect(routeMatches(ctx, '/login', 'POST')).toBeFalsy()
		})

		test('should return false if ctx matches given path, not method', () => {
			ctx = getRoutingCtx({ path: '/login', method: 'GET' })

			expect(routeMatches(ctx, '/login', 'POST')).toBeFalsy()
		})

		test('should return false if ctx matches given method, not path', () => {
			ctx = getRoutingCtx({ path: '/refresh', method: 'POST' })

			expect(routeMatches(ctx, '/login', 'POST')).toBeFalsy()
		})

		test('should return true if ctx matches given path and method', () => {
			ctx = getRoutingCtx({ path: '/login', method: 'POST' })

			expect(routeMatches(ctx, '/login', 'POST')).toBeTruthy()
		})
	})

	describe('addSessionCookies', () => {
		let response
		let expiresIn
		let accessToken
		let refreshToken
		let rememberMe

		test('should set session cookies', () => {
			ctx = { cookies: Cookies }
			expiresIn = 86400
			accessToken = 'eed4b4f4a3ed0091cb4b7af9c581350bdf9ea806'
			refreshToken = 'e952110d7eb6bc145f0aec29cc32fddb84a298d3'
			rememberMe = true
			response = getResponse({
				expiresIn,
				accessToken,
				refreshToken,
			})

			addSessionCookies(ctx, response, true)
			expect(get(ctx.cookies, 'oauth_token').access_token).toEqual(accessToken)
			expect(get(ctx.cookies, 'oauth_expiry').expires_at).toBeTruthy()
			expect(get(ctx.cookies, 'oauth_refresh').refresh_token).toEqual(refreshToken)
			expect(get(ctx.cookies, 'oauth_remember').remember_me).toEqual(rememberMe)
		})
	})

	describe('removeSessionCookies', () => {
		beforeEach(() => {
			ctx = { cookies: Cookies }
		})

		afterEach(() => {
			expect(get(ctx.cookies, 'oauth_token').access_token).toBeFalsy()
			expect(get(ctx.cookies, 'oauth_expiry').expires_at).toBeFalsy()
			expect(get(ctx.cookies, 'oauth_refresh').refresh_token).toBeFalsy()
			expect(get(ctx.cookies, 'oauth_remember').remember_me).toBeFalsy()
		})

		test('should reset session cookies', () => {
			removeSessionCookies(ctx)
		})

		test('should reset existing session cookies', () => {
			const expiresAt = '2018-04-10T12:00:00Z'
			const accessToken = 'eed4b4f4a3ed0091cb4b7af9c581350bdf9ea806'
			const refreshToken = 'e952110d7eb6bc145f0aec29cc32fddb84a298d3'
			const rememberMe = true


			set(ctx.cookies, 'oauth_token', { access_token: accessToken }, (10 / 24), true, true, true)
			set(ctx.cookies, 'oauth_expiry', { expires_at: expiresAt }, (10 / 24))
			set(ctx.cookies, 'oauth_refresh', { refresh_token: refreshToken }, 90, true, true, true)
			set(ctx.cookies, 'oauth_remember', { remember_me: rememberMe }, 90)

			removeSessionCookies(ctx)
		})
	})

	describe('getCookieValue', () => {
		let testValue

		beforeEach(() => {
			ctx = { cookies: Cookies }
			testValue = 'test_value'
			set(ctx.cookies, 'valid_cookie', { valid_property: testValue })
		})

		test('should return undefined for a non-existent cookie', () => {
			expect(getCookieValue(ctx, 'invalid_cookie', 'invalid_property')).toBeUndefined()
		})

		test('should return undefined for an existing cookie with wrong property', () => {
			expect(getCookieValue(ctx, 'valid_cookie', 'invalid_property')).toBeUndefined()
		})

		test('should return the value for an existing cookie with property', () => {
			expect(getCookieValue(ctx, 'valid_cookie', 'valid_property')).toEqual(testValue)
		})
	})
})
