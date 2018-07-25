
import React from 'react'
import { shallow } from 'enzyme'
import Dropdown from '../../../../js/my-deliveries/components/edit-delivery-date/Dropdown'
import DropdownOption from '../../../../js/my-deliveries/components/edit-delivery-date/DropdownOption'

describe('Dropdown', () => {
	it('should return a <div>', () => {
		const wrapper = shallow(<Dropdown />)
		expect(wrapper.type()).toEqual('div')
	})

	describe('props.btnText', () => {
		it('should contain the text in the button', () => {
			const wrapper = shallow(<Dropdown btnText="Test text" />)
			expect(wrapper.find('button').first().text()).toEqual('Test text')
		})
	})

	describe('props.className', () => {
		it('should contain the text in the button', () => {
			const wrapper = shallow(<Dropdown className="customer-class" />)
			expect(wrapper.prop('className')).toContain('customer-class')
		})
	})

	describe('props.options', () => {
		it('should contain an a DropdownOption for each option', () => {
			const wrapper = shallow(<Dropdown
				options={[
					{},
					{},
					{},
				]}
			/>)
			expect(wrapper.find(DropdownOption).length).toEqual(3)
		})
	})

	describe('props.disabled', () => {
		it('not setting props.saving should not show the submit button in a disabled state', () => {
			const wrapper = shallow(<Dropdown />)
			expect(wrapper.find('button').first().prop('disabled')).toEqual(false)
		})

		it('setting props.saving should show the submit button in a disabled state', () => {
			const wrapper = shallow(<Dropdown disabled />)
			expect(wrapper.find('button').first().prop('disabled')).toEqual(true)
		})
	})
})
