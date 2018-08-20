import React from 'react'
import { shallow } from 'enzyme'

import { PageHeader, PageContent } from 'Page'

import { RefundItemList } from 'routes/Refund/RefundCategories/RefundItemList/RefundItemList'
import RefundCategories from 'routes/Refund/RefundCategories/RefundCategories'

describe('<RefundCategories />', () => {
	const categories = [{ name: 'test', url: '/test' }]
	const content = { title: 'test title', body: 'text...' }

	let wrapper

	beforeEach(() => {
		wrapper =  shallow(
			<RefundCategories
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
		expect(wrapper.find(PageContent).find(RefundItemList)).toHaveLength(1)
		expect(wrapper.find(PageContent).contains(<p>{content.body}</p>)).toBe(true)
	})
})
