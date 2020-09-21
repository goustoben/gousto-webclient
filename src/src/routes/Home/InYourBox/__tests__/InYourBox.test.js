import React from 'react'
import { shallow } from 'enzyme'

import { InYourBox } from 'routes/Home/InYourBox/InYourBox'
import { CTAHomepageContainer } from 'routes/Home/CTA'

describe('InYourBox', () => {
  let wrapper
  const ctaUri = '/inyourbox'

  beforeEach(() => {
    wrapper = shallow(<InYourBox ctaUri={ctaUri} />)
  })

  describe('when InYourBox renders', () => {
    test('should render CTAHomepage button', () => {
      expect(wrapper.find(CTAHomepageContainer).exists()).toBeTruthy()
    })

    test('should pass ctaUri and the section correctly', () => {
      const cta = wrapper.find(CTAHomepageContainer)
      expect(cta.prop('sectionForTracking')).toBe('boxdescription')
      expect(cta.prop('ctaUri')).toBe(ctaUri)
    })
  })
})
