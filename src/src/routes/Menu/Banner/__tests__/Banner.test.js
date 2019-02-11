import React from 'react'
import { shallow } from 'enzyme'

import { Banner } from '../index'

describe('Banner', () => {
  let wrapper

  test('should render a Joe Wicks banner', () => {
    wrapper = shallow(<Banner imageName={'menu/jw-portrait.jpg'} type={'joe-wicks'} color='white' fileName="jw-partner-text"/>)
    expect(wrapper.find('.joe-wicks')).toHaveLength(1)
  })
  
  test('should render an Everyday Favourites banner', () => {
    wrapper = shallow(<Banner imageName={'menu/jw-portrait.jpg'} type={'everyday-favourites'} color='red' fileName="jw-partner-text"/>)
    expect(wrapper.find('.everyday-favourites')).toHaveLength(1)
  })
})
