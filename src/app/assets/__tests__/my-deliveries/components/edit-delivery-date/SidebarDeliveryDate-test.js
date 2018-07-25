
import React from 'react'
import { shallow } from 'enzyme'
import SidebarDeliveryDate from '../../../../js/my-deliveries/components/edit-delivery-date/SidebarDeliveryDate'

describe('SidebarDeliveryDate', () => {
	let testOrder
	beforeEach(() => {
		testOrder = {
			delivery_date: '1990-01-12',
			delivery_slot: {
				delivery_start: '08:00:00',
				delivery_end: '09:00:00',
			},
		}
	})
	it('should return a <SidebarDeliveryDate>', () => {
		const wrapper = shallow(<SidebarDeliveryDate order={testOrder} />)
		expect(wrapper.type()).toEqual('span')
	})
	it('should not show strikeout day if no original_delivery_day on order', () => {
		const wrapper = shallow(<SidebarDeliveryDate order={testOrder} />)
		expect(wrapper.find('.strikethrough-day').length).toEqual(0)
	})
	it('should show strikeout day if original_delivery_day on order', () => {
		testOrder.original_delivery_day = { date: '1990-02-11' }
		const wrapper = shallow(<SidebarDeliveryDate order={testOrder} />)
		expect(wrapper.find('.strikethrough-day').length).toEqual(1)
	})
})
