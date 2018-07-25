

const React = require('react')
const Enzyme = require('enzyme')
const Immutable = require('immutable')

const moment = require('moment')

let shallowRenderer

const ProductList = require('../../../js/products/components/product/ProductList')
const ProductItem = require('../../../js/products/components/product/ProductItem')

describe('ProductList', function() {
	beforeEach(function() {
		shallowRenderer = Enzyme.shallow
	})

	it('should return a <div>', function() {
		let products = Immutable.Map({})

		const result = shallowRenderer(<ProductList products={products} />)


		expect(result.type()).toBe('div')
	})

	it('should only show products which belong to the selected category', function() {
		let products = Immutable.OrderedMap({
			'prod-1': Immutable.Map({
				id: 'prod-1',
				categories: [
					{'id': 'cat-1'},
					{'id': 'cat-2'}
				],
				is_for_sale: true
			}),
			'prod-2': Immutable.Map({
				id: 'prod-2',
				categories: [
					{'id': 'cat-1'},
					{'id': 'cat-3'}
				],
				is_for_sale: true
			}),
			'prod-3': Immutable.Map({
				id: 'prod-3',
				categories: [
					{'id': 'cat-2'},
					{'id': 'cat-3'}
				],
				is_for_sale: true
			})
		})

		let stock = Immutable.Map({
			'prod-1': 10,
			'prod-2': 10,
			'prod-3': 10
		})

		const result = shallowRenderer(<ProductList stock={stock} products={products} selectedCategory='cat-1' userChoices={Immutable.Map({})} />)


		expect(result.find(ProductItem).length).toEqual(2)
	})

	it('should only show products which belong to the selected category and is_for_sale is true or already have saved choices', function() {
		let products = Immutable.OrderedMap({
			'prod-1': Immutable.Map({
				id: 'prod-1',
				categories: [
					{'id': 'cat-1'}
				],
				is_for_sale: true
			}),
			'prod-2': Immutable.Map({
				id: 'prod-2',
				categories: [
					{'id': 'cat-1'}
				],
				is_for_sale: true
			}),
			'prod-3': Immutable.Map({
				id: 'prod-3',
				categories: [
					{'id': 'cat-1'}
				],
				is_for_sale: false
			}),
			'prod-4': Immutable.Map({
				id: 'prod-4',
				categories: [
					{'id': 'cat-1'}
				],
				is_for_sale: false
			})
		})

		let stock = Immutable.Map({
			'prod-1': 10,
			'prod-2': 10,
			'prod-3': 10,
			'prod-4': 10
		})

		let choices = Immutable.OrderedMap({}).setIn(['prod-1', '1.00'], Immutable.Map({qty: 5, price: '1.00'})).setIn(['prod-3', '1.00'], Immutable.Map({qty: 5, price: '1.00'}))

		const result = shallowRenderer(<ProductList stock={stock} products={products} selectedCategory='cat-1' userChoices={choices} />).childAt(0)

		expect(result.childAt(0).props().id).toEqual('prod-1')
		expect(result.childAt(1).props().id).toEqual('prod-2')
		expect(result.childAt(2).props().id).toEqual('prod-3')
		expect(result.find(ProductItem).length).toEqual(3)
	})

	it('should pass on appropriate defalults for quantity and low stock and is new', function() {
		let products = Immutable.OrderedMap({
			'prod-1': Immutable.Map({
				id: 'prod-1',
				categories: [
					{'id': 'cat-1'},
					{'id': 'cat-2'}
				],
				is_for_sale: true
			})
		})

		let stock = Immutable.Map({
			'prod-1': 1000
		})

		const result = shallowRenderer(<ProductList stock={stock} products={products} selectedCategory='cat-1' userChoices={Immutable.Map({})} />)

		let productItem = result.childAt(0).childAt(0).props()

		expect(productItem.isNew).toBe(false)
		expect(productItem.lowStock).toBe(false)
		expect(productItem.qty).toEqual(0)
	})

	it('should pass on qty based on current user choices', function() {
		let products = Immutable.OrderedMap({
			'prod-1': Immutable.Map({
				id: 'prod-1',
				categories: [
					{'id': 'cat-1'},
					{'id': 'cat-2'}
				],
				is_for_sale: true
			})
		})

		let stock = Immutable.Map({
			'prod-1': 10
		})

		let choices = Immutable.OrderedMap({}).setIn(['prod-1', '1.00'], Immutable.Map({qty: 5, price: '1.00'}))

		const result = shallowRenderer(<ProductList stock={stock} products={products} selectedCategory='cat-1' userChoices={choices} />)

		let productItem = result.childAt(0).childAt(0).props()

		expect(productItem.qty).toEqual(5)
	})

	it('should pass on low qty when stock level is lower than treshold', function() {
		let products = Immutable.OrderedMap({
			'prod-1': Immutable.Map({
				id: 'prod-1',
				categories: [
					{'id': 'cat-1'},
					{'id': 'cat-2'}
				],
				is_for_sale: true
			})
		})

		let stock = Immutable.Map({
			'prod-1': 1
		})

		const result = shallowRenderer(<ProductList stock={stock} products={products} selectedCategory='cat-1' userChoices={Immutable.Map({})} limitReached={Immutable.Map({})} />)

		let productItem = result.childAt(0).childAt(0).props()

		expect(productItem.lowStock).toBe(true)
	})

	it('should pass on isnew product is true is the created_at is recent added', function() {
		let products = Immutable.OrderedMap({
			'prod-1': Immutable.Map({
				id: 'prod-1',
				categories: [
					{'id': 'cat-1'},
					{'id': 'cat-2'}
				],
				is_for_sale: true,
				created_at: moment().toISOString(),
			})
		})

		let stock = Immutable.Map({
			'prod-1': 1
		})

		const result = shallowRenderer(<ProductList stock={stock} products={products} selectedCategory='cat-1' userChoices={Immutable.Map({})} limitReached={Immutable.Map({})} />)

		let productItem = result.childAt(0).childAt(0).props()

		expect(productItem.isNew).toBe(true)
	})

	it('should pass on isnew product is false is the created_at is not recently added', function() {
		let products = Immutable.OrderedMap({
			'prod-1': Immutable.Map({
				id: 'prod-1',
				categories: [
					{'id': 'cat-1'},
					{'id': 'cat-2'}
				],
				is_for_sale: true,
				created_at: moment().subtract({ days: 20 }).toISOString(),
			})
		})

		let stock = Immutable.Map({
			'prod-1': 1
		})

		const result = shallowRenderer(<ProductList stock={stock} products={products} selectedCategory='cat-1' userChoices={Immutable.Map({})} limitReached={Immutable.Map({})} />)

		let productItem = result.childAt(0).childAt(0).props()

		expect(productItem.isNew).toBe(false)
	})
})
