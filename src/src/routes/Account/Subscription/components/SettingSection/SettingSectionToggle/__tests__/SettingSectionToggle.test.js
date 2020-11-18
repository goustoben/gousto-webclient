import React from 'react'
import { mount } from 'enzyme'

import { SettingSectionToggle } from '../SettingSectionToggle'

const mockHandleClick = jest.fn()

const mockProps = {
  isExpanded: false,
  icon: 'calendar',
  title: 'mock title',
  handleClick: mockHandleClick,
  isMobile: false,
  renderCurrentValue: <div data-testing="mock-current-val" />
}

let wrapper

const mountWithProps = (props) => {
  wrapper = mount(<SettingSectionToggle {...mockProps} {...props} />)
}

describe('Given SettingSectionToggle is rendered', () => {
  beforeEach(() => {
    mountWithProps()
  })

  test('Then the expected Icon is rendered', () => {
    expect(wrapper.find('Icon').prop('name')).toEqual(mockProps.icon)
  })

  test('Then the expected title is rendered', () => {
    expect(wrapper.find('.headerTitle').text()).toEqual(mockProps.title)
  })

  describe('When I click the button', () => {
    beforeEach(() => {
      wrapper
        .find('[data-testing="header-cta"]')
        .simulate('click')
    })

    test('Then handleClick is invoked', () => {
      expect(mockHandleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('And isMobile is false', () => {
    describe('And isExpanded is false', () => {
      beforeEach(() => {
        mountWithProps({ isExpanded: false })
      })

      test('Then the expected button text is rendered', () => {
        expect(
          wrapper.find('[data-testing="header-cta"]').text()
        ).toEqual('Edit')
      })

      test('Then current value is rendered', () => {
        expect(
          wrapper.find('[data-testing="mock-current-val"]').exists()
        ).toBeTruthy()
      })
    })

    describe('And isExpanded is true', () => {
      beforeEach(() => {
        mountWithProps({ isExpanded: true })
      })

      test('Then the expected button text is rendered', () => {
        expect(
          wrapper.find('[data-testing="header-cta"]').text()
        ).toEqual('Cancel')
      })

      test('Then current value is not rendered', () => {
        expect(
          wrapper.find('[data-testing="mock-current-val"]').exists()
        ).toBeFalsy()
      })
    })
  })

  describe('And isMobile is true', () => {
    beforeEach(() => {
      mountWithProps({ isMobile: true })
    })

    test('Then current value is rendered', () => {
      expect(
        wrapper.find('[data-testing="mock-current-val"]').exists()
      ).toBeTruthy()
    })
  })
})
