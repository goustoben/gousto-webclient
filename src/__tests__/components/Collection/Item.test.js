import React from 'react'
import { shallow } from 'enzyme'

import Details from 'Page/Block/Details'
import Image from 'Page/Block/Image'
import Item from 'Collection/Item'
import Link from 'Link'
import { Div } from 'Page/Elements'
import { H2 } from 'Page/Header'
import Icon from 'Icon'

describe('Collection Item', () => {
  let wrapper
  test('should return a Div by default', () => {
    wrapper = shallow(<Item />)
    expect(wrapper.type()).toBe(Div)
  })

  test('should return a Link if link is provided', () => {
    wrapper = shallow(<Item link="/some-url" />)
    expect(wrapper.type()).toBe(Link)
  })

  test('should contain 1 Image', () => {
    wrapper = shallow(<Item />)
    expect(wrapper.find(Image).length).toBe(1)
  })

  test('should contain 1 Details', () => {
    wrapper = shallow(<Item />)
    expect(wrapper.find(Details).length).toBe(1)
  })

  test('should contain 1 Title in Details', () => {
    wrapper = shallow(<Item title="Title String" />)
    const title = wrapper.find(Details).find(H2)
    const icon = wrapper.find(Details).find(Icon)
    expect(icon.props().name).toBe('fa-angle-right')
    expect(title.length).toBe(1)
    expect(title.render().text()).toBe('Title String')
  })
})
