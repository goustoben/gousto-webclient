import React from 'react'

import { shallow } from 'enzyme'

import Info from 'Recipe/Info'

describe('Info', () => {
	describe('rendering', () => {
		let wrapper
		beforeEach(() => {
			wrapper = shallow(<Info />)
		})

		test('should render a <div> with no props', () => {
			expect(wrapper.type()).toBe('div')
		})

		test('should render children', () => {
			wrapper = shallow(
				<Info>
					<p />
					<p />
				</Info>,
			)
			expect(wrapper.find('p')).toHaveLength(2)
		})
	})
})
