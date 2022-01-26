import React from 'react'
import { shallow } from 'enzyme'
import { Clock } from '../Clock'

describe('Clock', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Clock seconds={59} total={300} isCritical />)
  })

  test('renders correctly', () => {
    expect(wrapper.find('.text').text()).toBe('0:59')
  })
})
