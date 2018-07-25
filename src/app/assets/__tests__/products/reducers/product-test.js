

let productReducer = require('../../../js/products/reducers/product')
const Immutable = require('immutable')
const CONFIG = require('@fe/gousto-config')
const CONSTANTS = CONFIG.PRODUCTS

describe('productReducer', () => {
	describe('products', () => {
		it('should handle initial state', () => {
			expect(productReducer.products(undefined, {})).toEqual(Immutable.OrderedMap({}))
		})

		it('should handle unknown actions', () => {
			let state = Immutable.OrderedMap({'prod-1': Immutable.Map({id: 'prod-1'})})
			expect(productReducer.products(state, { type: 'unknown' })).toEqual(state)
		})

		it('should update products', () => {
			let action = {
				type: CONSTANTS.LOAD_PRODUCT,
				products: [
					{id: 'prod-1', 'list_price': '1.12'},
					{id: 'prod-2', 'list_price': '2.12'}
				]
			}

			let expectedState = Immutable.OrderedMap({
				'prod-1': Immutable.Map({id: 'prod-1', 'price': '1.12', limitReached: false}),
				'prod-2': Immutable.Map({id: 'prod-2', 'price': '2.12', limitReached: false})
			})

			const result = productReducer.products(Immutable.OrderedMap({}), action)

			expect(Immutable.is(result, expectedState)).toBe(true)
		})
	})

	describe('stock', () => {
		it('should handle initial state', () => {
			expect(productReducer.stock(undefined, {})).toEqual(Immutable.Map({}))
		})

		it('should handle unknown actions', () => {
			expect(productReducer.stock({'prod-1': {qty: 1}}, { type: 'unknown' })).toEqual({'prod-1': {qty: 1}})
		})

		it('should update stock when no stock is loaded', () => {
			let action = {
				type: CONSTANTS.LOAD_STOCK,
				stock: {
					'prod1': 11,
					'prod2': 12
				}
			}

			let expectedState = Immutable.Map({
				prod1: 11,
				prod2: 12
			})

			const result = productReducer.stock(Immutable.Map({}), action)

			expect(Immutable.is(result, expectedState)).toBe(true)
		})

		it('should add to stock when stock is already loaded', () => {
			let action = {
				type: CONSTANTS.LOAD_STOCK,
				stock: {
					'prod1': 1
				}
			}

			let initialState = Immutable.Map({
				prod1: 10,
			})

			let expectedState = Immutable.Map({
				prod1: 11,
			})
			const result = productReducer.stock(initialState, action)

			expect(Immutable.is(result, expectedState)).toBe(true)
		})
	})

	describe('userChoices', () => {
		it('should handle initial state', () => {
			expect(productReducer.userChoices(undefined, {})).toEqual(Immutable.Map({}))
		})

		it('should handle unknown actions', () => {
			expect(productReducer.userChoices({'prod-1': {qty: 1}}, { type: 'unknown' })).toEqual({'prod-1': {qty: 1}})
		})

		it('should handle product which is just added to the basket', () => {
			let action = {
				type: CONSTANTS.INCREMENT_PRODUCT,
				delta: 1,
				id: 'prod1',
				price: '1.20'
			}
			let expectedState = Immutable.Map({
				prod1: Immutable.OrderedMap({
					'1.20': Immutable.Map({'qty': 1, price: '1.20'})
				})
			})
			expect(Immutable.is(productReducer.userChoices(Immutable.Map({}), action), expectedState)).toBe(true)
		})

		it('should handle incrementing a product which is already added to the basket at the same price', () => {
			let action = {
				type: CONSTANTS.INCREMENT_PRODUCT,
				delta: 1,
				id: 'prod1',
				price: '1.20'
			}

			let state = Immutable.Map({
				prod1: Immutable.OrderedMap({
					'1.20': Immutable.Map({'qty': 1, price: '1.20'})
				})
			})

			let expectedState = Immutable.Map({
				prod1: Immutable.OrderedMap({
					'1.20': Immutable.Map({'qty': 2, price: '1.20'})
				})
			})

			expect(Immutable.is(productReducer.userChoices(state, action), expectedState)).toBe(true)
		})

		it('should handle incrementing a product which is already added to the basket at a different price', () => {
			let action = {
				type: CONSTANTS.INCREMENT_PRODUCT,
				delta: 1,
				id: 'prod1',
				price: '15.00'
			}

			let state = Immutable.Map({
				prod1: Immutable.OrderedMap({
					'1.20': Immutable.Map({'qty': 1, price: '1.20'})
				})
			})

			let expectedState = Immutable.Map({
				prod1: Immutable.OrderedMap({
					'1.20': Immutable.Map({'qty': 1, price: '1.20'}),
					'15.00': Immutable.Map({'qty': 1, price: '15.00'})
				})
			})

			expect(Immutable.is(productReducer.userChoices(state, action), expectedState)).toBe(true)
		})

		it('should handle decrementing a product which is already added to the basket once', () => {
			let action = {
				type: CONSTANTS.DECREMENT_PRODUCT,
				delta: -1,
				id: 'prod1',
				price: '15.00'
			}

			let state = Immutable.Map({
				prod1: Immutable.OrderedMap({
					'1.20': Immutable.Map({'qty': 1, price: '1.20'}),
					'15.00': Immutable.Map({'qty': 1, price: '15.00'})
				})
			})

			let expectedState = Immutable.Map({
				prod1: Immutable.OrderedMap({
					'1.20': Immutable.Map({'qty': 1, price: '1.20'})
				})
			})

			expect(Immutable.is(productReducer.userChoices(state, action), expectedState)).toBe(true)
		})

		it('should handle decrementing a product which is already added to the basket more than once', () => {
			let action = {
				type: CONSTANTS.DECREMENT_PRODUCT,
				delta: -1,
				id: 'prod1',
				price: '15.00'
			}

			let state = Immutable.Map({
				prod1: Immutable.OrderedMap({
					'1.20': Immutable.Map({'qty': 1, price: '1.20'}),
					'15.00': Immutable.Map({'qty': 3, price: '15.00'})
				})
			})

			let expectedState = Immutable.Map({
				prod1: Immutable.OrderedMap({
					'1.20': Immutable.Map({'qty': 1, price: '1.20'}),
					'15.00': Immutable.Map({'qty': 2, price: '15.00'})
				})
			})

			expect(Immutable.is(productReducer.userChoices(state, action), expectedState)).toBe(true)
		})
	})

	describe('productDetailsId', () => {
		it('should handle initial state', () => {
			expect(productReducer.productDetailsId(undefined, {})).toEqual('')
		})

		it('should handle unknown actions', () => {
			expect(productReducer.productDetailsId('prod-1', { type: 'unknown' })).toEqual('prod-1')
		})

		it('should return id on-show', () => {
			let action = {
				type: CONSTANTS.PRODUCT_DETAILS_SHOW,
				id: 'prod-1'
			}

			expect(productReducer.productDetailsId({}, action)).toEqual('prod-1')
		})

		it('should return empty string on-hide', () => {
			let action = {
				type: CONSTANTS.PRODUCT_DETAILS_HIDE,
				id: 'prod-1'
			}

			expect(productReducer.productDetailsId('prod-1', action)).toEqual('')
		})
	})
	describe('initialUserChoices', () => {
		it('should handle initial state', () => {
			expect(productReducer.initialUserChoices(undefined, {})).toEqual(Immutable.Map({}))
		})
		it('should handle unknown actions', () => {
			expect(productReducer.initialUserChoices({'prod-1': {qty: 1}}, { type: 'unknown' })).toEqual({'prod-1': {qty: 1}})
		})
	})
})
