import React from 'react'
import { shallow } from 'enzyme'

import { PageHeader, PageContent } from 'Page'

import List from 'routes/GetHelp/OrderIssue/List'
import OrderIssue from 'routes/GetHelp/OrderIssue/OrderIssue'

describe('<OrderIssue />', () => {
	const categories = [{ name: 'test', url: '/test' }]
	const content = { title: 'test title', body: 'text...' }

	let wrapper

	beforeEach(() => {
		wrapper =  shallow(
			<OrderIssue
				content={content}
				categories={categories}
			/>
		)
	})

	test('header is rendering correctly', () => {
		expect(wrapper.find(PageHeader)).toHaveLength(1)
		expect(wrapper.find(PageHeader).prop('title')).toBe('test title')
	})

	test('content is redering correctly', () => {
		expect(wrapper.find(PageContent)).toHaveLength(1)
		expect(wrapper.find(PageContent).find(List)).toHaveLength(1)
		expect(wrapper.find(PageContent).contains(content.body)).toBe(true)
	})
})
