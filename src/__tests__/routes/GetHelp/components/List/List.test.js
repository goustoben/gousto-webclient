import React from 'react'
import { mount } from 'enzyme'

import List from 'routes/GetHelp/components/List'


describe('<List />', () => {
	const ChildComponent = () => (<div>Test child</div>)
	const wrapper = mount(
		<List>
			<ChildComponent isHiddenOnMobile={false} />
			<ChildComponent isHiddenOnMobile />
		</List>
	)

	test('list component renders correctly', () => {
		expect(wrapper.find('ul')).toHaveLength(1)
		expect(wrapper.find('li')).toHaveLength(2)
		expect(wrapper.find(ChildComponent)).toHaveLength(2)
	})

	test('children hiddenOnMobile prop is being used', () => {
		expect(wrapper.find('li').at(0).hasClass('hiddenOnMobile')).toBe(false)
		expect(wrapper.find('li').at(1).hasClass('hiddenOnMobile')).toBe(true)
	})
})
