

let categoryReducer = require('../../../js/products/reducers/category')
const Immutable = require('immutable')
const CONFIG = require('@fe/gousto-config')
const CONSTANTS = CONFIG.PRODUCTS

describe('categoryReducer', () => {
	describe('categories', () => {
		it('should handle initial state', () => {
			expect(categoryReducer.categories(undefined, {})).toEqual(Immutable.OrderedMap({}))
		})

		it('should handle unknown actions', () => {
			expect(categoryReducer.categories(Immutable.OrderedMap({'cat-1': {id: 'cat-1'}}), { type: 'unknown' })).toEqual(Immutable.OrderedMap({'cat-1': {id: 'cat-1'}}))
		})

		it('should update categories', () => {
			let action = {
				type: CONSTANTS.LOAD_CATEGORY,
				categories: [
					{id: 'cat-1'},
					{id: 'cat-2'}
				]
			}

			let expectedState = Immutable.OrderedMap({
				'cat-1': Immutable.Map({id: 'cat-1'}),
				'cat-2': Immutable.Map({id: 'cat-2'})
			})

			expect(Immutable.is(categoryReducer.categories(Immutable.OrderedMap({}), action), expectedState)).toBe(true)
		})
	})

	describe('productCount', () => {
		it('should handle initial state', () => {
			expect(categoryReducer.productCount(undefined, {})).toEqual(Immutable.Map({'0': 1}))
		})

		it('should handle unknown actions', () => {
			expect(categoryReducer.productCount(Immutable.Map({'0': 1, 'cat1': 2}), { type: 'unknown' })).toEqual(Immutable.Map({'0': 1, 'cat1': 2}))
		})

		it('should update product count for given categories - ignoring initial state', () => {
			let initialState = Immutable.OrderedMap({
				'cat-1': 0,
				'cat-2': 4
			})

			let action = {
				type: CONSTANTS.LOAD_PRODUCT_COUNT,
				products: [
					{id: 'prod-1', 'categories': [{id: 'cat-1'}, {id: 'cat-2'}]},
					{id: 'prod-2', 'categories': [{id: 'cat-1'}]}
				],
				stock: {
					'prod-1': 10000,
					'prod-2': 10000
				}
			}

			let expectedState = Immutable.Map({
				'0': 1,
				'cat-1': 2,
				'cat-2': 1
			})

			expect(Immutable.is(categoryReducer.productCount(initialState, action), expectedState)).toBe(true)
		})

		it('should update product count only for products with stock', () => {
			let initialState = Immutable.OrderedMap({})

			let action = {
				type: CONSTANTS.LOAD_PRODUCT_COUNT,
				products: [
					{id: 'prod-1', 'categories': [{id: 'cat-1'}, {id: 'cat-2'}]},
					{id: 'prod-2', 'categories': [{id: 'cat-1'}]}
				],
				stock: {
					'prod-1': 10000,
					'prod-2': 0
				}
			}

			let expectedState = Immutable.Map({
				'0': 1,
				'cat-1': 1,
				'cat-2': 1
			})

			expect(Immutable.is(categoryReducer.productCount(initialState, action), expectedState)).toBe(true)
		})

		it('should update product count for new product category', () => {
			let initialState = Immutable.OrderedMap({
				'cat-2': 4
			})

			let action = {
				type: CONSTANTS.LOAD_PRODUCT_COUNT,
				products: [
					{id: 'prod-1', 'categories': [{id: 'cat-1'}, {id: 'cat-2'}]},
					{id: 'prod-2', 'categories': [{id: 'cat-1'}]}
				],
				stock: {
					'prod-1': 10000,
					'prod-2': 10000
				}
			}

			let expectedState = Immutable.Map({
				'0': 1,
				'cat-1': 2,
				'cat-2': 1
			})

			expect(Immutable.is(categoryReducer.productCount(initialState, action), expectedState)).toBe(true)
		})

		it('should update product count for new product category where products is Immutable Map', () => {
			let initialState = Immutable.OrderedMap({
				'cat-2': 4
			})

			let action = {
				type: CONSTANTS.LOAD_PRODUCT_COUNT,
				products: Immutable.Map({
					'prod-1': Immutable.Map({id:'prod-1', 'categories': [{id: 'cat-1'}, {id: 'cat-2'}]}),
					'prod-2': Immutable.Map({id:'prod-2', 'categories': [{id: 'cat-1'}]})
				}),
				stock: {
					'prod-1': 10000,
					'prod-2': 10000
				}
			}

			let expectedState = Immutable.Map({
				'0': 1,
				'cat-1': 2,
				'cat-2': 1
			})

			expect(Immutable.is(categoryReducer.productCount(initialState, action), expectedState)).toBe(true)
		})

		it('should update product count for new product category where stock is Immutable Map', () => {
			let initialState = Immutable.OrderedMap({
				'cat-2': 4
			})

			let action = {
				type: CONSTANTS.LOAD_PRODUCT_COUNT,
				products: [
					{id: 'prod-1', 'categories': [{id: 'cat-1'}, {id: 'cat-2'}]},
					{id: 'prod-2', 'categories': [{id: 'cat-1'}]}
				],
				stock: Immutable.Map({
					'prod-1': 10000,
					'prod-2': 10000
				})
			}

			let expectedState = Immutable.Map({
				'0': 1,
				'cat-1': 2,
				'cat-2': 1
			})

			expect(Immutable.is(categoryReducer.productCount(initialState, action), expectedState)).toBe(true)
		})
	})

	describe('selectedCategoryId', () => {
		it('should handle initial state', () => {
			expect(categoryReducer.selectedCategoryId(undefined, {})).toEqual('0')
		})

		it('should handle unknown actions', () => {
			expect(categoryReducer.selectedCategoryId('cat-1', { type: 'unknown' })).toEqual('cat-1')
		})

		it('should update selected category', () => {
			let action = {
				type: CONSTANTS.SELECT_CATEGORY,
				id: 'cat-1'
			}

			expect(categoryReducer.selectedCategoryId('0', action)).toEqual('cat-1')
		})
	})

})
