import React from 'react'
import { shallow } from 'enzyme'

import FilterItem from 'routes/Menu/FilterMenu/FilterItem'

describe('<FilterItem />', () => {
	let wrapper

	test('should display its children within a label', () => {
		const Node = () => <div>A Test Node</div>
		wrapper = shallow(<FilterItem><Node /></FilterItem>)

		expect(wrapper.find('label').first().children()
			.matchesElement(<Node />)).toEqual(true)
	})

	describe('checked prop', () => {
		test('should have a check style applied when checked ', () => {
			wrapper = shallow(<FilterItem checked />)
			expect(wrapper.find('.checked')).toHaveLength(1)

			wrapper = shallow(<FilterItem />)
			expect(wrapper.find('.checked')).toHaveLength(0)
		})
	})
})
