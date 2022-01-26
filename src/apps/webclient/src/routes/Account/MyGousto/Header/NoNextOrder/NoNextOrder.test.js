import React from 'react'
import { mount } from 'enzyme'
import { NoNextOrder } from '.'

describe('the NoNextOrder component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <NoNextOrder />
    )
  })

  test('renders without crashing', () => {})

  test('renders correct Heading', () => {
    expect(wrapper.find('Heading').contains('Upcoming delivery')).toBe(true)
  })

  test('renders correct Subtitle', () => {
    expect(wrapper.find('.subtitle').contains('No scheduled deliveries')).toBe(true)
  })

  test('that menu CTA text renders correctly', () => {
    expect(wrapper.find('CTA').contains('View this week’s menu')).toBe(true)
  })

  test('Menu link redirects to the correct url', () => {
    expect(wrapper.find('GoustoLink').prop('to')).toBe('/menu')
  })
})
