import React from 'react'
import { mount } from 'enzyme'

import { DropdownBasePresentation } from '../DropdownBase.presentation'

const mockProps = {
  handleOptionClick: () => { },
  isExpanded: true,
  isMobile: true,
  name: 'mock name',
  options: [{ value: 1, text: 'Option 1' }],
  selectedOption: null,
  testingSelector: 'mock-dropdown',
  toggleOptionsVisibility: () => { },
  valueText: 'Placeholder',
}

let wrapper

const mountWithProps = (props) => {
  wrapper = mount(<DropdownBasePresentation {...mockProps} {...props} />)
}

describe('Given DropdownBasePresentation is rendered', () => {
  beforeEach(() => {
    mountWithProps()
  })

  describe('And isExpanded is true', () => {
    test('Then I should see the expected chevron icon', () => {
      expect(
        wrapper.find('[data-testing="toggle-icon-expanded"]').exists(),
      ).toEqual(true)
    })

    test('Then I should see the options', () => {
      expect(
        wrapper.find('[data-testing="mock-dropdown-options"]').exists(),
      ).toEqual(true)
    })
  })

  describe('And isExpanded is false', () => {
    beforeEach(() => {
      mountWithProps({ isExpanded: false })
    })

    test('Then I should see the expected chevron icon', () => {
      expect(
        wrapper.find('[data-testing="toggle-icon-collapsed"]').exists(),
      ).toEqual(true)
    })

    test('Then I should not see the options', () => {
      expect(
        wrapper.find('[data-testing="mock-dropdown-options"]').exists(),
      ).toEqual(false)
    })
  })
})
