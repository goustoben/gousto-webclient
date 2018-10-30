import ReferAFriendModal from '../ReferAFriendModal'
import React from 'react'
import { shallow } from 'enzyme'
import TextInput from 'Form/Input'
import InputError from 'Form/InputError'
import { Button } from 'goustouicomponents'
import config from 'config/home'

describe('ReferAFriendModal', () => {
	let wrapper
	const onClose = jest.fn()
	const userReferAFriend = jest.fn()

	beforeEach(() => {
		wrapper = shallow(
			<ReferAFriendModal onClose={onClose} userReferAFriend={userReferAFriend}/>
		)
	})

	describe('upon initial render', () => {
		it('should have a `TextInput` component', () => {
			expect(wrapper.find(TextInput).length).toEqual(1)
		})

		it('should have a send email `Button` component', () => {
			expect(wrapper.find(Button).length).toEqual(1)
			expect(wrapper.find(Button).html()).toContain('Send Email')
		})

		describe('when the user populates input', () => {
			let input

			beforeEach(() => {
				input = wrapper.find(TextInput)
				input.simulate('change', 'test input')
			})

			it('should set state email prop to value of input', () => {
				expect(wrapper.state().email).toEqual('test input')
			})

			describe('and types invalid email address', () => {
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
						expect(wrapper.find(InputError).html()).toContain(errorMessage)
					})
				})
			})

			describe('and types valid email address', () => {
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

					it('should transition into email sent view', () => {
						expect(wrapper.state().showEmailReferralForm).toBe(false)
						expect(wrapper.find(Button).html()).toContain('Invite another friend')
					})

					it('should call userReferFriends with given email', () => {
						expect(userReferAFriend).toHaveBeenCalledWith('valid@email.com')
					})
				})
			})
		})
	})

	describe('email sent view', () => {
		beforeEach(() => {
			wrapper.setState({
				showReferralForm: false,
			})
		})

		describe('when invite more friends `Button` is pressed', () => {
			it('should transition into initial view', () => {
				expect(wrapper.state().showEmailReferralForm).toBe(true)
				expect(wrapper.find(Button).html()).toContain('Send Email')
			})
		})
	})
})
