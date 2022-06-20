import React from 'react'

import { shallow } from 'enzyme'
import { DropdownInput } from '../DropdownInput'

describe('DropdownInput', () => {
  test('should render option with label and subLabel separated by whitespace', () => {
    const wrapper = shallow(
      <DropdownInput
        options={[{ value: 'value', label: 'label', subLabel: 'sub-label', disabled: false }]}
        value="value"
      />
    )
    const option = wrapper.find('option')

    expect(option.length).toBe(1)
    expect(option.text()).toBe('label sub-label')
  })

  test('should not render subLabel if it does not exist', () => {
    const wrapper = shallow(
      <DropdownInput
        options={[{ value: 'value', label: 'label' }]}
        value="value"
      />
    )
    const option = wrapper.find('option')

    expect(option.length).toBe(1)
    expect(option.text()).toBe('label')
  })
})
