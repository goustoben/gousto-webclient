import React from 'react'
import { mount } from 'enzyme'
import { ExpandableSection } from '..'

describe('<ExpandableSection />', () => {
  let wrapper
  const mockOnExpand = jest.fn()

  beforeEach(() => {
    jest.resetAllMocks()

    wrapper = mount(
      <ExpandableSection
        onExpand={mockOnExpand}
        label="test label"
      >
        test content
      </ExpandableSection>,
    )
  })

  test('renders correctly', () => {
    expect(wrapper.find('.toggleContainer')).toHaveLength(1)
    expect(wrapper.find('.toggleContainer').name()).toBe('button')

    expect(wrapper.find('.toggleContainer Heading')).toHaveLength(1)
    expect(wrapper.find('.toggleContainer Heading').prop('children')).toBe(
      'test label',
    )

    expect(wrapper.find('.contentContainer')).toHaveLength(1)

    const contentWrapper = wrapper.find('.contentContainer > div')
    expect(contentWrapper).toHaveLength(1)
    expect(contentWrapper.hasClass('defaultContent')).toBeTruthy()
    expect(contentWrapper.prop('children')).toBe('test content')
  })

  test('hides the content', () => {
    expect(wrapper.find('.contentContainer').hasClass('isExpanded')).toBeFalsy()
  })

  describe('when renderToggle function is supplied', () => {
    beforeEach(() => {
      const renderToggle = (props) => {
        // eslint-disable-next-line
        const { isExpanded, handleClick } = props

        return (
          <div className="customToggle">
            <div data-testing="expanded-toggle-content">
              Expanded:
              {' '}
              {JSON.stringify(isExpanded)}
            </div>
            <button
              onClick={handleClick}
              type="button"
              data-testing="custom-expand"
            >
              Edit
            </button>
          </div>
        )
      }

      wrapper.setProps({ renderToggle })
    })

    test('then it renders a custom toggle instead of Heading', () => {
      expect(wrapper.find('.toggleContainer Heading')).toHaveLength(0)
      expect(wrapper.find('.customToggle')).toHaveLength(1)
    })

    describe('when I invoke handleClick from the custom toggle', () => {
      beforeEach(() => {
        wrapper
          .find('[data-testing="custom-expand"]')
          .simulate('click')
      })

      test('Then the section is expanded', () => {
        expect(
          wrapper.find('section').prop('aria-expanded'),
        ).toBeTruthy()
      })

      test('Then isExpanded value is correctly passed to renderToggle', () => {
        expect(
          wrapper.find('[data-testing="expanded-toggle-content"]').text(),
        ).toEqual('Expanded: true')
      })
    })
  })

  describe('when className is supplied', () => {
    beforeEach(() => {
      wrapper.setProps({
        className: 'customClass',
      })
    })

    test('then it is set on the overall widget', () => {
      expect(wrapper.hasClass('customClass')).toBeTruthy()
    })
  })

  describe('when contentClassName is supplied', () => {
    beforeEach(() => {
      wrapper.setProps({
        contentClassName: 'customContent',
      })
    })

    test('then it is set on the content wrapper instead of the default class name', () => {
      const contentWrapper = wrapper.find('.contentContainer > div')
      expect(contentWrapper.hasClass('defaultContent')).toBeFalsy()
      expect(contentWrapper.hasClass('customContent')).toBeTruthy()
    })
  })

  describe('when rendered with defaultExpanded', () => {
    beforeEach(() => {
      wrapper = mount(
        <ExpandableSection label="test label" defaultExpanded>
          test content
        </ExpandableSection>,
      )
    })

    test('then it shows the content at full height', () => {
      expect(
        wrapper.find('.contentContainer').hasClass('isExpanded'),
      ).toBeTruthy()
    })
  })

  describe('when regular children are passed', () => {
    describe('and section is clicked', () => {
      beforeEach(() => {
        wrapper
          .find('.toggleContainer')
          .simulate('click', { preventDefault() { } })
      })

      test('shows the content', () => {
        expect(
          wrapper.find('.contentContainer').hasClass('isExpanded'),
        ).toBeTruthy()
      })

      test('invokes onExpand callback fn', () => {
        expect(mockOnExpand).toHaveBeenCalledTimes(1)
      })

      describe('and clicked again', () => {
        beforeEach(() => {
          wrapper
            .find('.toggleContainer')
            .simulate('click', { preventDefault() { } })
        })

        test('hides the content again', () => {
          expect(
            wrapper.find('.contentContainer').hasClass('isExpanded'),
          ).toBeFalsy()
        })
      })
    })
  })

  describe('when function is passed as a child', () => {
    beforeEach(() => {
      wrapper = mount(
        <ExpandableSection label="test label">
          {
            ({ collapseSection, isExpanded }) => (
              <div data-testing="children">
                <p>
                  Expanded:
                  {' '}
                  {JSON.stringify(isExpanded)}
                </p>
                <button
                  data-testing="collapse-btn"
                  type="button"
                  onClick={collapseSection}
                >
                  Collapse section
                </button>
              </div>
            )
          }
        </ExpandableSection>,
      )
    })

    test('isExpanded param is passed as expected', () => {
      expect(
        wrapper.find('p').text(),
      ).toEqual('Expanded: false')
    })

    describe('and section is clicked', () => {
      beforeEach(() => {
        wrapper
          .find('.toggleContainer')
          .simulate('click', { preventDefault() { } })
      })

      test('isExpanded param is passed as expected', () => {
        expect(
          wrapper.find('p').text(),
        ).toEqual('Expanded: true')
      })

      describe('and collapseSection is invoked from child component', () => {
        beforeEach(() => {
          wrapper
            .find('[data-testing="collapse-btn"]')
            .simulate('click')
        })

        test('content is hidden', () => {
          expect(
            wrapper.find('.contentContainer').hasClass('isExpanded'),
          ).toBeFalsy()
        })
      })
    })
  })
})
