import React from 'react'
import { shallow } from 'enzyme'

import { InYourBox } from 'routes/Home/InYourBox/InYourBox'
import CTAHomepage from 'routes/Home/CTA'

describe('InYourBox', () => {
  let wrapper
  const props = {
    redirect: jest.fn(),
    trackGetStarted: jest.fn(),
  }

  beforeEach(() => {
    wrapper = shallow(<InYourBox {...props} />)
  })

  describe('when InYourBox renders', () => {
    test('should render CTAHomepage button', () => {
      expect(wrapper.find(CTAHomepage).exists()).toBeTruthy()
    })
  })

  describe('when CTAHomepage clicked', () => {
    beforeEach(() => {
      wrapper.setProps({
        ctaUri: '/menu'
      })
    })

    test('should dispatch redirect, and trackGetStarted actions with properly', () => {
      wrapper.find(CTAHomepage).simulate('click')
      expect(props.redirect).toHaveBeenCalledWith('/menu')
      expect(props.trackGetStarted).toHaveBeenCalledWith('boxdescription')
    })
  })
})
