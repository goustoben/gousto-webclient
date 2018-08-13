import React from 'react'
import { shallow } from 'enzyme'

import Confirm from 'routes/Unsubscribe/Confirm'

import css from 'routes/Unsubscribe/Confirm/Confirm.css'

describe('<Confirm />', () => {
	test('copy body1, body2 and the copy of the button are rendered', () => {
		const wrapper = shallow(
			<Confirm
				isError={false}
				pending={false}
				unsubscribeClick={() => {}}
				copy={{
					body1: 'body-1',
					body2: 'body-2',
					button: 'button-text',
					defaultError: '',
				}}
			/>
		)

		expect(wrapper.contains('body-1')).toBe(true)
		expect(wrapper.contains('body-2')).toBe(true)
		expect(wrapper.find('Button').contains('button-text')).toBe(true)
	})

	test('error message is displaying', () => {
		const wrapper = shallow(
			<Confirm
				isError
				pending={false}
				unsubscribeClick={() => {}}
				copy={{
					body1: '',
					body2: '',
					button: '',
					defaultError: 'Error message',
				}}
			/>
		)

		expect(wrapper.find(`.${css.confirmContentError}`).text()).toBe('Error message')
	})

	test('error element has to be not present', () => {
		const wrapper = shallow(
			<Confirm
				isError={false}
				pending={false}
				unsubscribeClick={() => {}}
				copy={{
					body1: '',
					body2: '',
					button: '',
					defaultError: '',
				}}
			/>
		)

		expect(wrapper.find(`.${css.confirmContentError}`).isEmpty()).toBe(true)
	})

	test('button is not disabled if unsubscribe operation is not pending', () => {
		const wrapper = shallow(
			<Confirm
				isError={false}
				pending={false}
				unsubscribeClick={() => {}}
				copy={{
					body1: '',
					body2: '',
					button: '',
					defaultError: '',
				}}
			/>
		)

		expect(wrapper.find('Button').prop('disabled')).toBe(false)
	})

	test('button is disabled while unsubscribe operation is pending', () => {
		const wrapper = shallow(
			<Confirm
				isError={false}
				pending
				unsubscribeClick={() => {}}
				copy={{
					body1: '',
					body2: '',
					button: '',
					defaultError: '',
				}}
			/>
		)

		expect(wrapper.find('Button').prop('disabled')).toBe(true)
	})

	describe('interaction', () => {
		test('cliking on the button calls to unsubscribeClick', () => {
			const unsubscribeClickSpy = jest.fn()
			const wrapper = shallow(
				<Confirm
					isError={false}
					pending={false}
					unsubscribeClick={unsubscribeClickSpy}
					copy={{
						body1: '',
						body2: '',
						button: '',
						defaultError: '',
					}}
				/>
			)
			wrapper.find('Button').simulate('click')

			expect(unsubscribeClickSpy).toHaveBeenCalled()
		})
	})
})
