import React from 'react'
import { mount } from 'enzyme'
import { MetaInfo } from '../index'

describe('<MetaInfo />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <MetaInfo label="Label">
        <span className="icon" />
      </MetaInfo>,
    )
  })

  test('should have proper label', () => {
    expect(wrapper.text()).toBe('Label')
  })

  test('should render icon', () => {
    expect(wrapper.find('.icon').exists()).toBe(true)
  })
})
