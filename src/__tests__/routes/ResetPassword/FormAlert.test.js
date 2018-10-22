import React from 'react'
import { shallow } from 'enzyme'

import { Alert } from 'goustouicomponents'
import Link from 'Link'

import FormAlert from 'routes/ResetPassword/FormAlert'

describe('<FormAlert />', () => {
	let wrapper

	test('an alert when the errorResetPassword prop is true', () => {
		wrapper = shallow(<FormAlert errorResetPassword="some error" />)

		expect(wrapper.find(Alert)).toHaveLength(1)
	})

	test('no alert when the errorResetPassword prop is false', () => {
		wrapper = shallow(<FormAlert />)

		expect(wrapper.find(Alert)).toHaveLength(0)
	})

	describe('invalid password token error link', () => {
		test('should not display by default', () => {
			wrapper = shallow(<FormAlert errorResetPassword="some error" />)

			expect(wrapper.find(Link)).toHaveLength(0)
		})

		test('should display when errorResetPassword prop is token is invalid', () => {
			wrapper = shallow(<FormAlert errorResetPassword="password_token-invalid" />)

			expect(wrapper.find(Link)).toHaveLength(1)
		})
	})
})
