

const React = require('react')
const Enzyme = require('enzyme')

let shallowRenderer

let ProductBasket = require('../../../js/products/components/product/ProductBasket')

describe('ProductBasket', function() {
	beforeEach(function() {
		shallowRenderer = Enzyme.shallow
	})

	it('should return a <div>', function() {
		const result = shallowRenderer(<ProductBasket />)

		expect(result.type()).toBe('div')
	})

	it('should return "Add" when 0 in basket in grid view', function() {
		let testData = {
			qty: 0,
			context: 'grid'
		}

		const result = shallowRenderer(<ProductBasket {...testData} />)
		let qtyDiv = result.find('.qty')
		let qtyDivChildren = qtyDiv.children()

		expect(qtyDiv.type()).toBe('div')
		expect(qtyDivChildren.length).toEqual(1)
		expect(qtyDivChildren.children().type()).toEqual('span')
		expect(qtyDivChildren.children().children().node).toEqual('Add')
	})

	it('should return "Add to box" when 0 in basket in detail view', function() {
		let testData = {
			qty: 0,
			context: 'details'
		}

		const result = shallowRenderer(<ProductBasket {...testData} />)
		let qtyDiv = result.find('.qty')
		let qtyDivChildren = qtyDiv.children()

		expect(qtyDiv.type()).toBe('div')
		expect(qtyDivChildren.length).toEqual(1)
		expect(qtyDivChildren.children().type()).toEqual('span')
		expect(qtyDivChildren.children().children().node).toEqual('Add to box')
	})

	it('should return 3 nodes -/<qty>/+ when more than one in basket', function() {
		let testData = {
			qty: 2
		}

		const result = shallowRenderer(<ProductBasket {...testData} />)
		let qtyDiv = result.find('.qty')

		expect(result.type()).toBe('div')
		expect(qtyDiv.children().length).toEqual(3)
	})
})
