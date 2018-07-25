

const React = require('react')
const Enzyme = require('enzyme')

let shallowRenderer

const Widget = require('../../js/my-gousto/components/widget/Widget')
const MyGoustoContainer = require('../../js/my-gousto/components/MyGoustoContainer')

describe('MyGoustoContainer', function() {
	beforeEach(function() {
		shallowRenderer = Enzyme.shallow
	})

	it('should return a <div>', function() {
		const result = shallowRenderer(<MyGoustoContainer />)


		expect(result.type()).toBe('div')
	})

	it('should have the right number of <Widget/> components', function() {
		const result = shallowRenderer(<MyGoustoContainer widgetList={['widget1', 'widget2']} />)


		expect(result.find(Widget).length).toEqual(2)
	})

	it('shoud use the default type if none given', function() {
		const result = shallowRenderer(<MyGoustoContainer widgetList={['widget1']} />)


		expect(result.find(Widget).length).toEqual(1)
		expect(result.find(Widget).props().type).toEqual('eggshell')
	})

	it('shoud use type if given', function() {
		let widgetConfig = {
			HEADER: {WIDGET_TYPE: 'HEADER-test-type'}
		}
		const result = shallowRenderer(<MyGoustoContainer widgetList={['header']} widgets={widgetConfig} />)


		expect(result.find(Widget).length).toEqual(1)
		expect(result.find(Widget).props().type).toEqual('HEADER-test-type')
	})
})
