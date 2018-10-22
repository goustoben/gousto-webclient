import React from 'react'
import { mount } from 'enzyme'
import { client as routes } from 'config/routes'

import fetch from 'utils/fetch'
jest.mock('utils/fetch')

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
		let fetchPromise

		beforeEach(() => {
			fetchPromise = Promise.resolve({
				data: { refundValue: 7.77 }
			})
			fetch.mockImplementation(() => fetchPromise)
			wrapper =  mount(
				<Refund
					content={content}
					user={{ id: '0', accessToken: '123' }}
					order={{ id: '0' }}
				/>
			)
			fetchPromise.then(() => {
				wrapper.update()
				getHelpLayout = wrapper.find('GetHelpLayout')
			})
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

			expect(Button1.prop('url')).toContain(`${index}/${contact}`)
			expect(Button2.text()).toBe('button2 £7.77 copy')
		})
	})

	describe('behaviour', () => {
		let wrapper
		let getHelpLayout
		let fetchPromise

		beforeEach(() => {
			fetchPromise = Promise.resolve({
				data: { refundValue: 7.77 }
			})
			fetch.mockImplementation(() => fetchPromise)
			wrapper =  mount(
				<Refund
					content={content}
					user={{ id: '0', accessToken: '123' }}
					order={{ id: '0' }}
				/>
			)
			fetchPromise.then(() => {
				getHelpLayout = wrapper.find('GetHelpLayout')
				console.log('promise finished')
			})
		})

		test('loading shows while fetching data', async () => {
			let resolver
			fetchPromise = new Promise((resolve) => {
				resolver = resolve
			})
			fetch.mockImplementationOnce(() => fetchPromise)
			wrapper =  mount(
				<Refund
					content={content}
					user={{ id: '0', accessToken: '123' }}
					order={{ id: '0' }}
				/>
			)

			expect(wrapper.find('Loading')).toHaveLength(1)

			fetchPromise.then(async () => {
				await resolver({
					data: { refundValue: 8.77 }
				})

				expect(wrapper.find('Loading')).toHaveLength(0)
			})
		})

		test('refund data is fetched', () => {
			expect(fetch.mock.calls[0][0]).toBe(null)
			expect(fetch.mock.calls[0][1]).toContain('/ssr/v1/ssr')
			expect(fetch.mock.calls[0][2]).toBe(null)
			expect(fetch.mock.calls[0][3]).toBe('GET')
		})

		test('call redirect when user accept refund offer', () => {
			fetchPromise.then(async () => {
				fetch.mockReturnValueOnce({})
				console.log('getHelpLayout', getHelpLayout.debug())
				const assignSpy = jest.spyOn(window.location, 'assign')
				const BottomBar = getHelpLayout.find('BottomBar')
				console.log('>> bottombar', BottomBar.debug())
				const Button = BottomBar.find('Button').at(1)
				assignSpy.mockReturnValueOnce(null)
				await Button.props().onClick()

				expect(assignSpy).toHaveBeenCalledTimes(1)

				assignSpy.mockReset()
			})
		})

		test('call not redirect when user accept refund offer and get an error', async () => {
			fetch.mockImplementationOnce(() => { throw new Error('error') })
			const assignSpy = jest.spyOn(window.location, 'assign')
			const BottomBar = getHelpLayout.find('BottomBar')
			console.log('bottombar', BottomBar.html())
			const Button = BottomBar.find('Button').at(1)
			assignSpy.mockReturnValueOnce(null)
			await Button.props().onClick()

			expect(assignSpy).toHaveBeenCalledTimes(0)

			assignSpy.mockReset()
		})

		test('error message is shown when fetching data errors and accept button hides', () => {
			fetch.mockImplementationOnce(() => { throw new Error('error') })
			wrapper = mount(
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
