import React from 'react'

import { mount } from 'enzyme'

import { HeaderContent } from '../HeaderContent'

describe('HeaderContent', () => {
  let wrapper
  const handleClick = jest.fn()

  beforeEach(() => {
    wrapper = mount(<HeaderContent isExpanded handleClick={handleClick} />)
  })

  test('should renders correctly', () => {
    expect(wrapper.find(HeaderContent).exists()).toBeTruthy()
    expect(wrapper.find('Svg').exists()).toBeTruthy()
  })

  describe('when isExpanded props is true', () => {
    test('then title should show "Hide order summary"', () => {
      expect(wrapper.find('.title').contains('Hide order summary')).toBeTruthy()
    })
  })

  describe('when isExpanded props is false', () => {
    beforeEach(() => {
      wrapper.setProps({
        isExpanded: false,
      })
    })

    test('then title should show "Show order summary"', () => {
      expect(wrapper.find('.title').contains('Show order summary')).toBeTruthy()
    })
  })

  describe('when header is clicked', () => {
    beforeEach(() => {
      wrapper.find('.toggleHeader').simulate('click')
    })

    test('then handleClick should be called', () => {
      expect(handleClick).toHaveBeenCalled()
    })
  })
})
