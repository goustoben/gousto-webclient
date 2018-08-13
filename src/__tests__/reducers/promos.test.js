import sinon from 'sinon'

import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable' /* eslint-disable new-cap */
import promos from 'reducers/promos'

describe('promos reducer', () => {
	describe('promoCurrent', () => {
		test('should handle initial state', () => {
			const initialState = ''
			expect(promos.promoCurrent(undefined, {})).toEqual(initialState)
		})

		test('should handle unknown actions', () => {
			const state = 'promo-code'
			const result = promos.promoCurrent(state, { type: 'unknown' })

			expect(result).toEqual(state)
		})

		test('should handle PROMO_SET action types', () => {
			const state = ''
			const result = promos.promoCurrent(state, {
				type: actionTypes.PROMO_SET,
				code: 'promo-code',
			})

			expect(result).toEqual('promo-code')
		})
	})

	describe('promoStore', () => {
		test('should handle initial state', () => {
			const initialState = Immutable.Map({})
			expect(
				Immutable.is(promos.promoStore(undefined, {}), initialState),
			).toEqual(true)
		})

		test('should handle unknown actions', () => {
			const state = Immutable.Map({ code: 'promo-code' })
			const result = promos.promoStore(state, { type: 'unknown' })

			expect(Immutable.is(result, state)).toEqual(true)
		})

		test('should handle PROMO_RECIEVE action types', () => {
			const state = Immutable.Map()
			const result = promos.promoStore(state, {
				type: actionTypes.PROMO_RECIEVE,
				promo: { code: 'promo-code', campaign: 'campaign-1' },
			})

			expect(
				Immutable.is(
					result,
					Immutable.fromJS({
						'promo-code': { code: 'promo-code', campaign: 'campaign-1' },
					}),
				),
			).toEqual(true)
		})
	})

	describe('promoAgeVerified', () => {
		test('should handle initial state', () => {
			const initialState = false
			expect(promos.promoAgeVerified(undefined, {})).toEqual(initialState)
		})

		test('should handle unknown actions', () => {
			const state = true
			const result = promos.promoAgeVerified(state, { type: 'unknown' })

			expect(result).toEqual(state)
		})

		test('should handle PROMO_AGE_VERIFY action types', () => {
			const state = ''
			const result = promos.promoAgeVerified(state, {
				type: actionTypes.PROMO_AGE_VERIFY,
				ageVerified: true,
			})

			expect(result).toEqual(true)
		})
	})

	describe('promoModalVisible', () => {
		test('should handle initial state', () => {
			const initialState = false
			expect(promos.promoModalVisible(undefined, {})).toEqual(initialState)
		})

		test('should handle unknown actions', () => {
			const state = true
			const result = promos.promoModalVisible(state, { type: 'unknown' })

			expect(result).toEqual(state)
		})

		test('should handle PROMO_MODAL_VISIBILITY_CHANGE action types', () => {
			const state = ''
			const result = promos.promoModalVisible(state, {
				type: actionTypes.PROMO_MODAL_VISIBILITY_CHANGE,
				visible: true,
			})

			expect(result).toEqual(true)
		})
	})
})
