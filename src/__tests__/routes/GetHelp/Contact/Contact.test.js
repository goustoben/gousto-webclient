import React from 'react'
import { shallow } from 'enzyme'

import Contact from 'routes/GetHelp/Contact/Contact'

describe('<Contact />', () => {
	const content = {
		title: 'test title',
		body: 'text...',
		button1Copy: 'Back',
		button2Copy: 'Done'
	}

	let wrapper
	let GetHelpLayout

	beforeEach(() => {
		wrapper =  shallow(
			<Contact
				content={content}
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

	test('bottom bar buttons is rendering correctly', () => {
		const BottomBar = GetHelpLayout.find('BottomBar')

		expect(BottomBar.find('BottomButton').at(0).contains(content.button1Copy)).toBe(true)
		expect(BottomBar.find('BottomButton').at(1).contains(content.button2Copy)).toBe(true)
	})
})
