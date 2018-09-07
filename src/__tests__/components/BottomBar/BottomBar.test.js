import React from 'react'
import { shallow } from 'enzyme'

import BottomBar from 'BottomBar'

describe('<BottomBar />', () => {
	let wrapper
	const TestComponent = () => (
		<div>
			<p>A Test Component</p>
		</div>
	)

	test('it should render by default', () => {
		wrapper = shallow(
			<BottomBar>
				<TestComponent />
			</BottomBar>,
		)

		expect(wrapper.find('div.bottomBar')).toHaveLength(1)
	})

	test('it should render its children', () => {
		wrapper = shallow(
			<BottomBar>
				<TestComponent />
			</BottomBar>,
		)

		expect(wrapper.find(TestComponent)).toHaveLength(1)
	})

	test('it should use the className passed', () => {
		wrapper = shallow(
			<BottomBar className='test-class'>
				<TestComponent />
			</BottomBar>,
		)

		expect(wrapper.find('.bottomBar').hasClass('test-class')).toBe(true)
	})
})
