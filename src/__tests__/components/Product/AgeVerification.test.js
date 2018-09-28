import React from 'react'

import sinon from 'sinon'

import { shallow } from 'enzyme'
import Immutable from 'immutable' /* eslint-disable new-cap */
import AgeVerification from 'Product/AgeVerification'
import CheckBox from 'Form/CheckBox'
import { Tooltip } from 'goustouicomponents'

describe('Product AgeVerification', () => {
	let wrapper

	test('should return 1 div', () => {
		wrapper = shallow(<AgeVerification />)

		expect(wrapper.type()).toBe('div')
	})

	test('should contain 1 Tooltip', () => {
		wrapper = shallow(<AgeVerification />)

		expect(wrapper.childAt(0).type()).toBe(Tooltip)
	})

	test('should contain 1 CheckBox', () => {
		wrapper = shallow(<AgeVerification />)

		expect(wrapper.find(CheckBox).length).toEqual(1)
	})

	test('should not show error by default', () => {
		wrapper = shallow(<AgeVerification />)

		expect(wrapper.children().length).toEqual(1)
	})

	test('should contain 1 div to display error message is showError is true', () => {
		wrapper = shallow(<AgeVerification showError />)

		expect(wrapper.childAt(1).text()).toBe('Error verifying age')
	})

	test('should set correct default style, message, onVisibleChange, placement, triggers, & visible for Tooltip', () => {
		wrapper = shallow(<AgeVerification />)
		const tooltipProps = wrapper.find(Tooltip).props()

		expect(tooltipProps.style).toBe('checkbox')
		expect(tooltipProps.message).toBe(
			'Please tick this box if you want to proceed',
		)
		expect(typeof tooltipProps.onVisibleChange).toEqual('function')
		expect(tooltipProps.placement).toBe('topLeft')
		expect(tooltipProps.triggers).toBe('click')
		expect(tooltipProps.visible).toBe(false)
	})

	test('should pass onTooltipVisibleChange to Tooltip as onVisibleChange if provided', () => {
		const onTooltipVisibleChange = () => 'test'
		wrapper = shallow(
			<AgeVerification onTooltipVisibleChange={onTooltipVisibleChange} />,
		)

		expect(wrapper.find(Tooltip).prop('onVisibleChange')).toBe(
			onTooltipVisibleChange,
		)
	})

	test('should pass correct text to Checkbox label', () => {
		wrapper = shallow(<AgeVerification />)

		expect(wrapper.find(CheckBox).prop('label')).toBe(
			'This item is age restricted, please confirm you’re over 18',
		)
	})

	test('should pass disabled prop to Checkbox', () => {
		wrapper = shallow(<AgeVerification disabled />)

		expect(wrapper.find(CheckBox).prop('disabled')).toBe(true)
	})

	test('should pass onCheckBoxChange prop to Checkbox as onChange', () => {
		const onCheckBoxChange = () => 'test'
		wrapper = shallow(<AgeVerification onCheckBoxChange={onCheckBoxChange} />)

		expect(wrapper.find(CheckBox).prop('onChange')).toBe(onCheckBoxChange)
	})
})
