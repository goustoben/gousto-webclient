import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'
import SubmitButton from 'routes/Checkout/Components/SubmitButton/SubmitButton'

import ErrorMessage from 'routes/Checkout/Components/ErrorMessage'
import TermsAndConditions from 'routes/Checkout/Components/TermsAndConditions'
import CheckoutButton from 'routes/Checkout/Components/CheckoutButton'

describe('SubmitButton', () => {
	let wrapper

	beforeEach(() => {
		wrapper = shallow(<SubmitButton />)
	})

	describe('rendering', () => {
		test('should return div', () => {
			expect(wrapper.type()).toBe('div')
		})

		test('should render 1 <ErrorMessage> components', () => {
			expect(wrapper.find(ErrorMessage)).toHaveLength(1)
		})

		test('should render 1 <CheckoutButton> components', () => {
			expect(wrapper.find(CheckoutButton)).toHaveLength(1)
		})

		test('should render 1 <TermsAndConditions> components', () => {
			expect(wrapper.find(TermsAndConditions)).toHaveLength(1)
		})
	})
})
