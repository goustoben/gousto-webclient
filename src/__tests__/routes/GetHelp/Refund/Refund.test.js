import React from 'react'
import { mount } from 'enzyme'
import { client as routes } from 'config/routes'

jest.mock('utils/fetch')
import fetch from 'utils/fetch'

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
		fetch.mockImplementation(() => Promise.resolve({
			data: { refundValue: 7.77 }
		}))
		wrapper =  mount(
			<Refund
				content={content}
			/>
		)
		getHelpLayout = wrapper.find('GetHelpLayout')

		test('layout is rendering correctly', () => {
			const BottomBar = getHelpLayout.find('BottomBar')

			expect(getHelpLayout).toHaveLength(1)
			expect(getHelpLayout.prop('body')).toContain('We would like to offer you £7.77')
			expect(BottomBar).toHaveLength(1)
			expect(BottomBar.find('BottomButton')).toHaveLength(2)
		})

		test('header is rendering correctly', () => {
			expect(getHelpLayout.prop('title')).toBe(content.title)
		})

		test('bottom bar buttons are rendering correctly', () => {
			const BottomBar = getHelpLayout.find('BottomBar')
			const Button1 = BottomBar.find('BottomButton').at(0)
			const Button2 = BottomBar.find('BottomButton').at(1)
			const { index, contact, confirmation } = routes.getHelp

			expect(Button1.text()).toBe('button1 copy')
			expect(Button2.text()).toBe('button2 £7.77 copy')

			expect(Button1.prop('url')).toContain(`${index}/${contact}`)
			expect(Button2.prop('url')).toContain(`${index}/${confirmation}`)
		})
	})

	describe('behaviour', () => {
		test('refund data is fetched', () => {
			wrapper =  mount(
				<Refund
					content={content}
				/>
			)

			expect(fetch.mock.calls[0][0]).toBe(null)
			expect(fetch.mock.calls[0][1]).toContain('/ssr/v1/ssr')
			expect(fetch.mock.calls[0][2]).toBe(null)
			expect(fetch.mock.calls[0][3]).toBe('GET')
		})

		test('error message is shown when fetching data errors and accept button hides', () => {
			fetch.mockImplementation(() => { throw new Error('error') })
			wrapper =  mount(
				<Refund
					content={content}
				/>
			)
			getHelpLayout = wrapper.find('GetHelpLayout')
			const wrapperText = wrapper.text()

			expect(getHelpLayout.prop('body')).toBe('')
			expect(wrapperText).toContain('Error body')
			expect(wrapperText).not.toContain('button2')
		})
	})
})
