import React from 'react'
import { shallow } from 'enzyme'
import { act } from 'react-dom/test-utils'

import { ExpandingSection, EXPANDING_SECTION_ICONS } from '../ExpandingSection'

let wrapper

const mockOnExpand = jest.fn()
const mockOnCollapse = jest.fn()

const defaultProps = {
  testingSelector: 'mock-section',
  icon: EXPANDING_SECTION_ICONS.home,
  heading: 'Mock Heading',
  onExpand: mockOnExpand,
  onCollapse: mockOnCollapse,
}

const shallowWithProps = (props) => {
  wrapper = shallow(
    <ExpandingSection {...defaultProps} {...props}>
      {({ isExpanded, collapseSection }) => (isExpanded
        ? (
          <div data-testing="expanded-child">
            <button
              data-testing="collapse-button"
              type="button"
              onClick={() => collapseSection()}
            />
          </div>
        )
        : <div data-testing="collapsed-child" />
      )}
    </ExpandingSection>
  )
}

describe('Given ExpandingSection is rendered', () => {
  beforeEach(() => {
    shallowWithProps()
  })

  test('Then I should see the expected icon', () => {
    expect(wrapper.find('.icon-home').exists()).toEqual(true)
  })

  test('Then I should see the expected heading text', () => {
    expect(
      wrapper.find('[data-testing="heading"]').text()
    ).toEqual('Mock Heading')
  })

  test('Then the component is in a collapsed state', () => {
    expect(
      wrapper.find('[data-testing="mock-section"]').prop('aria-expanded')
    ).toEqual(false)
  })

  test('Then I should see the collapsed state children', () => {
    expect(
      wrapper.find('[data-testing="collapsed-child"]').exists()
    ).toEqual(true)
  })

  describe('When I click "Edit"', () => {
    beforeEach(() => {
      act(() => {
        wrapper
          .find('[data-testing="edit-button"]')
          .simulate('click')
      })
    })

    test('Then the onExpand callback is invoked', () => {
      expect(mockOnExpand).toHaveBeenCalledTimes(1)
    })

    test('Then I should see the children to display when expanded', () => {
      expect()
    })

    test('Then the component is in an expanded state', () => {
      expect(
        wrapper.find('[data-testing="mock-section"]').prop('aria-expanded')
      ).toEqual(true)
    })

    test('Then I should see the expanded state children', () => {
      expect(
        wrapper.find('[data-testing="expanded-child"]').exists()
      ).toEqual(true)
    })

    describe('And I invoke collapseSection render prop fn', () => {
      beforeEach(() => {
        act(() => {
          wrapper
            .find('[data-testing="collapse-button"]')
            .simulate('click')
        })
      })

      test('Then the component should collapse', () => {
        expect(
          wrapper.find('[data-testing="mock-section"]').prop('aria-expanded')
        ).toEqual(false)
      })
    })
  })
})
