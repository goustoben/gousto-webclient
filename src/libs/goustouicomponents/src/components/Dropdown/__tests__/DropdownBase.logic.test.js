import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'

import { DropdownBase } from '../DropdownBase.logic'

const mockOnChange = jest.fn()

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

const mockProps = {
  placeholder: 'Mock placeholder',
  isMobile: false,
  name: 'Mock Dropdown',
  onChange: mockOnChange,
  options: mockOptions,
  testingSelector: 'mock-dropdown',
  value: null,
}

let wrapper

const mountWithProps = (props) => {
  wrapper = mount(
    <DropdownBase {...mockProps} {...props} />,
  )
}

let onMouseDown

describe('Given DropdownBase is rendered', () => {
  beforeEach(() => {
    jest.resetAllMocks()

    jest
      .spyOn(document, 'addEventListener')
      .mockImplementation((e, cb) => {
        onMouseDown = cb
      })

    mountWithProps()
  })

  test('Then it should be collapsed by default', () => {
    expect(
      wrapper.find('Options').prop('isExpanded'),
    ).toBeFalsy()
  })

  test('Then I should see the placeholder text', () => {
    expect(
      wrapper.find('[data-testing="mock-dropdown-toggle"]').text(),
    ).toEqual('Mock placeholder')
  })

  describe('And a value is passed from the parent', () => {
    beforeEach(() => {
      mountWithProps({ value: mockOptions[0] })
    })

    test('Then the selected value is displayed', () => {
      expect(
        wrapper.find('[data-testing="mock-dropdown-toggle"]').text(),
      ).toEqual('Option 1')
    })
  })

  describe('When I click the header', () => {
    beforeEach(() => {
      act(() => {
        wrapper
          .find('[data-testing="mock-dropdown-toggle"]')
          .simulate('click')
      })

      wrapper.update()
    })

    describe('And I click outside the expanded options', () => {
      beforeEach(() => {
        act(() => {
          onMouseDown({ target: document.body })
        })

        wrapper.update()
      })

      test('Then the options should no longer be expanded', () => {
        expect(
          wrapper.find('Options').prop('isExpanded'),
        ).toBeFalsy()
      })
    })

    test('Then the options are visible', () => {
      expect(
        wrapper.find('Options').prop('isExpanded'),
      ).toBeTruthy()
    })

    describe('And I click an option', () => {
      beforeEach(() => {
        act(() => {
          wrapper
            .find('li')
            .at(0)
            .simulate('click')
        })

        wrapper.update()
      })

      test('Then the onChange handler is invoked as expected', () => {
        expect(mockOnChange).toHaveBeenCalledWith({ value: 1, text: 'Option 1' })
      })

      test('Then the options are collapsed', () => {
        expect(
          wrapper.find('Options').prop('isExpanded'),
        ).toBeFalsy()
      })
    })

    describe('And I click a disabled option', () => {
      beforeEach(() => {
        act(() => {
          wrapper
            .find('li')
            .at(1)
            .simulate('click')
        })

        wrapper.update()
      })

      test('Then the onChange handler is not invoked', () => {
        expect(mockOnChange).not.toHaveBeenCalled()
      })

      test('Then the options remain expanded', () => {
        expect(
          wrapper.find('Options').prop('isExpanded'),
        ).toBeTruthy()
      })
    })
  })
})
