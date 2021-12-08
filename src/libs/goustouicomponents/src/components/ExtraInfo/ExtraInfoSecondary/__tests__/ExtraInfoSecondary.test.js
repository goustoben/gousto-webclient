import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import { ExtraInfoSecondary } from '../ExtraInfoSecondary.logic'

describe('ExtraInfoSecondary', () => {
  let wrapper

  const PROPS = {
    label: 'This is a label',
    title: 'This is a title',
  }

  const CHILDREN = <div>This is some content</div>

  beforeEach(() => {
    wrapper = mount(<ExtraInfoSecondary {...PROPS}>{CHILDREN}</ExtraInfoSecondary>)
  })

  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<ExtraInfoSecondary {...PROPS}>{CHILDREN}</ExtraInfoSecondary>, div)
  })

  test('does not have the isExpanded class on the content wrapper', () => {
    expect(wrapper.find('.secondaryContent').hasClass('isExpanded')).toBe(false)
  })

  test('shows the label for the content inside the button', () => {
    expect(wrapper.find('.showMoreInfoBtn').contains(PROPS.label)).toBe(true)
  })

  test('shows the title for the content inside the button', () => {
    expect(wrapper.find('.showMoreInfoBtn').contains(PROPS.title)).toBe(true)
  })

  test('does not allow for the hideMoreInfoBtn to be focused using the keyboard', () => {
    expect(wrapper.find('.hideMoreInfoBtn').prop('tabIndex')).toBe('-1')
  })

  describe('when isShowingMoreInfo is set to false', () => {
    beforeEach(() => {
      wrapper.setState({ isShowingMoreInfo: false })
    })

    test('does not have the isExpanded class on the content wrapper', () => {
      expect(wrapper.find('.secondaryContent').hasClass('isExpanded')).toBe(false)
    })

    describe('and the showMoreInfoBtn button is actioned', () => {
      beforeEach(() => {
        wrapper.find('.showMoreInfoBtn').simulate('click')
      })

      test('adds the isExpanded class on the content wrapper', () => {
        expect(wrapper.find('.secondaryContent').hasClass('isExpanded')).toBe(true)
      })

      test('focuses on the hideMoreInfoBtn', () => {
        expect(wrapper.find('.hideMoreInfoBtn').is(':focus')).toBe(true)
      })

      test('allows for the hideMoreInfoBtn to be focused using the keyboard', () => {
        expect(wrapper.find('.hideMoreInfoBtn').prop('tabIndex')).toBe('0')
      })

      test('does not allow for the showMoreInfoBtn to be focused using the keyboard', () => {
        expect(wrapper.find('.showMoreInfoBtn').prop('tabIndex')).toBe('-1')
      })
    })

    describe('and the hideMoreInfoBtn button is actioned', () => {
      beforeEach(() => {
        wrapper.find('.hideMoreInfoBtn').simulate('click')
      })

      test('does not add the isExpanded class on the content wrapper', () => {
        expect(wrapper.find('.secondaryContent').hasClass('isExpanded')).toBe(false)
      })

      test('focuses on the showMoreInfoBtn', () => {
        expect(wrapper.find('.showMoreInfoBtn').is(':focus')).toBe(true)
      })

      test('allows for the showMoreInfoBtn to be focused using the keyboard', () => {
        expect(wrapper.find('.showMoreInfoBtn').prop('tabIndex')).toBe('0')
      })

      test('does not allow for the hideMoreInfoBtn to be focused using the keyboard', () => {
        expect(wrapper.find('.hideMoreInfoBtn').prop('tabIndex')).toBe('-1')
      })
    })
  })

  describe('when isShowingMoreInfo is set to true', () => {
    beforeEach(() => {
      wrapper.setState({ isShowingMoreInfo: true })
    })

    test('adds the isExpanded class on the content wrapper', () => {
      expect(wrapper.find('.secondaryContent').hasClass('isExpanded')).toBe(true)
    })

    describe('and the showMoreInfoBtn button is actioned', () => {
      beforeEach(() => {
        wrapper.find('.showMoreInfoBtn').simulate('click')
      })

      test('does not remove the isExpanded class on the content wrapper', () => {
        expect(wrapper.find('.secondaryContent').hasClass('isExpanded')).toBe(true)
      })

      test('focuses on the hideMoreInfoBtn', () => {
        expect(wrapper.find('.hideMoreInfoBtn').is(':focus')).toBe(true)
      })

      test('allows for the hideMoreInfoBtn to be focused using the keyboard', () => {
        expect(wrapper.find('.hideMoreInfoBtn').prop('tabIndex')).toBe('0')
      })

      test('does not allow for the showMoreInfoBtn to be focused using the keyboard', () => {
        expect(wrapper.find('.showMoreInfoBtn').prop('tabIndex')).toBe('-1')
      })
    })

    describe('and the hideMoreInfoBtn button is actioned', () => {
      beforeEach(() => {
        wrapper.find('.hideMoreInfoBtn').simulate('click')
      })

      test('removes the isExpanded class on the content wrapper', () => {
        expect(wrapper.find('.secondaryContent').hasClass('isExpanded')).toBe(false)
      })

      test('focuses on the showMoreInfoBtn', () => {
        expect(wrapper.find('.showMoreInfoBtn').is(':focus')).toBe(true)
      })

      test('allows for the showMoreInfoBtn to be focused using the keyboard', () => {
        expect(wrapper.find('.showMoreInfoBtn').prop('tabIndex')).toBe('0')
      })

      test('does not allow for the hideMoreInfoBtn to be focused using the keyboard', () => {
        expect(wrapper.find('.hideMoreInfoBtn').prop('tabIndex')).toBe('-1')
      })
    })
  })
})
