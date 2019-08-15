import React from 'react'
import { shallow } from 'enzyme'
import Hero from 'routes/Jobs/Hero/Hero'

describe('<Hero />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Hero />)
  })

  test('should include a main header', () => {
    expect(wrapper.find('h1')).toHaveLength(1)
  })

  test('should render a CTA with the correct link', () => {
    expect(wrapper.find('CTA').prop('link')).toBe('/jobs#openings')
  })
})
