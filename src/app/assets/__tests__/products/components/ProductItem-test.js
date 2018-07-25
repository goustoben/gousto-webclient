

let React = require('react')

let Enzyme = require('enzyme')
let shallowRenderer

let ProductBasket = require('../../../js/products/components/product/ProductBasket')
let ProductItem = require('../../../js/products/components/product/ProductItem')

describe('ProductItem', function() {
	beforeEach(function() {
		shallowRenderer = Enzyme.shallow
	})

	it('should return a <div>', function() {
		const result = shallowRenderer(<ProductItem images={{'365': {url: ''}}} />)


		expect(result.type()).toBe('div')
	})

	it('should have ProductBasket child component', function() {
		const result = shallowRenderer(<ProductItem images={{'365': {url: ''}}} />)


		expect(result.find(ProductBasket).length).toEqual(1)
	})

	it('should show low stock indicator when stock is low', function() {
		const result = shallowRenderer(<ProductItem lowStock={true} images={{'365': {url: ''}}} />)


		expect(result.find('.low-stock').length).toEqual(1)
	})

	it('should NOT show low stock indicator when stock is NOT low', function() {
		const result = shallowRenderer(<ProductItem lowStock={false} images={{'365': {url: ''}}} />)


		expect(result.find('.low-stock').length).toEqual(0)
	})

	it('should show new indicator when isNew is true', function() {
		const result = shallowRenderer(<ProductItem isNew={true} images={{'365': {url: ''}}} />)


		expect(result.find('.icon-new-box').length).toEqual(1)
	})

	it('should NOT show new indicator when isNew is false', function() {
		const result = shallowRenderer(<ProductItem isNew={false} images={{'365': {url: ''}}} />)


		expect(result.find('.icon-new-box').length).toEqual(0)
	})
})
