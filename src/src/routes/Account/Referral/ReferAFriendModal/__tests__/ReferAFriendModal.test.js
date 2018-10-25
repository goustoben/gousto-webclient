import ReferAFriendModal from '../ReferAFriendModal'
import React from 'react'
import { shallow } from 'enzyme'
import TextInput from 'Form/Input'
import { Button } from 'goustouicomponents'

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
		})

		describe('and inputs valid email address', () => {
			beforeEach(() => {
				input.simulate('change', 'valid@email.com')
			})

			it('should set isEmailValid state prop to true', () => {
				expect(wrapper.state().isEmailValid).toBe(true)
			})
		})
	})
})
