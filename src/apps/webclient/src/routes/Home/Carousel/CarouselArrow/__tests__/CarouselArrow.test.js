import React from 'react'

import { shallow } from 'enzyme'

import { Arrow } from '../CarouselArrow'

describe('Arrow', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Arrow side="arrowRight" />)
  })

  test('should renders properly', () => {
    expect(wrapper.find(Arrow)).toBeDefined()
    expect(wrapper.find('button')).toBeTruthy()
  })
})
