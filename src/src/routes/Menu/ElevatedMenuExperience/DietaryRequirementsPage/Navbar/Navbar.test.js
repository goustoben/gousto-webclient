import React from 'react'
import { shallow } from 'enzyme'
import { CTABack } from 'zest/CTABack'
import { Navbar } from './Navbar'

describe('Navbar', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <Navbar title="test-title" />
    )
  })

  test('renders title', () => {
    expect(wrapper.find('h1').text()).toBe('test-title')
  })

  test('renders back button', () => {
    expect(wrapper.find(CTABack).prop('label')).toBe('Back')
    expect(wrapper.find(CTABack).prop('url')).toBe('/menu')
  })
})
