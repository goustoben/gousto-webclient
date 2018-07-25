import React from 'react'
import { shallow } from 'enzyme'

import Control from 'Button/Control'

describe('Button Control', () => {
	test('should return a <span>', () => {
		const wrapper = shallow(<Control />)

		expect(wrapper.type()).toEqual('span')
	})

	test('should render children', () => {
		const node = <div>child content</div>
		const wrapper = shallow(<Control>{node}</Control>)

		expect(wrapper.contains(node)).toEqual(true)
	})
})
