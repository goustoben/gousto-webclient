import React from 'react'
import { mount } from 'enzyme'
import { client as routes } from 'config/routes'

jest.mock('utils/fetch')
import fetch from 'utils/fetch'

import * as getHelpApi from 'apis/getHelp'

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

	describe('rendering', () => {
		let wrapper
		let getHelpLayout

		beforeAll(() => {
			fetch.mockImplementation(() => Promise.resolve({
				data: { refundValue: 7.77 }
			}))
			wrapper =  mount(
				<Refund
					content={content}
					user={{ id: '0', accessToken: '123' }}
					order={{ id: '0' }}
				/>
			)
			getHelpLayout = wrapper.find('GetHelpLayout')
		})

		test('layout is rendering correctly', () => {
			const BottomBar = getHelpLayout.find('BottomBar')

			expect(getHelpLayout).toHaveLength(1)
			expect(getHelpLayout.prop('body')).toContain('We would like to offer you £7.77')
			expect(BottomBar).toHaveLength(1)
			expect(BottomBar.find('BottomButton')).toHaveLength(1)
			expect(BottomBar.find('BottomBar')).toHaveLength(1)
		})

		test('header is rendering correctly', () => {
			expect(getHelpLayout.prop('title')).toBe(content.title)
		})

		test('bottom bar buttons are rendering correctly', () => {
			const BottomBar = getHelpLayout.find('BottomBar')
			const Button1 = BottomBar.find('BottomButton')
			const Button2 = BottomBar.find('Button').at(1)
			const { index, contact } = routes.getHelp

			expect(Button2.text()).toBe('button2 £7.77 copy')

			expect(Button1.prop('url')).toContain(`${index}/${contact}`)
		})
	})

	describe('behaviour', () => {
		let wrapper
		let getHelpLayout

		beforeAll(() => {
			fetch.mockImplementation(() => Promise.resolve({
				data: { refundValue: 7.77 }
			}))
			wrapper =  mount(
				<Refund
					content={content}
					user={{ id: '0', accessToken: '123' }}
					order={{ id: '0' }}
				/>
			)
			getHelpLayout = wrapper.find('GetHelpLayout')
		})

		test('loading shows while fetching data', async () => {
			let resolver
			fetch.mockImplementation(() => new Promise((resolve) => {
				resolver = resolve
			}))
			wrapper =  mount(
				<Refund
					content={content}
					user={{ id: '0', accessToken: '123' }}
					order={{ id: '0' }}
				/>
			)

			expect(wrapper.find('Loading')).toHaveLength(1)

			await resolver({
				data: { refundValue: 8.77 }
			})

			expect(wrapper.find('Loading')).toHaveLength(0)
		})

		test('refund data is fetched', () => {
			expect(fetch.mock.calls[0][0]).toBe(null)
			expect(fetch.mock.calls[0][1]).toContain('/ssr/v1/ssr')
			expect(fetch.mock.calls[0][2]).toBe(null)
			expect(fetch.mock.calls[0][3]).toBe('GET')
		})

		test('call redirect when user accept refund offer', async () => {
			getHelpApi.setComplaint = jest.fn(() => Promise.resolve({}))

			const BottomBar = getHelpLayout.find('BottomBar')
			const Button = BottomBar.find('Button').at(1)

			window.location.assign = jest.fn()

			await Button.props().onClick()

			expect(window.location.assign).toHaveBeenCalledTimes(1)
		})

		test('call not redirect when user accept refund offer and get an error', async () => {
			getHelpApi.setComplaint = jest.fn(() => {
				throw new Error('error')
			})

			const BottomBar = getHelpLayout.find('BottomBar')
			const Button = BottomBar.find('Button').at(1)

			window.location.assign = jest.fn()

			await Button.props().onClick()

			expect(window.location.assign).toHaveBeenCalledTimes(0)
		})

		test('error message is shown when fetching data errors and accept button hides', async () => {
			fetch.mockImplementation(() => { throw new Error('error') })
			wrapper =  mount(
				<Refund
					content={content}
					user={{ id: '0', accessToken: '123' }}
					order={{ id: '0' }}
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
