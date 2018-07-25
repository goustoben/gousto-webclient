import Immutable from 'immutable' /* eslint-disable new-cap */

import actionTypes from 'actions/actionTypes'

import productsReducer from 'reducers/products'

describe('products reducer', () => {
	test('should handle initial state', () => {
		const initialState = Immutable.Map({})
		expect(
			Immutable.is(productsReducer.products(undefined, {}), initialState),
		).toEqual(true)
	})

	test('should handle unknown actions', () => {
		const state = Immutable.fromJS({
			1: { id: 1, title: 'product 1' },
			2: { id: 2, title: 'product 2' },
		})
		const result = productsReducer.products(state, { type: 'unknown' })

		expect(Immutable.is(result, state)).toEqual(true)
	})

	describe('PRODUCTS_RECEIVE', () => {
		test('should load products into state', () => {
			const result = productsReducer.products(Immutable.Map({}), {
				type: actionTypes.PRODUCTS_RECEIVE,
				products: [
					{ id: '1', title: 'product 1' },
					{ id: '2', title: 'product 2' },
				],
				cutoffDate: undefined,
			})
			const expectedState = Immutable.Map()
				.set(
					'1',
					Immutable.fromJS({
						id: '1',
						title: 'product 1',
						media: [],
						cutoffDates: [],
					}),
				)
				.set(
					'2',
					Immutable.fromJS({
						id: '2',
						title: 'product 2',
						media: [],
						cutoffDates: [],
					}),
				)

			expect(Immutable.is(result, expectedState)).toEqual(true)
		})

		test('should map images to media for each product', () => {
			const products = [
				{
					id: '1',
					title: 'product 1',
					images: {
						200: { url: 'test-url-1.jpg', width: 200 },
						400: { url: 'test-url-2.jpg', width: 400 },
					},
				},
				{
					id: '2',
					title: 'product 2',
					images: {
						test: { url: 'test-url-3.jpg', width: 600 },
					},
				},
			]

			const result = productsReducer.products(Immutable.Map({}), {
				type: actionTypes.PRODUCTS_RECEIVE,
				products,
				cutoffDate: undefined,
			})
			const expectedState = Immutable.Map()
				.set(
					'1',
					Immutable.fromJS(products[0])
						.set(
							'media',
							Immutable.fromJS([
								{ src: 'test-url-1.jpg', width: 200 },
								{ src: 'test-url-2.jpg', width: 400 },
							]),
						)
						.set('cutoffDates', Immutable.List()),
				)
				.set(
					'2',
					Immutable.fromJS(products[1])
						.set(
							'media',
							Immutable.fromJS([{ src: 'test-url-3.jpg', width: 600 }]),
						)
						.set('cutoffDates', Immutable.List()),
				)

			expect(Immutable.is(result, expectedState)).toEqual(true)
		})

		test('should add action.cutoffDate to product cutoffDates List', () => {
			const initialState = Immutable.fromJS({
				1: {
					id: '1',
					title: 'product 1',
					cutoffDates: ['existing cutoff date'],
				},
			})

			const products = [
				{
					id: '1',
					title: 'product 1',
				},
				{
					id: '2',
					title: 'product 2',
				},
			]

			const result = productsReducer.products(initialState, {
				type: actionTypes.PRODUCTS_RECEIVE,
				products,
				cutoffDate: 'new cutoff date',
			})
			const expectedState = Immutable.Map()
				.set(
					'1',
					Immutable.fromJS(products[0])
						.set('media', Immutable.List())
						.set(
							'cutoffDates',
							Immutable.fromJS(['existing cutoff date', 'new cutoff date']),
						),
				)
				.set(
					'2',
					Immutable.fromJS(products[1])
						.set('media', Immutable.List())
						.set('cutoffDates', Immutable.fromJS(['new cutoff date'])),
				)

			expect(Immutable.is(result, expectedState)).toEqual(true)
		})
	})

	describe('PRODUCTS_RANDOM_RECEIVE', () => {
		test('should load random products into state', () => {
			const action = {
				type: actionTypes.PRODUCTS_RANDOM_RECEIVE,
				products: [{ id: '1' }, { id: '2' }],
			}
			const result = productsReducer.randomProducts(Immutable.List([]), action)
			const expectedState = Immutable.fromJS([{ id: '1' }, { id: '2' }])

			expect(Immutable.is(result, expectedState)).toEqual(true)
		})
	})

	describe('PRODUCT_CATEGORIES_RECEIVE', () => {
		test('should load product categories into state', () => {
			const action = {
				type: actionTypes.PRODUCT_CATEGORIES_RECEIVE,
				categories: [{ id: '1' }, { id: '2' }],
			}
			const result = productsReducer.productsCategories(
				Immutable.Map({}),
				action,
			)
			const expectedState = Immutable.Map()
				.set('1', Immutable.fromJS({ id: '1' }))
				.set('2', Immutable.fromJS({ id: '2' }))

			expect(Immutable.is(result, expectedState)).toEqual(true)
		})
	})

	describe('PRODUCTS_STOCK_CHANGE', () => {
		test('should add or remove product stock from state', () => {
			let action = {
				type: actionTypes.PRODUCTS_STOCK_CHANGE,
				stock: { 1: 1 },
			}
			let initialState = Immutable.fromJS({ 1: 999 })
			let result = productsReducer.productsStock(initialState, action)
			let expectedState = Immutable.Map().set('1', 1000)

			expect(Immutable.is(result, expectedState)).toEqual(true)

			action = {
				type: actionTypes.PRODUCTS_STOCK_CHANGE,
				stock: { 1: -1 },
			}
			initialState = Immutable.fromJS({ 1: 999 })
			result = productsReducer.productsStock(initialState, action)
			expectedState = Immutable.Map().set('1', 998)

			expect(Immutable.is(result, expectedState)).toEqual(true)
		})
	})
})
