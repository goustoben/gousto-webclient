import React from 'react'
import { shallow } from 'enzyme'
import { Section } from '..'

describe('Section', () => {
  it('should render a title element which is a h2 if large prop is passed', () => {
    const wrapper = shallow(<Section title='Hello world' largeTitle />)
    expect(wrapper.find('h2').length).toEqual(1)
  })
  it('should render a title element which is a h3 if large prop is not passed', () => {
    const wrapper = shallow(<Section title='Hello world' />)
    expect(wrapper.find('h3').length).toEqual(1)
  })
})
