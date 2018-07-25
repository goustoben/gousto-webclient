

const userReducer = require('../../../js/products/reducers/user')
const Immutable = require('immutable')
const CONFIG = require('@fe/gousto-config')
const CONSTANTS = CONFIG.PRODUCTS

describe('userReducer', () => {
	describe('user', () => {
		it('should handle initial state', () => {
			expect(userReducer.user(undefined, {})).toEqual(Immutable.Map({}))
		})

		it('should handle unknown actions', () => {
			expect(userReducer.user(Immutable.Map({}), { type: 'unknown' })).toEqual(Immutable.Map({}))
		})

		it('should load details', () => {
			let action = {
				type: CONSTANTS.LOAD_USER_DATA,
				data: {
					id: 3,
					ageVerified: false
				}
			}
			const result = userReducer.user(Immutable.Map({}), action)
			const expected = Immutable.Map({id: 3, ageVerified: false})
			expect(Immutable.is(result, expected)).toBe(true)
		})

		it('should update age verified', () => {
			let action = {
				type: CONSTANTS.AGE_VERIFY,
				ageVerified: true
			}

			let state = Immutable.Map({
				id: 3,
				ageVerified: false
			})

			let expectedState = Immutable.Map({
				id: 3,
				ageVerified: true
			})

			expect(Immutable.is(userReducer.user(state, action), expectedState)).toBe(true)
		})
	})

	describe('canSave', () => {
		it('should handle initial state', () => {
			expect(userReducer.canSave(undefined, {})).toBe(true)
		})

		it('should handle unknown actions', () => {
			expect(userReducer.canSave(true, { type: 'unknown' })).toBe(true)
		})
	})
})
