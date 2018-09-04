import React from 'react'
import { shallow } from 'enzyme'

import Contact from 'routes/GetHelp/Contact/Contact'

describe('<Contact />', () => {
	const content = { title: 'test title', body: 'text...' }

	let wrapper

	beforeEach(() => {
		wrapper =  shallow(
			<Contact
				content={content}
			/>
		)
	})

	test('header is rendering correctly', () => {
		const pageHeader = wrapper.find('PageHeader')

		expect(pageHeader).toHaveLength(1)
		expect(pageHeader.prop('title')).toBe('test title')
	})

	test('content is redering correctly', () => {
		const pageContent = wrapper.find('PageContent')

		expect(pageContent).toHaveLength(1)
		expect(pageContent.contains(content.body)).toBe(true)
	})

	test('bottom bar is rendering correctly', () => {
		const bottomBar = wrapper.find('BottomBar')
		const buttons = wrapper.find('Button')

		expect(bottomBar).toHaveLength(1)
		expect(buttons).toHaveLength(2)
	})
})
