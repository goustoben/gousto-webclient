import sinon from 'sinon'

import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable' /* eslint-disable new-cap */
import newsletterReducer from 'reducers/newsletter'

describe('newsletter reducer', () => {
	const newsletterSignup = newsletterReducer.newsletterSignup

	test('should handle initial state', () => {
		const initialState = Immutable.Map({})
		expect(Immutable.is(newsletterSignup(undefined, {}), initialState)).toEqual(
			true,
		)
	})

	describe('NEWSLETTER_SIGNUP_PENDING action type', () => {
		test('should change the state indicating a pending signup', () => {
			const state = Immutable.Map({})
			const result = newsletterSignup(state, {
				type: actionTypes.NEWSLETTER_SIGNUP_PENDING,
			})
			const expected = Immutable.Map({ pending: true })

			expect(Immutable.is(result, expected)).toEqual(true)
		})
	})

	describe('NEWSLETTER_SIGNUP_SUCCESS action type', () => {
		test('should change the state indicating a successful signup', () => {
			const state = Immutable.Map({})
			const result = newsletterSignup(state, {
				type: actionTypes.NEWSLETTER_SIGNUP_SUCCESS,
			})
			const expected = Immutable.Map({ success: true })

			expect(Immutable.is(result, expected)).toEqual(true)
		})
	})

	describe('NEWSLETTER_SIGNUP_ERROR action type', () => {
		test('should change the state indicating an error signing up and pass the error message through', () => {
			const state = Immutable.Map({})
			const message = Immutable.fromJS('an error message')
			const result = newsletterSignup(state, {
				type: actionTypes.NEWSLETTER_SIGNUP_ERROR,
				message,
			})
			const expected = Immutable.Map({ error: message })

			expect(Immutable.is(result, expected)).toEqual(true)
		})
	})
})
