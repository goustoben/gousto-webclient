

let React = require('react')

let Enzyme = require('enzyme')
let shallowRenderer

let CategoryItem = require('../../../js/products/components/category/CategoryItem')

describe('ProductCategoryItem', function() {
	beforeEach(function() {
		shallowRenderer = Enzyme.shallow
	})

	it('should return a <li> for desktop', function() {
		const result = shallowRenderer(<CategoryItem view='desktop' />)

		expect(result.type()).toBe('li')
	})

	it('should return an <option> for desktop', function() {
		const result = shallowRenderer(<CategoryItem view='mobile' />)

		expect(result.type()).toBe('option')
	})

	it('on desktop add "selected" class if selected', function() {
		const result = shallowRenderer(<CategoryItem view='desktop' selected={true} />)

		expect(result.find('.selected').length).toEqual(1)
	})
})
