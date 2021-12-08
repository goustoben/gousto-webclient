import React from 'react'
import { shallow } from 'enzyme'
import { Dropdown } from '../Dropdown.logic'

const mockOptions = [
  {
    text: 'Option 1',
    value: 1,
    disabled: false,
  },
  {
    text: 'Option 2',
    value: 2,
    disabled: true,
  },
  {
    text: 'Option 3',
    value: 3,
    disabled: false,
  },
]

describe('Given Dropdown is rendered', () => {
  const onChange = jest.fn()
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <Dropdown
        value={mockOptions[0]}
        name="testName"
        isMobile={false}
        onChange={onChange}
        options={mockOptions}
        placeholder="testPlaceholder"
        testingSelector="testSelector"
      />,
    )
  })

  test('Then it renders DropdownBase with correct props', () => {
    const baseWrapper = wrapper.find('DropdownBase')

    expect(baseWrapper.exists()).toBeTruthy()
    expect(baseWrapper.prop('value')).toStrictEqual(mockOptions[0])
    expect(baseWrapper.prop('isMobile')).toBe(false)
    expect(baseWrapper.prop('name')).toBe('testName')
    expect(baseWrapper.prop('onChange')).toBe(onChange)
    expect(baseWrapper.prop('options')).toStrictEqual(mockOptions)
    expect(baseWrapper.prop('placeholder')).toBe('testPlaceholder')
    expect(baseWrapper.prop('testingSelector')).toBe('testSelector')
  })
})
