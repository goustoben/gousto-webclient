import React from 'react'

import { mount } from 'enzyme'

import { StepsGuide } from '../StepsGuide'

describe('StepsGuide', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(<StepsGuide />)
  })

  test('should renders correctly', () => {
    expect(wrapper.find(StepsGuide)).toBeDefined()
  })
})
