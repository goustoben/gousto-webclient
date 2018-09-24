import React from 'react'
import { mount } from 'enzyme'

import Refund from 'routes/GetHelp/Refund/Refund'

describe('<Refund />', () => {
	const content = {
		title: 'test title',
		infoBody: 'We would like to offer you £{{refundAmount}}',
		confirmationBody: 'Confirmation body',
		errorBody: 'Error body',
		button1: 'button1 copy',
		button2: 'button2 £{{refundAmount}} copy',
	}

	let wrapper
	let getHelpLayout

	describe('rendering', () => {
		beforeEach(() => {
			wrapper =  mount(
				<Refund
					content={content}
				/>
			)
			getHelpLayout = wrapper.find('GetHelpLayout')
		})

		test('layout is rendering correctly', () => {
			const BottomBar = getHelpLayout.find('BottomBar')

			expect(getHelpLayout).toHaveLength(1)
			expect(BottomBar).toHaveLength(1)
			expect(BottomBar.find('BottomButton')).toHaveLength(2)

		})

		test.only('header is rendering correctly', () => {
			expect(getHelpLayout.prop('title')).toBe(content.title)
		})

		test('bottom bar buttons is rendering correctly', () => {
			const BottomBar = getHelpLayout.find('BottomBar')
			const Button1 = BottomBar.find('BottomButton').at(0)
			const Button2 = BottomBar.find('BottomButton').at(1)

			expect(Button1.text()).toBe('button1 copy')
			expect(Button2.text()).toBe('button2 £7.77 copy')
		})
	})

	describe('behaviour', () => {
		test('<Loading/> component is shown while fetching data', () => {
		})

		test('error message is shown when fetching data errors and accept button hides', () => {
		})

		describe('refund amount is fetched', () => {
			test('refund amount is displayed on the body', () => {
				expect(getHelpLayout.prop('body')).toContain('£7.77')
			})

			test('refund amount is displayed on the button', () => {
				expect(getHelpLayout.prop('body')).toContain('£7.77')
			})
		})
	})
})
