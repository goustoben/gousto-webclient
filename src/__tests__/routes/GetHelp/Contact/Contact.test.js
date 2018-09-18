import React from 'react'
import { mount } from 'enzyme'

import { zendesk } from 'config/routes'

import Contact from 'routes/GetHelp/Contact/Contact'

describe('<Contact />', () => {
	const content = {
		title: 'test title',
		body: 'text...',
		button1Copy: 'Back',
		button2Copy: 'Done',
		chatItem: 'test chatItem',
		emailItem: 'test emailItem',
		phoneItem: 'test phoneItem',
	}

	let wrapper
	let getHelpLayout

	beforeEach(() => {
		wrapper = mount(
			<Contact content={content} />
		)
		getHelpLayout = wrapper.find('GetHelpLayout')
	})

	test('layout is rendering correctly', () => {
		const BottomBar = getHelpLayout.find('BottomBar')

		expect(getHelpLayout).toHaveLength(1)
		expect(BottomBar).toHaveLength(1)
		expect(BottomBar.find('BottomButton')).toHaveLength(2)

	})

	test('header is rendering correctly', () => {
		expect(getHelpLayout.prop('title')).toBe(content.title)
	})

	test('body description is redering correctly', () => {
		expect(getHelpLayout.prop('body')).toBe(content.body)
	})

	test('bottom bar buttons is rendering correctly', () => {
		const BottomBar = getHelpLayout.find('BottomBar')
		const Button1 = BottomBar.find('BottomButton').at(0)
		const Button2 = BottomBar.find('BottomButton').at(1)

		expect(Button1.text()).toContain(content.button1Copy)
		expect(Button2.text()).toContain(content.button2Copy)
	})

	describe('items', () => {
		test('items are rendered', () => {
			const items = wrapper.find('Item')

			expect(items).toHaveLength(3)
			expect(items.at(0).text()).toContain('test chatItem')
			expect(items.at(1).text()).toContain('test emailItem')
			expect(items.at(2).text()).toContain('test phoneItem')
		})

		test('live chat opens the chat when clicked', () => {
			const openLiveChatSpy = jest.fn()
			const chatItem = wrapper.find('Item').at(0).find('ItemExecutable')
			window.$zopim = {
				livechat: {
					window: {
						show: openLiveChatSpy,
					},
				},
			}
			chatItem.simulate('click')

			expect(openLiveChatSpy).toHaveBeenCalledTimes(1)
		})

		test('email points to zendesk', () => {
			const linkTo = wrapper.find('Item').at(1).find('a').prop('href')

			expect(linkTo).toContain(zendesk.link)
		})
	})
})
