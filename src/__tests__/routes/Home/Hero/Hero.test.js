import React from 'react'
import { shallow } from 'enzyme'

import CTA from 'routes/Home/CTA'
import ContentMask from 'ContentMask'

import Hero from 'routes/Home/Hero/Hero'

describe('Hero', () => {
  test('should include a main header', () => {
    const wrapper = shallow(<Hero />)
    expect(wrapper.find('h1')).toHaveLength(1)
  })

  test('should include a subheader', () => {
    const wrapper = shallow(<Hero />)
    expect(wrapper.find('h2')).toHaveLength(1)
  })

  test('should have a CTA button', () => {
    const redirect = jest.fn()

    const wrapper = shallow(<Hero redirect={redirect} />)
    expect(wrapper.find(CTA)).toHaveLength(1)
  })

  describe('variants', () => {
    test('should display default variant by default', () => {
      const wrapper = shallow(<Hero />)

      expect(wrapper.find('div').at(0).prop('className')).toBe('container--default')
      expect(wrapper.find('div').at(1).prop('className')).toBe('textContainer--default')
      expect(wrapper.contains(<ContentMask fillColor="Coconut" />)).toBe(true)
    })

    test('should display rebrand variant when variant prop is rebrand', () => {
      const wrapper = shallow(<Hero variant="rebrand" />)

      expect(wrapper.find('div').at(0).prop('className')).toBe('container--rebrand')
      expect(wrapper.find('div').at(1).prop('className')).toBe('textContainer--rebrand')
      expect(wrapper.contains(<ContentMask fillColor="Coconut" />)).toBe(false)
    })
  })
})
