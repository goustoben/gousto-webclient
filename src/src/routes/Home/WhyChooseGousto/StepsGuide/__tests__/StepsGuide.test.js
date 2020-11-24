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

  test('should render 3 steps by default', () => {
    expect(wrapper.prop('steps')).toHaveLength(3)
  })
})
