import React from 'react'

import { shallow } from 'enzyme'

import { CTAHomepageContainer } from 'routes/Home/CTA'

import { WhyChooseGousto } from '../WhyChooseGousto'

describe('WhyChooseGousto', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<WhyChooseGousto ctaUri="/whyGousto" ctaText="why gousto" />)
  })

  describe('when component is mounted', () => {
    test('then it should render correctly', () => {
      expect(wrapper.find(WhyChooseGousto)).toBeDefined()
      expect(wrapper.find('ModuleTitle')).toHaveLength(1)
      expect(wrapper.find('StepsGuide')).toHaveLength(1)
      expect(wrapper.find(CTAHomepageContainer)).toHaveLength(1)
    })
  })

  describe('CTA', () => {
    const ctaUri = '/whyChooseGousto'

    beforeEach(() => {
      wrapper.setProps({
        ctaUri,
      })
    })

    test('should pass ctaUri and the section correctly', () => {
      const cta = wrapper.find(CTAHomepageContainer)
      expect(cta.prop('sectionForTracking')).toBe('whyChooseGousto')
      expect(cta.prop('ctaUri')).toBe(ctaUri)
    })
  })
})
