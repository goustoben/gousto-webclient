import React from 'react'
import { shallow } from 'enzyme'

import List from 'routes/GetHelp/components/List'


describe('<List />', () => {
	const ChildComponent = () => (<li>Test child</li>)
	const wrapper = shallow(
		<List>
			<ChildComponent/>
			<ChildComponent/>
		</List>
	)

	test('list component renders correctly', () => {
		expect(wrapper.find('ul')).toHaveLength(1)
		expect(wrapper.find(ChildComponent)).toHaveLength(2)
	})
})
