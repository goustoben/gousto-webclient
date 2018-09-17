import React from 'react'
import { shallow, mount } from 'enzyme'

import Contact from 'routes/GetHelp/Contact/Contact'

describe('<Contact />', () => {
	const content = {
		title: 'test title',
		body: 'text...',
		button1Copy: 'Back',
		button2Copy: 'Done'
	}
	const contactChannels = [
		{ slug: 'email', name: 'Contact us by email', url: '/test', clientRouted: false },
	]

	let wrapper
	let GetHelpLayout

	beforeEach(() => {
		wrapper = shallow(
			<Contact
				content={content}
				contactChannels={contactChannels}
			/>
		)
		GetHelpLayout = wrapper.find('GetHelpLayout')
	})

	test('layout is rendering correctly', () => {
		const BottomBar = GetHelpLayout.find('BottomBar')

		expect(GetHelpLayout).toHaveLength(1)
		expect(BottomBar).toHaveLength(1)
		expect(BottomBar.find('BottomButton')).toHaveLength(2)

	})

	test('header is rendering correctly', () => {
		expect(GetHelpLayout.prop('title')).toBe(content.title)
	})

	test('body description is redering correctly', () => {
		expect(GetHelpLayout.prop('body')).toBe(content.body)
	})

	test('items are rendered correctly', () => {
		wrapper = mount(
			<Contact
				content={content}
				contactChannels={contactChannels}
			/>
		)
		const items = wrapper.find('Item')

		expect(items).toHaveLength(1)
		expect(items.at(0).text()).toBe('Contact us by email')
		expect(items.at(0).prop('to')).toBe('/test')
	})

	test('items are rendered correctly', () => {
		const selectContactChannelSpy = jest.fn()
		wrapper = mount(
			<Contact
				content={content}
				contactChannels={contactChannels}
				selectContactChannel={selectContactChannelSpy}
			/>
		)
		const items = wrapper.find('Item')
		items.at(0).simulate('click')

		expect(selectContactChannelSpy).toHaveBeenCalledTimes(1)
		expect(selectContactChannelSpy).toHaveBeenCalledWith('email')
	})

	test('bottom bar buttons is rendering correctly', () => {
		const BottomBar = GetHelpLayout.find('BottomBar')
		const Button1 = BottomBar.find('BottomButton').at(0)
		const Button2 = BottomBar.find('BottomButton').at(1)

		expect(Button1.contains(content.button1Copy)).toBe(true)
		expect(Button2.contains(content.button2Copy)).toBe(true)
	})
})
