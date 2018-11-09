import React from 'react'
import { shallow } from 'enzyme'

import Image from 'Image'
import CollectionImage from 'Page/Block/Image'

describe('Collection Image', () => {
  test('should return a div', () => {
    const wrapper = shallow(<CollectionImage />)
    expect(wrapper.type()).toBe('div')
  })

  test('should render 1 Image', () => {
    const wrapper = shallow(<CollectionImage />)
    expect(wrapper.children(Image).length).toBe(1)
  })

  test('should pass on all props', () => {
    const wrapper = shallow(<CollectionImage a="1" b={2} c />)
    expect(wrapper.find(Image).prop('a')).toBe('1')
    expect(wrapper.find(Image).prop('b')).toBe(2)
    expect(wrapper.find(Image).prop('c')).toBe(true)
    expect(wrapper.find(Image).prop('d')).toBe(undefined)
  })
})
