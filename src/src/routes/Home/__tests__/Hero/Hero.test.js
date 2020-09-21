import React from 'react'
import { shallow } from 'enzyme'

import { CTAHomepageContainer } from 'routes/Home/CTA'
import ContentMask from 'ContentMask'

import Hero from 'routes/Home/Hero/Hero'

describe('Hero', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Hero />)
  })

  describe('when Hero component renders', () => {
    test('should include a main header', () => {
      expect(wrapper.find('h1')).toHaveLength(1)
    })

    test('should include a subheader', () => {
      expect(wrapper.find('h2')).toHaveLength(1)
    })

    test('should display default variant by default', () => {
      expect(wrapper.find('div').at(0).prop('className')).toBe('container--default')
      expect(wrapper.find('div').at(1).prop('className')).toBe('textContainer--default')
    })
  })

  describe('CTA', () => {
    const ctaUri = '/hero'

    beforeEach(() => {
      wrapper.setProps({
        ctaUri
      })
    })

    test('should have a CTA button', () => {
      expect(wrapper.find(CTAHomepageContainer)).toHaveLength(1)
    })

    test('should pass ctaUri and the section correctly', () => {
      const cta = wrapper.find(CTAHomepageContainer)
      expect(cta.prop('sectionForTracking')).toBe('hero')
      expect(cta.prop('ctaUri')).toBe(ctaUri)
    })
  })

  describe('variants', () => {
    beforeEach(() => {
      wrapper.setProps({
        variant: 'rebrand',
      })
    })

    test('should display rebrand variant when variant prop is rebrand', () => {
      expect(wrapper.find('div').at(0).prop('className')).toBe('container--rebrand')
      expect(wrapper.find('div').at(1).prop('className')).toBe('textContainer--rebrand')
      expect(wrapper.contains(<ContentMask fillColor="Coconut" />)).toBe(false)
    })
  })
})
