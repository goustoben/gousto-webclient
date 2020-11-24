import React from 'react'
import { shallow } from 'enzyme'
import { JoeWicks } from '../JoeWicks'

describe('JoeWicks', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<JoeWicks />)
  })

  test('should renders correctly', () => {
    expect(wrapper.find(JoeWicks)).toBeDefined()
  })
})
