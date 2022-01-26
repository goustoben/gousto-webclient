import React from 'react'
import { mount } from 'enzyme'

import { ExpandedContent } from '../ExpandedContent'

let wrapper

const mockCollapseSection = jest.fn()

const mockProps = {
  isMobile: false,
  title: 'Mock Header',
  isExpanded: false,
  collapseSection: mockCollapseSection
}

const mountWithProps = (props) => {
  wrapper = mount(
    <ExpandedContent {...mockProps} {...props}>
      <div data-testing="mock-child" />
    </ExpandedContent>)
}

describe('Given ExpandedContent is rendered', () => {
  beforeEach(() => {
    mountWithProps()
  })

  describe('And isMobile is false', () => {
    describe('And section is not expanded', () => {
      test('Then the children are rendered', () => {
        expect(
          wrapper.find('[data-testing="mock-child"]').exists()
        ).toBeTruthy()
      })
    })
  })

  describe('And isMobile is true', () => {
    beforeEach(() => {
      mountWithProps({ isMobile: true })
    })

    test('Then the Modal is rendered', () => {
      expect(
        wrapper.find('Modal').exists()
      ).toBeTruthy()
    })

    describe('And isExpanded is false', () => {
      test('Then children are NOT rendered in the Modal', () => {
        expect(
          wrapper.find('[data-testing="mock-child"]').exists()
        ).toBeFalsy()
      })
    })

    describe('And isExpanded is true', () => {
      beforeEach(() => {
        mountWithProps({ isExpanded: true, isMobile: true })
      })

      test('Then the Modal heading is rendered correctly', () => {
        expect(
          wrapper.find('[data-testing="modal-header"]').text()
        ).toEqual(mockProps.title)
      })

      test('Then children are rendered in the Modal', () => {
        expect(
          wrapper.find('[data-testing="mock-child"]').exists()
        ).toBeTruthy()
      })

      describe('When I click the Modal X', () => {
        beforeEach(() => {
          wrapper
            .find('[data-testing="modal-close-button"]')
            .simulate('click')
        })

        test('Then collapseSection is invoked', () => {
          expect(mockCollapseSection).toHaveBeenCalledTimes(1)
        })
      })
    })
  })
})
