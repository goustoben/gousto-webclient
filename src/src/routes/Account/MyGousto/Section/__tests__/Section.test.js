import React from 'react'
import { shallow } from 'enzyme'

import { Section } from '../Section'

describe('Section', () => {
  describe('when children prop is not passed', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<Section />)
    })

    test('should not render by default', () => {
      expect(wrapper.html()).toBeNull()
    })
  })

  describe('when children prop is passed', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(
        <Section><p>Section</p></Section>
      )
    })

    test('does not render any title element', () => {
      expect(wrapper.find('.title').exists()).toBe(false)
    })

    test('has the paddingBottom class on the content', () => {
      expect(wrapper.find('.content').hasClass('paddingBottom')).toBe(true)
    })

    describe('and the title prop is passed', () => {
      beforeEach(() => {
        wrapper.setProps({ title: 'Hello world' })
      })

      test('renders an h3 as the title element', () => {
        expect(wrapper.find('.title').type()).toBe('h3')
      })

      describe('and the largeTitle prop is passed', () => {
        beforeEach(() => {
          wrapper.setProps({ largeTitle: true })
        })

        test('renders an h2 as the title element', () => {
          expect(wrapper.find('.title').type()).toBe('h2')
        })
      })
    })

    describe('and the hasPaddingBottom prop is true', () => {
      beforeEach(() => {
        wrapper.setProps({ hasPaddingBottom: true })
      })

      test('has the paddingBottom class on the content', () => {
        expect(wrapper.find('.content').hasClass('paddingBottom')).toBe(true)
      })
    })

    describe('and the hasPaddingBottom prop is false', () => {
      beforeEach(() => {
        wrapper.setProps({ hasPaddingBottom: false })
      })

      test('does not have the paddingBottom class on the content', () => {
        expect(wrapper.find('.content').hasClass('paddingBottom')).toBe(false)
      })
    })
  })
})
