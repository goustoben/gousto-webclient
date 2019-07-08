import React from 'react'
import { mount } from 'enzyme'
import { Title } from '../Title'

describe('Order Skip Recovery Model Title', () => {
  let wrapper

  test('should render title', () => {
    wrapper = mount(<Title title="Are you sure you want to skip?"/>)

    expect(wrapper.text()).toBe('Are you sure you want to skip?')
  })

})
