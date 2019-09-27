import React from 'react'
import { shallow } from 'enzyme'

import { Section } from '../Section'

describe('Section', () => {
  let wrapper

  it('should not render by default', () => {
    wrapper = shallow(<Section />)

    expect(wrapper.html()).toBeNull()
  })

  describe('with children', () => {
    it('should render a title element which is a h2 if large prop is passed', () => {
      wrapper = shallow(<Section title='Hello world' largeTitle><p>Section</p></Section>)

      expect(wrapper.find('h2').length).toEqual(1)
    })

    it('should render a title element which is a h3 if large prop is not passed', () => {
      wrapper = shallow(<Section title='Hello world'><p>Section</p></Section>)

      expect(wrapper.find('h3').length).toEqual(1)
    })

    it('should not render any title element if title prop is not passed', () => {
      wrapper = shallow(<Section><p>Section</p></Section>)

      expect(wrapper.find('h2').length).toEqual(0)
      expect(wrapper.find('h3').length).toEqual(0)
    })
  })
})
