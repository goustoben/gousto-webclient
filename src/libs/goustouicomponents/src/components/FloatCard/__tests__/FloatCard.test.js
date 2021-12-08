import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import { FloatCard } from '../index'

describe('FloatCard', () => {
  const CHILDREN = [
    <p key="1">Robin: You cannot get away from Batman that easy!</p>,
    <p key="2">Batman: Easily</p>,
    <p key="3">Batman: Good grammar is essential, Robin.</p>,
    <p key="4">Robin: Thank you.</p>,
    <p key="5">Batman: You are welcome.</p>,
  ]

  let wrapper

  beforeEach(() => {
    wrapper = mount(<FloatCard>{CHILDREN}</FloatCard>)
  })

  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<FloatCard>{CHILDREN}</FloatCard>, div)
  })

  test('renders the CloseIcon component', () => {
    expect(wrapper.find('CloseIcon')).toHaveLength(1)
  })

  test('does not have the "smallScreensOnly" class on the CloseIcon parent', () => {
    expect(wrapper.find('.smallScreensOnly').find('CloseIcon')).toHaveLength(0)
  })

  test('does not have the isHidden class on the wrapper', () => {
    expect(wrapper.hasClass('isHidden')).toBe(false)
  })

  describe('when children items are passed to it', () => {
    test('renders the children', () => {
      CHILDREN.forEach((child) => {
        expect(wrapper.contains(child)).toBe(true)
      })
    })
  })

  describe('when an offsetVertical prop is passed', () => {
    beforeEach(() => {
      wrapper.setProps({ offsetVertical: '5rem' })
    })

    test('adds the offset as an inline style', () => {
      expect(wrapper.find('.wrapperFloatCard').props().style.bottom).toBe('5rem')
    })
  })

  describe('when the closeIcon prop is passed', () => {
    describe('and the closeIcon prop value is "true"', () => {
      beforeEach(() => {
        wrapper.setProps({ closeIcon: true })
      })

      test('renders the CloseIcon component', () => {
        expect(wrapper.find('CloseIcon')).toHaveLength(1)
      })

      test('does not have the "smallScreensOnly" class on the CloseIcon parent', () => {
        expect(wrapper.find('.smallScreensOnly').find('CloseIcon')).toHaveLength(0)
      })
    })

    describe('and the closeIcon prop value is "false"', () => {
      beforeEach(() => {
        wrapper.setProps({ closeIcon: false })
      })

      test('does not render the CloseIcon component', () => {
        expect(wrapper.find('CloseIcon')).toHaveLength(0)
      })

      test('does not have the "smallScreensOnly" class in the DOM', () => {
        expect(wrapper.find('.smallScreensOnly')).toHaveLength(0)
      })
    })

    describe('and the closeIcon prop value is "small-screens-only"', () => {
      beforeEach(() => {
        wrapper.setProps({ closeIcon: 'small-screens-only' })
      })

      test('renders the CloseIcon component', () => {
        expect(wrapper.find('CloseIcon')).toHaveLength(1)
      })

      test('adds the "smallScreensOnly" class on the CloseIcon parent', () => {
        expect(wrapper.find('.smallScreensOnly').find('CloseIcon')).toHaveLength(1)
      })
    })
  })

  describe('when clicking the CloseIcon', () => {
    beforeEach(() => {
      wrapper.find('CloseIcon').simulate('click')
    })

    test('adds the isHidden class on the wrapper', () => {
      expect(wrapper.find('.wrapperFloatCard').hasClass('isHidden')).toBe(true)
    })
  })

  describe('when a onCloseIconClick prop is passed', () => {
    const onCloseIconClick = jest.fn()

    beforeEach(() => {
      wrapper.setProps({ onCloseIconClick })
    })

    describe('and the CloseIcon button is clicked', () => {
      beforeEach(() => {
        wrapper.find('CloseIcon').simulate('click')
      })

      test('calls the function passed to onCloseIconClick', () => {
        expect(onCloseIconClick).toHaveBeenCalledTimes(1)
      })
    })
  })
})
