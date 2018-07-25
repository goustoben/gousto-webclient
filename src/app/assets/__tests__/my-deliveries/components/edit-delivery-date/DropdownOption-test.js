import React from 'react'
import { shallow } from 'enzyme'
import DropdownOption from '../../../../js/my-deliveries/components/edit-delivery-date/DropdownOption'

describe('DropdownOption', () => {
	it('should return a <li>', () => {
		const wrapper = shallow(<DropdownOption />)
		expect(wrapper.type()).toEqual('li')
	})

	it('should have disabled class if disabled prop', () => {
		const wrapper = shallow(<DropdownOption disabled />)
		expect(wrapper.hasClass('disabled')).toBe(true)
	})

	it('should have truck image if disabled prop', () => {
		const wrapper = shallow(<DropdownOption disabled />)
		expect(wrapper.find('.fa-truck').length).toEqual(1)
	})

	it('should not disable li where not disabled prop and not have truck', () => {
		const wrapper = shallow(<DropdownOption />)
		expect(wrapper.hasClass('disabled')).toBe(false)
		expect(wrapper.find('.fa-truck').length).toEqual(0)
	})
})
