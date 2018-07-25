import sinon from 'sinon'

import actionTypes from 'actions/actionTypes'
import boxSummaryReducer from 'reducers/boxSummary'
import Immutable from 'immutable' /* eslint-disable new-cap */

describe('boxSummary reducer', () => {
	describe('boxSummaryShow', () => {
		test('should handle initial state', () => {
			const result = boxSummaryReducer.boxSummaryShow(undefined, {})
			const expectedResult = Immutable.fromJS({ show: false, view: '' })
			expect(Immutable.is(result, expectedResult)).toEqual(true)
		})

		test('should handle unknown actions', () => {
			const state = Immutable.fromJS({ show: false, view: '' })

			const result = boxSummaryReducer.boxSummaryShow(state, {
				type: 'unknown',
			})

			expect(result).toEqual(state)
		})

		test('should handle BOXSUMMARY_VISIBILITY_CHANGE action types', () => {
			const state = Immutable.fromJS({ show: false, view: '' })
			const result = boxSummaryReducer.boxSummaryShow(state, {
				type: actionTypes.BOXSUMMARY_VISIBILITY_CHANGE,
				show: true,
				view: 'desktop',
			})

			expect(
				Immutable.is(result, Immutable.fromJS({ show: true, view: 'desktop' })),
			).toEqual(true)
		})
	})
	describe('boxSummaryDeliveryDays', () => {
		test('should handle initial state', () => {
			const initialState = Immutable.Map({})
			expect(
				Immutable.is(
					boxSummaryReducer.boxSummaryDeliveryDays(undefined, {}),
					initialState,
				),
			).toEqual(true)
		})

		test('should handle unknown actions', () => {
			const state = null

			const result = boxSummaryReducer.boxSummaryDeliveryDays(state, {
				type: 'unknown',
			})

			expect(result).toEqual(state)
		})

		test('should handle BASKET_DELIVERY_DAYS_RECEIVE action types', () => {
			const days = Immutable.fromJS([true, true, true])
			const result = boxSummaryReducer.boxSummaryDeliveryDays(null, {
				type: actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE,
				days,
			})
			expect(result).toEqual(days)
		})
	})
	describe('boxSummaryDeliveryDaysErr', () => {
		test('should handle initial state', () => {
			expect(
				boxSummaryReducer.boxSummaryDeliveryDaysErr(undefined, {}),
			).toEqual(null)
		})

		test('should handle unknown actions', () => {
			const state = null

			const result = boxSummaryReducer.boxSummaryDeliveryDaysErr(state, {
				type: 'unknown',
			})

			expect(result).toEqual(state)
		})

		test('should handle BASKET_DELIVERY_DAYS_RECEIVE_ERROR action types', () => {
			const err = Immutable.fromJS({ message: 'error' })
			const result = boxSummaryReducer.boxSummaryDeliveryDaysErr(null, {
				type: actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE_ERROR,
				err,
			})
			expect(result).toEqual(err)
		})

		test('should handle BASKET_DELIVERY_DAYS_RECEIVE action types', () => {
			const err = Immutable.fromJS({ message: 'error' })
			let result = boxSummaryReducer.boxSummaryDeliveryDaysErr(null, {
				type: actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE_ERROR,
				err,
			})
			expect(result).toEqual(err)

			result = boxSummaryReducer.boxSummaryDeliveryDaysErr(result, {
				type: actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE,
			})
			expect(result).toEqual(null)
		})
	})
})
