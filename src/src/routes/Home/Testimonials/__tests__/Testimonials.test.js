import React from 'react'
import { shallow } from 'enzyme'

import Testimonials from 'routes/Home/Testimonials/Testimonials'
import { CTAHomepageContainer } from 'routes/Home/CTA'

describe('Testimonials', () => {
  let wrapper
  const props = {
    redirect: jest.fn(),
    trackGetStarted: jest.fn(),
  }

  beforeEach(() => {
    wrapper = shallow(<Testimonials {...props} />)
  })

  describe('when Testimonials renders', () => {
    test('should render CTAHomepage button', () => {
      expect(wrapper.find(CTAHomepageContainer).exists()).toBeTruthy()
    })
  })

  describe('when CTAHomepage has been clicked', () => {
    beforeEach(() => {
      wrapper.setProps({
        ctaUri: '/signup'
      })
    })

    test('should dispatch redirect, and trackGetStarted actions with properly', () => {
      wrapper.find(CTAHomepageContainer).simulate('click')
      expect(props.redirect).toHaveBeenCalledWith('/signup')
      expect(props.trackGetStarted).toHaveBeenCalledWith('trustpilot')
    })
  })
})
