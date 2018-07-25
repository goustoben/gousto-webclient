import React from 'react'
import { shallow } from 'enzyme'

import SubscriptionOption from 'routes/Checkout/Components/Subscription/SubscriptionOption'

describe('SubscriptionOption', () => {
	let wrapper

	test('should render by default', () => {
		wrapper = shallow(<SubscriptionOption />)

		expect(wrapper.find('label')).toBeTruthy()
	})

	describe('description', () => {
		test('should not render automatically', () => {
			wrapper = shallow(<SubscriptionOption />)

			expect(wrapper.find('.description').length).toBe(0)
		})

		test('should render when description prop is set', () => {
			wrapper = shallow(<SubscriptionOption description="Leave the weekly shop to us" />)

			expect(wrapper.find('.description').length).toBe(1)
		})
	})
})
