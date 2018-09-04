import React from 'react'
import { shallow } from 'enzyme'

import OrderIssue from 'routes/GetHelp/OrderIssue/OrderIssue'

describe('<OrderIssue />', () => {
	const categories = [{ name: 'test', url: '/test' }]
	const content = { title: 'test title', body: 'text...', buttonCopy: 'Back' }

	let wrapper
	let GetHelpLayout

	beforeEach(() => {
		wrapper =  shallow(
			<OrderIssue
				content={content}
				categories={categories}
			/>
		)
		GetHelpLayout = wrapper.find('GetHelpLayout')
	})

	test('layout is rendering correctly', () => {
		const BottomBar = GetHelpLayout.find('BottomBar')

		expect(GetHelpLayout).toHaveLength(1)
		expect(BottomBar).toHaveLength(1)
		expect(BottomBar.find('BottomButton')).toHaveLength(1)

	})

	test('header is rendering correctly', () => {
		expect(GetHelpLayout.prop('title')).toBe(content.title)
	})

	test('body description is redering correctly', () => {
		expect(GetHelpLayout.prop('body')).toBe(content.body)
	})

	test('bottom bar buttons is rendering correctly', () => {
		const BottomBar = GetHelpLayout.find('BottomBar')
		const Button1 = BottomBar.find('BottomButton').at(0)

		expect(Button1.contains(content.buttonCopy)).toBe(true)
	})
})
