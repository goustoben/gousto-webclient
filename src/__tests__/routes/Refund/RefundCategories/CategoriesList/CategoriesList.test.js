import React from 'react'
import { shallow } from 'enzyme'

import Link from 'Link'
import { CategoriesListItem, CategoriesList } from 'routes/Refund/RefundCategories/CategoriesList'

describe('<CategoriesListItem />', () => {
	const categories = [{ name: 'test', url: '/test' }]

	test('list component renders correctly', () => {
		const wrapper = shallow(
			<CategoriesListItem categories={categories} />
		)

		expect(wrapper.find('ul')).toHaveLength(1)
		expect(wrapper.find(CategoriesList)).toHaveLength(1)
	})

	test('list item component renders correctly', () => {
		const category = categories[0]

		const wrapper = shallow(
			<CategoriesList label={category.name} to={category.url} />
		)

		expect(wrapper.find('li')).toHaveLength(1)
		expect(wrapper.find(Link)).toHaveLength(1)

		expect(wrapper.find(Link).prop('to')).toBe('/test')
	})
})
