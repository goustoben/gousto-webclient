import React from 'react'
import { shallow } from 'enzyme'
import Title from 'Overlay/Title'

describe('Overlay Title', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Title title="Test Title" />)
  })

  test('should return h2', () => {
    expect(wrapper.type()).toBe('h2')
  })

  test('should contain title text', () => {
    expect(wrapper.text()).toBe('Test Title')
  })
})
