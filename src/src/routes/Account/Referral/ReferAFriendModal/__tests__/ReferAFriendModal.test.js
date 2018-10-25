import ReferAFriendModal from '../ReferAFriendModal'
import React from 'react'
import { shallow } from 'enzyme'
import TextInput from 'Form/Input'
import { Button } from 'goustouicomponents'
import config from 'config/home'
import { referAFriend } from 'apis/user'

jest.mock('apis/user', () => ({
	referAFriend: jest.fn()
}))

describe('ReferAFriendModal', () => {
	let wrapper
	const onClose = jest.fn()
	const accessToken = 'test-access-token'

	beforeEach(() => {
		wrapper = shallow(
			<ReferAFriendModal onClose={onClose} accessToken={accessToken}/>
		)
	})

	it('should have a `TextInput` component', () => {
		expect(wrapper.find(TextInput).length).toEqual(1)
	})

	it('should have a `Button` component', () => {
		expect(wrapper.find(Button).length).toEqual(1)
	})

	describe('user populates input', () => {
		let input

		beforeEach(() => {
			input = wrapper.find(TextInput)
			input.simulate('change', 'test input')
		})

		it('should set state email prop to value of input', () => {
			expect(wrapper.state().email).toEqual('test input')
		})

		describe('and inputs invalid email address', () => {
			beforeEach(() => {
				input.simulate('change', 'invalid-email')
			})

			it('should set isEmailValid state prop to false', () => {
				expect(wrapper.state().isEmailValid).toBe(false)
			})

			describe('and presses `Button` to send emails', () => {
				const errorMessage = config.emailForm.emailRequired

				beforeEach(() => {
					const button = wrapper.find(Button)
					button.simulate('click', { preventDefault: () => {} })
				})

				it('should set errorMessage state prop to email required message', () => {
					expect(wrapper.state().errorMessage).toEqual(errorMessage)
				})

				it('should display error message', () => {
					expect(wrapper.find('.errorMsg').text()).toEqual(errorMessage)
				})
			})
		})

		describe('and inputs valid email address', () => {
			beforeEach(() => {
				input.simulate('change', 'valid@email.com')
			})

			it('should set isEmailValid state prop to true', () => {
				expect(wrapper.state().isEmailValid).toBe(true)
			})

			describe('and presses `Button` to send emails', () => {
				beforeEach(() => {
					const button = wrapper.find(Button)
					button.simulate('click', { preventDefault: () => {} })
				})

				it('should set errorMessage state prop to empty string', () => {
					expect(wrapper.state().errorMessage).toEqual('')
				})

				it('should set showEmailReferralForm state prop to false', () => {
					expect(wrapper.state().showEmailReferralForm).toBe(false)
				})

				it('should call referAFriend with correct parameters', () => {
					expect(referAFriend).toHaveBeenCalledWith(accessToken, { emails: ['valid@email.com'] })
				})
			})
		})
	})
})
