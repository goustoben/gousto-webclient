import React from 'react'
import { mount } from 'enzyme'

import { JoeWicksBanner } from 'routes/Menu/JoeWicksBanner'

import { Banner } from 'routes/Menu/Banner'

describe('Banner', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(<Banner />)
  })

  test('should render a JoeWicksBanner', () => {
    expect(wrapper.find(JoeWicksBanner)).toHaveLength(1)
  })
})
