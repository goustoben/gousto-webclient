import React from 'react'
import { shallow } from 'enzyme'
import { TextFrame } from '../TextFrame'

describe('TextFrame', () => {
  let wrapper
  const signupGoToMenu = jest.fn()

  beforeEach(() => {
    wrapper = shallow(<TextFrame signupGoToMenu={signupGoToMenu} isFullWidth />)
  })

  test('renders correctly', () => {
    expect(wrapper.find('.heading').exists()).toBe(true)
    expect(wrapper.find('.list').exists()).toBe(true)
    expect(wrapper.find('CTA').exists()).toBe(true)
  })

  describe('when the CTA is clicked', () => {
    beforeEach(() => {
      wrapper.find('CTA').simulate('click')
    })

    test('then the signupGoToMenu action should be dispatched', () => {
      expect(signupGoToMenu).toHaveBeenCalled()
    })
  })
})
