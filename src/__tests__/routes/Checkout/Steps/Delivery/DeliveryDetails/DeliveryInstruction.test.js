import React from 'react'
import { Field } from 'redux-form'
import { shallow } from 'enzyme'
import DeliveryInstruction from 'routes/Checkout/Components/Delivery/DeliveryDetails/DeliveryInstruction'

describe('DeliveryInstruction', () => {
	let wrapper

	beforeEach(() => {
		wrapper = shallow(<DeliveryInstruction reset={jest.fn()} />)
	})

	describe('rendering', () => {
		test('should return div', () => {
			expect(wrapper.type()).toBe('div')
		})

		test('should render 1 <Field> component(s)', () => {
			expect(wrapper.find(Field)).toHaveLength(1)
		})

		test('should show another input when the value prop is "other"', () => {
			wrapper = shallow(<DeliveryInstruction value="other" reset={jest.fn()} />)

			const inputFields = wrapper.find(Field)
			const lastInput = inputFields.last()

			expect(inputFields).toHaveLength(2)
			expect(lastInput.prop('label')).toEqual(
				'More details about where to leave your box?',
			)
		})

		test('should show another input when the value prop is "neighbour"', () => {
			wrapper = shallow(<DeliveryInstruction value="neighbour" reset={jest.fn()} />)

			const inputFields = wrapper.find(Field)
			const lastInput = inputFields.last()

			expect(wrapper.find(Field)).toHaveLength(2)
			expect(lastInput.prop('label')).toEqual(
				'Additional information, door number, etc:',
			)
		})
	})

	describe('sensitive data masking', () => {
		test('<Field /> component(s) should have prop "mask" when the value prop is "other"', () => {
			wrapper = shallow(<DeliveryInstruction value="other" reset={jest.fn()} />)
			expect(
				wrapper
					.find(Field)
					.last()
					.prop('mask'),
			).toBe(true)
		})
	})
})
