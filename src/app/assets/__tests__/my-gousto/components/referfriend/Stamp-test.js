

const React = require('react')
const Enzyme = require('enzyme')

let shallowRenderer

const Stamp = require('../../../../js/my-gousto/components/referfriend/Stamp')

describe('Stamp', function() {
	beforeEach(function() {
		shallowRenderer = Enzyme.shallow
	})
	it('should return a <div>', function() {
		const result = shallowRenderer(<Stamp />)


		expect(result.type()).toBe('div')
	})
	it('should have a child of <div.stamp-badge/>', function() {
		const result = shallowRenderer(<Stamp />)


		expect(result.find('.stamp-badge').length).toEqual(1)
	})
	it('should have a child of <p.stamp-text/>', function() {
		const result = shallowRenderer(<Stamp />)


		expect(result.find('.stamp-text').length).toEqual(1)
	})
	it('should have a child of <p.stamp-number/>', function() {
		const result = shallowRenderer(<Stamp />)


		expect(result.find('.stamp-number').length).toEqual(1)
	})
	it('should have a child of <svg.stamp-svg/>', function() {
		const result = shallowRenderer(<Stamp />)


		expect(result.find('.stamp-svg').length).toEqual(1)
	})
})
