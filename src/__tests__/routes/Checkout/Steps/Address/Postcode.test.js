import React from 'react'
import { shallow } from 'enzyme'
import { Field } from 'redux-form'
import Postcode from 'routes/Checkout/Components/Address/Postcode'

describe('Postcode', () => {
	let wrapper

	beforeEach(() => {
		wrapper = shallow(<Postcode addresses={[]} />)
	})

	describe('rendering', () => {
		test('should render 1 <Field> component by default', () => {
			expect(wrapper.find(Field).length).toEqual(1)
		})
	})

	describe('sensitive data masking', function() {
		test('all <Field /> component(s) should have prop "mask"', () => {
			wrapper = shallow(
				<Postcode
					addresses={[
						{ id: 1, labels: [] },
						{ id: 2, labels: [] },
					]}
				/>,
			)
			expect(
				wrapper
					.find(Field)
					.at(0)
					.prop('mask'),
			).toEqual(true)
		})
	})
})
