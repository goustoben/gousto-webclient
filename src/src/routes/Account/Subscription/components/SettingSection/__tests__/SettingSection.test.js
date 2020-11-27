import React from 'react'
import { mount } from 'enzyme'

import { SettingSection } from '../SettingSection'

const mockOnSubmit = jest.fn()
const mockOnEditClick = jest.fn()

const mockProps = {
  icon: 'calendar',
  title: 'Mock title',
  renderCurrentValue: <div data-testing="mock-current-value" />,
  ctaText: 'Mock CTA text',
  onSubmit: mockOnSubmit,
  onEditClick: mockOnEditClick,
  instructions: 'Instructions',
  testingSelector: 'day-time-settings'
}

let wrapper

const mountWithProps = (props) => {
  wrapper = mount(
    <SettingSection {...mockProps} {...props}>
      <div data-testing="mock-child" />
    </SettingSection>)
}

describe('Given SettingSection is rendered', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    mountWithProps()
  })

  test('Then it is collapsed by default', () => {
    expect(wrapper.find('section').prop('aria-expanded')).toEqual(false)
  })

  describe('And isMobile prop is true', () => {
    beforeEach(() => {
      wrapper.setProps({ isMobile: true })
    })

    describe('When I click the EDIT button in the header', () => {
      beforeEach(() => {
        wrapper.find(`[data-testing="${mockProps.testingSelector}-cta"]`).simulate('click')
      })

      test('Then current value is still visible', () => {
        expect(
          wrapper.find('[data-testing="mock-current-value"]').exists()
        ).toBeTruthy()
      })

      test('Then chilren are rendered into a Modal', () => {
        expect(wrapper.find('Modal').exists()).toBeTruthy()
      })
    })
  })

  describe('And isCtaDisabled is false', () => {
    beforeEach(() => {
      mountWithProps({ isCtaDisabled: true })
    })

    test('Then the CTA is disabled', () => {
      expect(
        wrapper
          .find('[data-testing="day-time-settings-save-cta"]')
          .prop('disabled')
      ).toEqual(true)
    })
  })

  describe('When I click the EDIT button in the header', () => {
    beforeEach(() => {
      wrapper.find(`[data-testing="${mockProps.testingSelector}-cta"]`).simulate('click')
    })

    test('Then the current value is no longer visible', () => {
      expect(
        wrapper.find('[data-testing="mock-current-value"]').exists()
      ).toBeFalsy()
    })

    test('Then the onEditClick handler is invoked', () => {
      expect(mockOnEditClick).toHaveBeenCalledTimes(1)
    })

    test('Then the children are rendered', () => {
      expect(
        wrapper.find('[data-testing="children"]').prop('aria-hidden')
      ).toEqual(false)
    })

    test('Then the CTA is rendered as expected', () => {
      expect(wrapper.find('CTA .content').text()).toEqual(mockProps.ctaText)
    })

    describe('And I click the CTA', () => {
      beforeEach(() => {
        wrapper.find('CTA').simulate('click')
      })

      test('Then the onSubmit handler is called', () => {
        expect(mockOnSubmit).toHaveBeenCalledTimes(1)
      })

      test('Then the section is collapsed', () => {
        expect(wrapper.find('section').prop('aria-expanded')).toEqual(false)
      })
    })
  })
})
