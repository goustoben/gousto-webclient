import React from 'react'
import { mount } from 'enzyme'

import { zendesk } from 'config/routes'
import { telephone } from 'config/company'

import { Item, ItemExpandable } from 'goustouicomponents'
import { ItemLink } from 'routes/GetHelp/components/ItemLink'
import itemCSS from 'routes/GetHelp/components/Item/Item.css'
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

	describe('render', () => {
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

		test('items are rendered', () => {
			const items = wrapper.find(Item)

			expect(items).toHaveLength(3)
			expect(items.at(0).text()).toContain('test chatItem')
			expect(items.at(1).text()).toContain('test emailItem')
			expect(items.at(2).text()).toContain('test phoneItem')
		})

		test('bottom bar buttons is rendering correctly', () => {
			const BottomBar = getHelpLayout.find('BottomBar')
			const Button1 = BottomBar.find('BottomButton').at(0)
			const Button2 = BottomBar.find('BottomButton').at(1)

			expect(Button1.text()).toContain(content.button1Copy)
			expect(Button2.text()).toContain(content.button2Copy)
		})

		test('email link points to zendesk', () => {
			const linkTo = wrapper.find(ItemLink).find('a').prop('href')

			expect(linkTo).toContain(zendesk.link)
		})
	})

	describe('behaviour', () => {
		test('live chat opens the chat when clicked', () => {
			const openLiveChatSpy = jest.fn()
			const chatItemContent = wrapper.find(Item).at(0).find(`.${itemCSS.itemContent}`)
			window.$zopim = {
				livechat: {
					window: {
						show: openLiveChatSpy,
					},
				},
			}
			chatItemContent.simulate('click')

			expect(openLiveChatSpy).toHaveBeenCalledTimes(1)
		})

		test('phone number is shown when phone item is clicked', () => {
			const phoneItem = wrapper.find(ItemExpandable)
			phoneItem.simulate('click')

			expect(phoneItem.text()).toContain(telephone.number)
		})
	})
})
