import React from 'react'
import { shallow } from 'enzyme'
import { Field } from 'redux-form'
import DeliveryAddressType from 'routes/Checkout/Components/Delivery/DeliveryDetails/DeliveryAddressType'

describe('DeliveryAddressType', () => {
	let wrapper

	beforeEach(() => {
		wrapper = shallow(<DeliveryAddressType reset={jest.fn()} />)
	})

	describe('rendering', () => {
		test('should return div', () => {
			expect(wrapper.type()).toBe('div')
		})

		test('should render 1 <Field> component(s)', () => {
			expect(wrapper.find(Field)).toHaveLength(1)
		})

		test('should show an extra input with prop "mask", when the value prop is "other"', () => {
			wrapper = shallow(<DeliveryAddressType value="other" reset={jest.fn()} />)
			expect(wrapper.find(Field)).toHaveLength(2)
			expect(
				wrapper
					.find(Field)
					.at(1)
					.prop('mask'),
			).toBe(true)
		})
	})
})
