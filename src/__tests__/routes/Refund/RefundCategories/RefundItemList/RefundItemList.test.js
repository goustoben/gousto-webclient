import React from 'react'
import { shallow } from 'enzyme'

import Link from 'Link'
import { RefundItem, RefundItemList } from 'routes/Refund/RefundCategories/RefundItemList'

describe('<RefundItemList />', () => {
	const categories = [{ name: 'test', url: '/test' }]

	test('list component renders correctly', () => {
		const wrapper = shallow(
			<RefundItemList categories={categories} />
		)

		expect(wrapper.find('ul')).toHaveLength(1)
		expect(wrapper.find(RefundItem)).toHaveLength(1)
	})

	test('list item component renders correctly', () => {
		const category = categories[0]

		const wrapper = shallow(
			<RefundItem label={category.name} to={category.url} />
		)

		expect(wrapper.find('li')).toHaveLength(1)
		expect(wrapper.find(Link)).toHaveLength(1)

		expect(wrapper.find(Link).prop('to')).toBe('/test')
	})
})
