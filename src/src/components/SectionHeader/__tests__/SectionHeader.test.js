import React from 'react'
import { shallow } from 'enzyme'
import SectionHeader from 'SectionHeader'

describe('SectionHeader', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<SectionHeader title="Section Header Title" />)
  })

  test('should return header', () => {
    expect(wrapper.type()).toEqual('header')
  })

  test('should display one h1', () => {
    expect(wrapper.find('h1').length).toEqual(1)
  })

  test('should display title in h1', () => {
    expect(wrapper.find('h1').text()).toEqual('Section Header Title')
  })

  test('should display children', () => {
    const node = <div>child content</div>
    wrapper = shallow(<SectionHeader title="Title">{node}</SectionHeader>)
    expect(wrapper.contains(node)).toBe(true)
  })
})
