import React from 'react'
import TestedLoved from 'routes/Home/TestedLoved/TestedLoved'
import { shallow } from 'enzyme'

describe('TestedLoved', () => {
	let wrapper

	beforeEach(() => {
		wrapper = shallow(<TestedLoved />)
	})

	test('should render a div', () => {
		expect(wrapper.type()).toBe('div')
	})
})
