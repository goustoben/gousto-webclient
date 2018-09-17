import React from 'react'
import { shallow, mount } from 'enzyme'

import OrderIssue from 'routes/GetHelp/OrderIssue/OrderIssue'

describe('<OrderIssue />', () => {
	const orderIssues = [{ slug: 'test-slug', name: 'test-name', url: '/test' }]
	const content = { title: 'test title', body: 'text...', buttonCopy: 'Back' }

	let wrapper
	let GetHelpLayout

	beforeEach(() => {
		wrapper =  shallow(
			<OrderIssue
				content={content}
				orderIssues={orderIssues}
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

	test('items are rendered correctly', () => {
		wrapper = mount(
			<OrderIssue
				content={content}
				orderIssues={orderIssues}
			/>
		)
		const items = wrapper.find('Item')

		expect(items).toHaveLength(1)
		expect(items.at(0).text()).toBe('test-name')
		expect(items.at(0).prop('to')).toBe('/test')
	})

	test('items are rendered correctly', () => {
		const selectOrderIssueSpy = jest.fn()
		wrapper = mount(
			<OrderIssue
				content={content}
				orderIssues={orderIssues}
				selectOrderIssue={selectOrderIssueSpy}
			/>
		)
		const items = wrapper.find('Item')
		items.at(0).simulate('click')

		expect(selectOrderIssueSpy).toHaveBeenCalledTimes(1)
		expect(selectOrderIssueSpy).toHaveBeenCalledWith('test-slug')
	})

	test('bottom bar buttons is rendering correctly', () => {
		const BottomBar = GetHelpLayout.find('BottomBar')
		const Button1 = BottomBar.find('BottomButton').at(0)

		expect(Button1.contains(content.buttonCopy)).toBe(true)
	})
})
