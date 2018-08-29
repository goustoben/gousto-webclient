import React from 'react'
import { shallow } from 'enzyme'

import Link from 'Link'
import { Item } from 'routes/GetHelp/OrderIssue/List/Item'


describe('<Item />', () => {
	const categories = [{ name: 'test', url: '/test' }]

	test('list item component renders correctly', () => {
		const category = categories[0]

		const wrapper = shallow(
			<Item label={category.name} to={category.url} />
		)

		expect(wrapper.find('li')).toHaveLength(1)
		expect(wrapper.find(Link)).toHaveLength(1)

		expect(wrapper.find(Link).prop('to')).toBe('/test')
	})
})