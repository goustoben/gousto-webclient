

const React = require('react')
const Enzyme = require('enzyme')

let shallowRenderer

const Widget = require('../../../../js/my-gousto/components/widget/Widget')

describe('Widget', function() {
	beforeEach(function() {
		shallowRenderer = Enzyme.shallow
	})

	it('should return a <div>', function() {
		const result = shallowRenderer(<Widget />)


		expect(result.type()).toBe('div')
	})

	it('should have a class widget--<type>', function() {
		const result = shallowRenderer(<Widget type="test" />)


		expect(result.find('.widget--test').length).toEqual(1)
	})

	it('should show children in a container', function() {
		const result = shallowRenderer(<Widget><p>test</p></Widget>)

		let children = result.children().children()

		expect(children.length).toEqual(1)
		expect(children.children().node).toEqual('test')
	})
})
