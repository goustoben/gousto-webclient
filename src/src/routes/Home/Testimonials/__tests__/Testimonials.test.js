import React from 'react'
import { shallow } from 'enzyme'

import Testimonials from 'routes/Home/Testimonials/Testimonials'
import { CTAHomepageContainer } from 'routes/Home/CTA'

describe('Testimonials', () => {
  let wrapper
  const ctaUri = '/signup'

  beforeEach(() => {
    wrapper = shallow(<Testimonials ctaUri={ctaUri} />)
  })

  describe('when Testimonials renders', () => {
    test('should render CTAHomepage button', () => {
      expect(wrapper.find(CTAHomepageContainer).exists()).toBeTruthy()
    })

    test('should pass ctaUri and the section correctly', () => {
      const cta = wrapper.find(CTAHomepageContainer)
      expect(cta.prop('sectionForTracking')).toBe('trustpilot')
      expect(cta.prop('ctaUri')).toBe(ctaUri)
    })
  })
})
