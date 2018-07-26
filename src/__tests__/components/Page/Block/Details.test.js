import React from 'react'
import { shallow } from 'enzyme'

import sinon from 'sinon'

import Details from 'Page/Block/Details'
import { Div } from 'Page/Elements'

describe('Page Block Details', () => {
	let wrapper

	describe('rendering', () => {
		test('should return a <Div>', () => {
			wrapper = shallow(<Details />)
			expect(wrapper.type()).toBe(Div)
		})

		test('should render children', () => {
			wrapper = shallow(
				<Details>
					<p />
					<p />
				</Details>,
			)
			expect(wrapper.find('p')).toHaveLength(2)
		})
	})
})
