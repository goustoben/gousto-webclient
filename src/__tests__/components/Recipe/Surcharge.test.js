import React from 'react'

import { shallow } from 'enzyme'

import Surcharge from 'Recipe/Buttons/Surcharge'

describe('<Surcharge />', () => {
	let wrapper
	let surcharge
	let quantity

	test('should render nothing by default', () => {
		wrapper = shallow(<Surcharge />)

		expect(wrapper.find('div').length).toEqual(0)
	})

	describe('with surcharge props', () => {
		test('should render nothing when given a surcharge less or equal to 0', () => {
			surcharge = 0
			wrapper = shallow(<Surcharge surcharge={surcharge} />)

			expect(wrapper.find('div').length).toEqual(0)
		})

		test('should render a surcharge when given a surcharge greater than 0', () => {
			surcharge = 1.99
			wrapper = shallow(<Surcharge surcharge={surcharge} />)

			expect(wrapper.find('div').length).toEqual(1)
			expect(wrapper.text()).toContain(surcharge)
		})
	})

	describe('with surcharge and quanity props', () => {
		test('should multiply the surcharge by the quantity', () => {
			;[surcharge, quantity] = [2.49, 2]
			wrapper = shallow(<Surcharge surcharge={surcharge} quantity={quantity} />)

			expect(wrapper.text()).not.toContain(surcharge)
			expect(wrapper.text()).toContain(surcharge * quantity)
		})
	})
})
