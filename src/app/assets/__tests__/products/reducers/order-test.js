

let orderReducer = require('../../../js/products/reducers/order')
const Immutable = require('immutable')
const CONFIG = require('@fe/gousto-config')
const CONSTANTS = CONFIG.PRODUCTS

describe('orderReducer', () => {
	describe('order', () => {
		it('should handle initial state', () => {
			expect(orderReducer.order(undefined, {})).toEqual(Immutable.Map({}))
		})

		it('should handle unknown actions', () => {
			expect(orderReducer.order(Immutable.Map({}), { type: 'unknown' })).toEqual(Immutable.Map({}))
		})

		it('should update order', () => {
			let action = {
				type: CONSTANTS.LOAD_ORDER_DATA,
				data: {id: 'order1', periodId: 3}
			}

			expect(orderReducer.order(Immutable.Map({}), action)).toEqual(Immutable.Map({id: 'order1', periodId: 3}))
		})
	})
})
