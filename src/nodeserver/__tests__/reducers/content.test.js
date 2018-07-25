import sinon from 'sinon'

import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable' /* eslint-disable new-cap */
import contentReducer from 'reducers/content'

describe('content reducer', () => {
	test('should handle initial state', () => {
		const initialState = Immutable.Map({})
		expect(
			Immutable.is(contentReducer.content(undefined, {}), initialState),
		).toEqual(true)
	})

	test('should handle unknown actions', () => {
		const state = Immutable.fromJS([])
		const result = contentReducer.content(state, { type: 'unknown' })

		expect(Immutable.is(result, state)).toEqual(true)
	})

	describe('CONTENT_RECEIVE', () => {
		test('should load content into state as a map of maps', () => {
			const result = contentReducer.content(Immutable.Map({}), {
				type: actionTypes.CONTENT_RECEIVE,
				content: {
					fields: [
						{
							welcomeTitleText: {
								value: 'Hey Alice,',
								default: 'Hey Alice,',
							},
						},
					],
				},
			})
			const expectedState = Immutable.Map({
				welcomeTitleText: 'Hey Alice,',
			})
			expect(Immutable.is(result, expectedState)).toEqual(true)
		})
	})
})
