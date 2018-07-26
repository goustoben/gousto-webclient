import sinon from 'sinon'

import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable' /* eslint-disable new-cap */
import status from 'reducers/status'

describe('status reducers', () => {
	describe('pending', () => {
		test('should handle initial state', () => {
			const state = undefined
			const action = {}
			const expected = Immutable.Map({})
			const result = status.pending(state, action)
			expect(Immutable.is(expected, result)).toEqual(true)
		})

		test('should handle unknown actions', () => {
			const state = undefined
			const action = { type: 'unknown' }
			const expected = Immutable.Map({})
			const result = status.pending(state, action)
			expect(Immutable.is(expected, result)).toEqual(true)
		})

		test('should handle PENDING action types', () => {
			const state = undefined
			const action = {
				type: actionTypes.PENDING,
				key: 'something',
				value: 'something else',
			}
			const expected = Immutable.Map({
				something: 'something else',
			})
			const result = status.pending(state, action)
			expect(Immutable.is(expected, result)).toEqual(true)
		})

		test('should handle add to the state action types', () => {
			const state = Immutable.Map({
				something: 'something else',
			})
			const action = {
				type: actionTypes.PENDING,
				key: 'somethingMore',
				value: 'something more else',
			}
			const expected = Immutable.Map({
				something: 'something else',
				somethingMore: 'something more else',
			})
			const result = status.pending(state, action)
			expect(Immutable.is(expected, result)).toEqual(true)
		})
	})

	describe('error', () => {
		test('should handle initial state', () => {
			const state = undefined
			const action = {}
			const expected = Immutable.Map({})
			const result = status.error(state, action)
			expect(Immutable.is(expected, result)).toEqual(true)
		})

		test('should handle unknown actions', () => {
			const state = undefined
			const action = { type: 'unknown' }
			const expected = Immutable.Map({})
			const result = status.error(state, action)
			expect(Immutable.is(expected, result)).toEqual(true)
		})

		test('should handle ERROR action types', () => {
			const state = undefined
			const action = {
				type: actionTypes.ERROR,
				key: 'something',
				value: 'something else',
			}
			const expected = Immutable.Map({
				something: 'something else',
			})
			const result = status.error(state, action)
			expect(Immutable.is(expected, result)).toEqual(true)
		})

		test('should handle add to the state action types', () => {
			const state = Immutable.Map({
				something: 'something else',
			})
			const action = {
				type: actionTypes.ERROR,
				key: 'somethingMore',
				value: 'something more else',
			}
			const expected = Immutable.Map({
				something: 'something else',
				somethingMore: 'something more else',
			})
			const result = status.error(state, action)
			expect(Immutable.is(expected, result)).toEqual(true)
		})

		test('should convert error objects to strings', () => {
			const state = Immutable.Map({})
			const action = {
				type: actionTypes.ERROR,
				key: 'something',
				value: new Error('some error'),
			}
			const expected = Immutable.Map({
				something: 'some error',
			})
			const result = status.error(state, action)
			expect(Immutable.is(expected, result)).toEqual(true)
		})
	})
})
