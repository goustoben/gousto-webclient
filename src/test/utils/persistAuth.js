import Immutable from 'immutable' /* eslint-disable new-cap */
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

describe('persistAuth', function () {
	let persistAuth
	let state
	let cookieHelperSetSpy
	let cookieHelperUnsetSpy
	let cookies

	beforeEach(function () {
		cookieHelperSetSpy = sinon.spy()
		cookieHelperUnsetSpy = sinon.spy()
		persistAuth = require('inject-loader?./cookieHelper2!utils/persistAuth')({ // eslint-disable-line global-require
			'./cookieHelper2': {
				set: cookieHelperSetSpy,
				unset: cookieHelperUnsetSpy,
			},
		}).default
		cookies = [{ anObject: '🍪' }]
	})

	describe('with a state passed where the user is not authenticated', function () {
		beforeEach(function () {
			state = {
				auth: Immutable.Map({
					isAuthenticated: false,
				}),
			}
		})

		it('should call unset with the passed cookies object', function () {
			persistAuth(state, cookies)
			expect(cookieHelperUnsetSpy).to.have.been.calledTwice
			expect(cookieHelperUnsetSpy.getCall(0).args).to.deep.equal([cookies, 'oauth_refresh'])
			expect(cookieHelperUnsetSpy.getCall(1).args).to.deep.equal([cookies, 'oauth_token'])
		})
	})

	describe('with a state passed where the user is authenticated and has an access token', function () {
		beforeEach(function () {
			state = {
				auth: Immutable.Map({
					isAuthenticated: true,
					accessToken: 'access',
					expiresAt: '2017-01-01',
					refreshToken: '',
					rememberMe: false,
				}),
			}
		})

		it('should set the oauth_token cookie in the right format as a session cookie', function () {
			persistAuth(state, cookies)
			expect(cookieHelperSetSpy).to.have.been.calledOnce
			expect(cookieHelperSetSpy.getCall(0).args).to.deep.equal([cookies, 'oauth_token', { access_token: 'access', expires_at: '2017-01-01' }, null])
		})

		it('should unset the oauth_refresh cookie', function () {
			persistAuth(state, cookies)
			expect(cookieHelperUnsetSpy).to.have.been.calledOnce
			expect(cookieHelperUnsetSpy.getCall(0).args).to.deep.equal([cookies, 'oauth_refresh'])
		})

		describe('and remember me is true', function () {
			beforeEach(function () {
				state = {
					auth: Immutable.Map({
						isAuthenticated: true,
						accessToken: 'access',
						expiresAt: '2017-01-01',
						refreshToken: '',
						rememberMe: true,
					}),
				}
			})

			it('should set the oauth_token cookie in the right format as a 10 hour cookie', function () {
				persistAuth(state, cookies)
				expect(cookieHelperSetSpy).to.have.been.calledOnce
				expect(cookieHelperSetSpy.getCall(0).args).to.deep.equal([cookies, 'oauth_token', { access_token: 'access', expires_at: '2017-01-01' }, (10 / 24)])
			})
		})

		describe('and a refresh token', function () {
			beforeEach(function () {
				state = {
					auth: Immutable.Map({
						isAuthenticated: true,
						accessToken: 'access',
						expiresAt: '2017-01-01',
						refreshToken: 'refresh',
						rememberMe: false,
					}),
				}
			})

			it('should set the oauth_token and oauth_refresh cookies in the right format as session cookies', function () {
				persistAuth(state, cookies)
				expect(cookieHelperSetSpy).to.have.been.calledTwice
				expect(cookieHelperSetSpy.getCall(0).args).to.deep.equal([cookies, 'oauth_token', { access_token: 'access', expires_at: '2017-01-01' }, null])
				expect(cookieHelperSetSpy.getCall(1).args).to.deep.equal([cookies, 'oauth_refresh', { refresh_token: 'refresh', remember_me: false }, null])
			})

			describe('and remember me is true', function () {
				beforeEach(function () {
					state = {
						auth: Immutable.Map({
							isAuthenticated: true,
							accessToken: 'access',
							expiresAt: '2017-01-01',
							refreshToken: 'refresh',
							rememberMe: true,
						}),
					}
				})

				it('should set the cookies as 10 hour / 90 day cookies', function () {
					persistAuth(state, cookies)
					expect(cookieHelperSetSpy.getCall(0).args).to.deep.equal([cookies, 'oauth_token', { access_token: 'access', expires_at: '2017-01-01' }, (10 / 24)])
					expect(cookieHelperSetSpy.getCall(1).args).to.deep.equal([cookies, 'oauth_refresh', { refresh_token: 'refresh', remember_me: true }, 90])
				})
			})
		})
	})
})
