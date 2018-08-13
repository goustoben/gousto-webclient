import React from 'react'
import { shallow } from 'enzyme'
import OrderRescheduledNotification from 'routes/Account/MyDeliveries/OrdersList/Order/OrderRescheduledNotification'

describe('OrderRescheduledNotification', () => {
	describe('rendering', () => {
		let wrapper
		const oldDeliveryDaySample = 'Sunday 12 June'
		const reasonSample = 'Bank Holiday'

		beforeEach(() => {
			wrapper = shallow(
				<OrderRescheduledNotification
					oldDeliveryDay={oldDeliveryDaySample}
					reason={reasonSample}
				/>,
			)
		})

		test('should render a <div> with the content of the props properly formatted', () => {
			expect(wrapper.type()).toEqual('div')
			expect(wrapper.text()).toEqual('Sunday 12 June (Bank Holiday)')
		})
	})
})
