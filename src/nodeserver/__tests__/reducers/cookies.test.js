import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable' /* eslint-disable new-cap */
import cookiesReducer, { initialState } from 'reducers/cookies'

describe('cookies reducer', () => {
	test('initial state', () => {
		expect(
			Immutable.is(cookiesReducer.cookies(undefined, {}), initialState),
		).toEqual(true)
	})

	test('unknown actions', () => {
		const result = cookiesReducer.cookies(initialState, { type: 'unknown' })

		expect(Immutable.is(result, initialState)).toEqual(true)
	})

	describe('COOKIE_POLICY_ACCEPTANCE_CHANGE', () => {
		test('value passed set in the state', () => {
			const result = cookiesReducer.cookies(initialState, {
				type: actionTypes.COOKIE_POLICY_ACCEPTANCE_CHANGE,
				isAccepted: 'is-accepted-value',
			})

			expect(result.get('isPolicyAccepted')).toEqual('is-accepted-value')
		})
	})
})
