import React from 'react'
import { mount } from 'enzyme'

import { Options } from '../Options.logic'

const mockOptions = [
  {
    value: 1,
    text: 'Option 1',
  },
  {
    value: 2,
    text: 'Option 2',
    disabled: true,
  },
]

const mockProps = {
  handleOptionClick: () => { },
  isMobile: false,
  name: 'mock name',
  options: mockOptions,
  selectedOption: mockOptions[0],
  testingSelector: 'mock-select',
  toggleOptionsVisibility: () => { },
  isExpanded: false,
}

let wrapper

const mountWithProps = (props) => {
  wrapper = mount(<Options {...mockProps} {...props} />)
}

describe('Given Options are rendered', () => {
  beforeEach(() => {
    mountWithProps()
  })

  test('Then options are rendered', () => {
    expect.assertions(2)

    const options = wrapper.find('li')

    options.forEach((option, idx) => {
      expect(option.text()).toEqual(mockOptions[idx].text)
    })
  })

  test('Then options are disabled as expected', () => {
    const disabledIdx = mockOptions.findIndex(({ disabled }) => disabled)

    const disabledOption = wrapper
      .find('li')
      .at(disabledIdx)

    expect(disabledOption.prop('aria-disabled')).toEqual(true)
  })

  test('Then selected options are rendered as expected', () => {
    const selectedIdx = mockOptions.findIndex((option) => option.value === mockProps.selectedOption.value)
    const enabledOption = wrapper.find('li').at(selectedIdx)

    expect(enabledOption.prop('aria-selected')).toEqual(true)
    expect(
      enabledOption.find('[data-testing="selected-option-icon"]').exists(),
    ).toEqual(true)
  })

  describe('When itemsAreLinks is true', () => {
    beforeEach(() => {
      wrapper.setProps({ itemsAreLinks: true })
    })

    test('Then the class is added overriding the default anchor styles', () => {
      wrapper.find('li').forEach((li) => {
        expect(li.hasClass('itemsAreLinks')).toBeTruthy()
      })
    })
  })

  describe('When renderItem is supplied', () => {
    const renderItem = jest.fn().mockReturnValue('custom item')

    beforeEach(() => {
      wrapper.setProps({ renderItem })
    })

    test('Then it is called to get contents for each item', () => {
      expect(renderItem).toHaveBeenCalledTimes(mockOptions.length)
      mockOptions.forEach((option, idx) => {
        expect(renderItem.mock.calls[idx][0]).toStrictEqual(option)
      })
    })
  })
})
