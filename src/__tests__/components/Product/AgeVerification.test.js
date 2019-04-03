import React from 'react'


import { shallow } from 'enzyme'
import { AgeVerificationCheckBox } from 'Product/AgeVerification'
import CheckBox from 'Form/CheckBox'
import { Tooltip } from 'goustouicomponents'

describe('Product AgeVerification', () => {
  let wrapper

  test('should return 1 div', () => {
    wrapper = shallow(<AgeVerificationCheckBox />)

    expect(wrapper.type()).toBe('div')
  })

  test('should contain 1 Tooltip', () => {
    wrapper = shallow(<AgeVerificationCheckBox />)

    expect(wrapper.childAt(0).type()).toBe(Tooltip)
  })

  test('should contain 1 CheckBox', () => {
    wrapper = shallow(<AgeVerificationCheckBox />)

    expect(wrapper.find(CheckBox).length).toEqual(1)
  })

  test('should not show error by default', () => {
    wrapper = shallow(<AgeVerificationCheckBox />)

    expect(wrapper.children().length).toEqual(1)
  })

  test('should contain 1 div to display error message is showError is true', () => {
    wrapper = shallow(<AgeVerificationCheckBox showError />)

    expect(wrapper.childAt(1).text()).toBe('Error verifying age')
  })

  test('should set correct default style, message, onVisibleChange, placement, triggers, & visible for Tooltip', () => {
    wrapper = shallow(<AgeVerificationCheckBox />)
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
			<AgeVerificationCheckBox onTooltipVisibleChange={onTooltipVisibleChange} />,
    )

    expect(wrapper.find(Tooltip).prop('onVisibleChange')).toBe(
      onTooltipVisibleChange,
    )
  })

  test('should pass correct text to Checkbox label', () => {
    wrapper = shallow(<AgeVerificationCheckBox />)

    expect(wrapper.find(CheckBox).prop('label')).toBe(
      'This item is age restricted, please confirm you’re over 18',
    )
  })

  test('should pass disabled prop to Checkbox', () => {
    wrapper = shallow(<AgeVerificationCheckBox disabled />)

    expect(wrapper.find(CheckBox).prop('disabled')).toBe(true)
  })

  test('should pass onCheckBoxChange prop to Checkbox as onChange', () => {
    const onCheckBoxChange = () => 'test'
    wrapper = shallow(<AgeVerificationCheckBox onCheckBoxChange={onCheckBoxChange} />)

    expect(wrapper.find(CheckBox).prop('onChange')).toBe(onCheckBoxChange)
  })
})
